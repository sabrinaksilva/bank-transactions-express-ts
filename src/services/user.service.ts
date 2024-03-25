
import { mysqlDataSource } from "../configuration/datasource.config"
import { Repository } from "typeorm";
import { IUserCreateAccount } from '../entities/dtos/request/user.request.dto';

import User from '../entities/models/user.model';
const userRepository: Repository<User> = mysqlDataSource.getRepository(User);
const passwordEncoderUtils = require("../utils/password.encoder.utils");


exports.create = async (userRequestDTO: IUserCreateAccount) => {

    let count: number = await userRepository.count({
        where: {
            document: userRequestDTO.document
        },
    })

    if (count && count > 0) {
        throw new Error("User already registred.");
    }

    const encodedPass: string = passwordEncoderUtils.encodePass(userRequestDTO.initialPassword);

    let user: User = {
        name: userRequestDTO.name,
        document: userRequestDTO.document,
        passwordEncrypted: encodedPass
    }

    return (await userRepository.insert(user)).raw.id;

}

