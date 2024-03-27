import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BankAccount } from './account.model';


@Entity({name: 'Bank'})
export default class Bank {


    @PrimaryGeneratedColumn()
    'id'?: number;

    @Column({nullable: false})
    'companyName': string;


    @Column({nullable: false})
    'tradeName': string;


    @Column({unique: true})
    'registrationNumber': string;

    @CreateDateColumn()
    'createdAt'?: Date;

    @UpdateDateColumn()
    'updatedAt'?: Date;

    'accounts'?: Array<BankAccount>;

}