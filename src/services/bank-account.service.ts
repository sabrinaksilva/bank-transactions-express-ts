import { Repository } from 'typeorm';
import { mysqlDataSource } from '../configuration/datasource.config';
import { BankAccount } from '../entities/models/account.model';
import Bank from '../entities/models/bank.model';
import { ICreateBankAccount } from '../entities/dtos/request/bank-account.requests.dtos';

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
};


exports.makeTransfer = async (originAccountId: number, destinationAccountId: number, amount: number) => {

};

