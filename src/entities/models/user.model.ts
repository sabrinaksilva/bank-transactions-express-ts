import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: "Users" })
export default class User {
    @PrimaryGeneratedColumn()
    "id"?: number;

    @Column({ nullable: false })
    "name"?: string;

    @Column({ nullable: false })
    "login"?: string;

    @Column({ nullable: false })
    "passwordEncrypted"?: string;
    
    accounts: any;
}