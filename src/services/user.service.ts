
import { mysqlDataSource } from "../configuration/datasource.config"
import { Repository } from "typeorm";
import { IUserCreateAccount, IUserLogin } from '../entities/dtos/request/user.request.dto';
var jwt = require('jsonwebtoken');
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

    return (await userRepository.insert(user)).identifiers;

}

exports.getJwtToken = async (userLoginDTO: IUserLogin) => {
    require('dotenv/config');
    const secretJwt: string | any = process.env.JWT_SECRET;

    if (!userLoginDTO.document || !userLoginDTO.password) {
        throw new Error("InvalidCredentiais");
    }

    let user = await userRepository.findOne(
        {
            where: {
                document: userLoginDTO.document,
            }
        })


    if (user) {
        if (!passwordEncoderUtils.validateIfHashMatchesPassword(userLoginDTO.password, user.passwordEncrypted)) {
            throw new Error("InvalidCredentiais");
        }

        const expThreeDays: number = Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60);
        // return jwt.sign(
        //     {
        //         'id': user.id,
        //         'exp': expThreeDays,
        //         'sub': user.name,
        //     },
        //     secretJwt,
        //     { algorithm: 'HS512' });

        const claims = {
            'id': user.id,
            'exp': expThreeDays,
            'sub': user.name,
        };
        return  jwt.sign(
            claims,
            secretJwt,
            { algorithm: 'HS512' }, function (err: any, result: string) {
                if (err) throw err;
                // return result;
            });

    } else {
        throw new Error("User not found");
    }

    // return signedToken;

}