import Bank from './bank.model';
import { AccountType } from '../enums/bank-account.enums';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Check, Column, ManyToOne } from 'typeorm';


@Entity({name: 'Account'})
@Check('balance >= 0')
export class BankAccount {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Bank, (bank) => bank.accounts)
    bank?: Bank;

    @Column({nullable: false})
    agency?: string;

    @Column({nullable: false})
    accountNumber?: string;

    @Column({nullable: false})
    accountType?: AccountType;

    @Column({nullable: false})
    balance: number = 0;

    @Column({nullable: false})
    locked: boolean = false;

}