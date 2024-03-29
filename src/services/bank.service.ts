import { mysqlDataSource } from '../configuration/datasource.config';
import { Repository } from 'typeorm';
import Bank from '../entities/models/bank.model';
import { ICreateBank } from '../entities/dtos/request/bank.requests.dtos';
import { NotFoundError } from '../errors/not-found.error';

const bankRepository: Repository<Bank> = mysqlDataSource.getRepository(Bank);

exports.create = async (bankCreateRequest: ICreateBank) => {
    let bank: Bank = {
        companyName: bankCreateRequest.companyName,
        tradeName: bankCreateRequest.tradeName,
        registrationNumber: bankCreateRequest.registrationNumber,
    };

    return (await bankRepository.insert(bank)).identifiers;
};

exports.findByName = async (name: string) => {
    return await bankRepository.findOneBy({companyName: name}).then(bank => {
        if (!bank) throw new NotFoundError('Bank not found. Name = ' + name);
        return bank;
    });
};