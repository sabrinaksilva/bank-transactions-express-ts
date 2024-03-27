import { Repository } from 'typeorm';
import Bank from 'src/entities/models/bank.model';
import { mysqlDataSource } from 'src/configuration/datasource.config';
import { ICreateBank } from 'src/entities/dtos/request/bank.requests.dtos';

const bankRepository: Repository<Bank> = mysqlDataSource.getRepository(Bank);


exports.create = async (bankCreateRequest: ICreateBank) => {

    let bank: Bank = {
        companyName: bankCreateRequest.companyName,
        tradeName: bankCreateRequest.tradeName,
        registrationNumber: bankCreateRequest.registrationNumber,
        taxes: bankCreateRequest.taxes
    };

    return (await bankRepository.insert(bank)).identifiers;

};

 