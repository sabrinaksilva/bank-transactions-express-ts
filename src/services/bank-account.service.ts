import { Repository } from 'typeorm';
import { mysqlDataSource } from 'src/configuration/datasource.config';
import { BankAccount } from 'src/entities/models/account.model';
import Bank from 'src/entities/models/bank.model';
import { ICreateBankAccount } from 'src/entities/dtos/request/bank-account.requests.dtos';

const bankAccountRepository: Repository<BankAccount> = mysqlDataSource.getRepository(BankAccount);
const bankService = require('src/services/bank.service');

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
    try {
        bank = await bankService.findByName(accountRequest.bankName);
    } catch (err) {
        throw new Error('Bank not found');
    }
    await validateAccountAlreadyExists(accountRequest, bank);

    let bankAccount: BankAccount = {
        bank: bank,
        agency: accountRequest.agency,
        accountNumber: accountRequest.accountNumber,
        accountType: accountRequest.accountType
    };

    return (await bankAccountRepository.insert(bankAccount)).identifiers;

};

