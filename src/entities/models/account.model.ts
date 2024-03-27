import Bank from './bank.model';
import { AccountType } from '../enums/bank-account.enums';
import User from './user.model';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Column, ManyToOne } from 'typeorm';


@Entity({name: 'Account'})
export class BankAccount {


    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Bank, (bank) => bank.accounts)
    bank?: Bank;

    @Column({nullable: false})
    agency?: string;


    // {
    //     unique: true
    // }      // dps ate da pra ver de colocar unico por banco + atgencia + conta
    // VALIDAR NO SERVICE
    @Column({nullable: false})
    accountNumber?: string;

    @Column({nullable: false})
    accountType?: AccountType;

    @ManyToOne(() => User, (user) => user.accounts)
    'userOwner'?: User;


}