import { AccountType } from '../../enums/bank-account.enums';

export interface ICreateBankAccount {
    agency: string;
    accountNumber: string;
    accountType: AccountType;
    bankName: string;
    balance: number;
}