import { Repository } from 'typeorm';
import { mysqlDataSource } from '../configuration/datasource.config';
import { BankAccount } from '../entities/models/account.model';
import Bank from '../entities/models/bank.model';
import { IBankAccount } from '../entities/dtos/request/bank-account.requests.dtos';
import { runInTransaction, runOnTransactionRollback } from 'typeorm-transactional';
import { ApiError } from '../errors/api.error';
import { DuplicatedResourceError } from '../errors/duplicated-resource.error';
import { NotFoundError } from '../errors/not-found.error';

const bankAccountRepository: Repository<BankAccount> = mysqlDataSource.getRepository(BankAccount);
const bankService = require('../services/bank.service');

async function validateAccountAlreadyExists(accountRequest: IBankAccount, bank: Bank) {
    if (await bankAccountRepository.findOne({
        where: {
            accountNumber: accountRequest.accountNumber,
            agency: accountRequest.agency,
            bank: bank,
            accountType: accountRequest.accountType
        }
    })) {
        throw new DuplicatedResourceError('Bank account already exists');
    }
}


exports.findById = async (id: number) => {
    const account = await bankAccountRepository.findOne({
        where: {id: id},
        relations: {
            bank: true
        }
    });

    if (!account) throw new NotFoundError('Bank account not found. Id = ' + id);

    return {
        agency: account.agency,
        accountNumber: account.accountNumber,
        accountType: account.accountType,
        bankName: account.bank?.companyName,
        balance: account.balance
    };

};

exports.create = async (accountRequest: IBankAccount) => {
    if (accountRequest.balance < 0) {
        throw new ApiError('Account balance can\'t be negative', 400);
    }

    let bank: Bank = await bankService.findByName(accountRequest.bankName);

    let bankAccount: BankAccount = {
        bank: bank,
        agency: accountRequest.agency,
        accountNumber: accountRequest.accountNumber,
        accountType: accountRequest.accountType,
        balance: accountRequest.balance,
        locked: false
    };

    return (await bankAccountRepository.insert(bankAccount)).identifiers;
};

async function lockForTransactions(originAccount: BankAccount, destinationAccount: BankAccount) {
    originAccount.locked = true;
    destinationAccount.locked = true;
    return await bankAccountRepository.save([originAccount, destinationAccount]);
}


function getOriginAccount(originAccount: BankAccount | undefined, accounts: BankAccount[], originAccountId: number) {
    originAccount = accounts.filter(account => account.id === originAccountId).pop();
    if (!originAccount) throw new ApiError('Origin account not found', 404);
    return originAccount;
}

function getDestinationAccount(destinationAccount: BankAccount | undefined, accounts: BankAccount[], destinationAccountId: number) {
    destinationAccount = accounts.filter(account => account.id === destinationAccountId).pop();
    if (!destinationAccount) throw new ApiError('Destination account not found', 404);
    return destinationAccount;
}


exports.makeTransfer = async (originAccountId: number, destinationAccountId: number, amount: number) => {
    if (amount < 0) throw new ApiError('Amount to transfer must be greater then zero', 400);

    await runInTransaction(async () => {
        let originAccount: BankAccount | undefined;
        let destinationAccount: BankAccount | undefined;

        let accounts: BankAccount[] = [{balance: -1, locked: true}, {balance: -1, locked: true}];
        [originAccount, destinationAccount] = accounts;

        var timedOutWaitingAnotherTransactionsToEnd = false;
        setTimeout(function () {
            timedOutWaitingAnotherTransactionsToEnd = true;
        }, 1 * 60 * 1000);

        while (!timedOutWaitingAnotherTransactionsToEnd && (originAccount?.locked || destinationAccount?.locked)) {
            accounts = await bankAccountRepository.find({
                where: [
                    {id: originAccountId},
                    {id: destinationAccountId}
                ]
            });
            if (!accounts) accounts = [];
            originAccount = getOriginAccount(originAccount, accounts, originAccountId);
            destinationAccount = getDestinationAccount(destinationAccount, accounts, destinationAccountId);

            console.log('Waiting another transaction to end...');
        }
        if (timedOutWaitingAnotherTransactionsToEnd) throw new ApiError('Timed Out. Cancelling transaction...');

        [originAccount, destinationAccount] = await lockForTransactions(originAccount, destinationAccount);

        if (originAccount.balance < amount) throw new ApiError('Insufficient balance for transfer', 400);

        originAccount.balance -= amount;
        destinationAccount.balance += amount;
        originAccount.locked = false;
        destinationAccount.locked = false;


        await bankAccountRepository.save([originAccount, destinationAccount]);

        runOnTransactionRollback((e: Error) => {
            console.log(e.message);
            throw new ApiError('Unexpected error. Canceling transaction...');
        });
    });


};

