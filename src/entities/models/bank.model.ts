
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { BankAccount } from "./account.model";


@Entity({ name: "Bank" })
export default class Bank {


    @PrimaryGeneratedColumn()
    "id"?: number;

    @Column({ nullable: false })
    "companyName": string;


    @Column({ nullable: false })
    "tradeName": string;


    @Column({ unique: true })
    "registrationNumber": number;


    @Column({ nullable: false })
    "taxes": number;


    @CreateDateColumn()
    "createdAt": Date;


    @UpdateDateColumn()
    "updatedAt": Date;

    "accounts": Array<BankAccount>;

}