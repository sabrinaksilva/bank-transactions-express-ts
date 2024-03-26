

import { mysqlDataSource } from "../configuration/datasource.config";
import { Repository } from "typeorm";
import { IUserCreateAccount } from '../entities/dtos/request/user.request.dto';

import Bank from "../entities/models/bank.model";
import { ICreateBank } from "../entities/dtos/request/bank.requests.dtos";
const bankRepository: Repository<Bank> = mysqlDataSource.getRepository(Bank);


exports.create = async (bankCreateRequest: ICreateBank) => {

    let bank: Bank = {
        companyName: bankCreateRequest.companyName,
        tradeName: bankCreateRequest.tradeName,
        registrationNumber: bankCreateRequest.registrationNumber,
        taxes: bankCreateRequest.taxes
    }

    return (await bankRepository.insert(bank)).identifiers;

}

