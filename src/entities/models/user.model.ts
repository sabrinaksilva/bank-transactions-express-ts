import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";

@Entity({ name: "Users" })
export default class User {
    @PrimaryGeneratedColumn() id?: number;

    @Column({ nullable: false })
    name?: string;

    @Column({ nullable: false, unique: true })
    document?: string;

    @Column({ nullable: false })
    passwordEncrypted?: string;

    accounts?: any;
}