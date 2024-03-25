import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import Bank from "./bank.model";
import { AccountType } from "../enums/bank-account.enums";
import User from "./user.model";


@Entity({ name: "Account" })
export class BankAccount {


    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Bank, (bank) => bank.accounts)
    bank?: Bank

    @Column({ nullable: false })
    agency?: string;


    // {
    //     unique: true
    // }      // dps ate da pra ver de colocar unico por banco + atgencia + conta
    // VALIDAR NO SERVICE
    @Column({ nullable: false })
    accountNumber?: string;

    @Column({ nullable: false })
    accountType?: AccountType;

    @ManyToOne(() => User, (user) => user.accounts)
    userOwner?: User;


}