import { Repository } from 'typeorm';
import { mysqlDataSource } from '../configuration/datasource.config';
import { BankAccount } from '../entities/models/account.model';
import Bank from '../entities/models/bank.model';
import { ICreateBankAccount } from '../entities/dtos/request/bank-account.requests.dtos';
import { runOnTransactionRollback } from 'typeorm-transactional';

const bankAccountRepository: Repository<BankAccount> = mysqlDataSource.getRepository(BankAccount);
const bankService = require('../services/bank.service');

async function validateAccountAlreadyExists(accountRequest: ICreateBankAccount, bank: Bank) {
    if (await bankAccountRepository.findOne({
        where: {
            accountNumber: accountRequest.accountNumber,
            agency: accountRequest.agency,
            bank: bank,
            accountType: accountRequest.accountType
        }
    })) {
        throw new Error('Bank account already exists');
    }
}

exports.create = async (accountRequest: ICreateBankAccount) => {
    let bank: Bank;

    if (accountRequest.balance < 0) {
        throw new Error('Account balance can\'t be negative');
    }


    try {
        bank = await bankService.findByName(accountRequest.bankName);
    } catch (err) {
        throw new Error('Bank not found');
    }

    let bankAccount: BankAccount = {
        bank: bank,
        agency: accountRequest.agency,
        accountNumber: accountRequest.accountNumber,
        accountType: accountRequest.accountType,
        balance: accountRequest.balance,
        locked: false
    };

    return (await bankAccountRepository.insert(bankAccount)).identifiers;

    // TO-DO: handle insert errors

};

async function lockForTransactions(originAccount: BankAccount, destinationAccount: BankAccount) {
    originAccount.locked = true;
    destinationAccount.locked = true;
    return await bankAccountRepository.save([originAccount, destinationAccount]);
}


exports.makeTransfer = async (originAccountId: number, destinationAccountId: number, amount: number) => {
    let originAccount: BankAccount | undefined;
    let destinationAccount: BankAccount | undefined;

    let accounts: BankAccount[] = [{balance: -1, locked: true}, {balance: -1, locked: true}];
    [originAccount, destinationAccount] = accounts;

    var timedOut = false;
    setTimeout(function () {
        timedOut = true;
    }, 5 * 60 * 1000);


    while (!timedOut && (originAccount.locked || destinationAccount.locked)) {
        accounts = await bankAccountRepository.find({
            where: [
                {id: originAccountId},
                {id: destinationAccountId}
            ]
        });
        if (!accounts) accounts = [];

        originAccount = accounts.filter(account => account.id === originAccountId).pop();
        destinationAccount = accounts.filter(account => account.id === destinationAccountId).pop();

        if (!originAccount) throw new Error('Origin account not found');
        if (!destinationAccount) throw new Error('Destination account not found');

        console.log('Waiting another transaction to end...');
    }
    if (timedOut) throw new Error('Timed Out. Cancelling transaction...');

    [originAccount, destinationAccount] = await lockForTransactions(originAccount, destinationAccount);

    if (originAccount.balance < amount) throw new Error('Insufficient balance for transfer');

    originAccount.balance -= amount;
    destinationAccount.balance += amount;
    originAccount.locked = false;
    destinationAccount.locked = false;
    await bankAccountRepository.save([originAccount, destinationAccount]);

    runOnTransactionRollback(() => {
        throw new Error('Unexpected error. Canceling transaction...');
    });


};

