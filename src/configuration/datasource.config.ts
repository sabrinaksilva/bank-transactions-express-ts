import { DataSource } from 'typeorm';
import { BankAccount } from '../entities/models/account.model';
import Bank from '../entities/models/bank.model';
import User from '../entities/models/user.model';

require('dotenv/config');


const dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 2222
};

export const mysqlDataSource = new DataSource({
    type: 'mysql',
    host: dbConfig.HOST,
    port: dbConfig.DB_PORT,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_NAME,
    logging: ['schema', 'error'],
    synchronize: false,
    migrations: ['../migrations/*.ts', '../migrations/*.js'],
    entities: [Bank, BankAccount, User],

}); 