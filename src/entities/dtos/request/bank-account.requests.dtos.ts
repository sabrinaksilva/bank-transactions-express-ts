import { AccountType } from '../../enums/bank-account.enums';

export interface IBankAccount {
    id?: number;
    agency: string;
    accountNumber: string;
    accountType: AccountType;
    bankName: string;
    balance: number;
}