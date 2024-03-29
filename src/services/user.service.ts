import { mysqlDataSource } from '../configuration/datasource.config';
import { Repository } from 'typeorm';
import { IUserCreateAccount, IUserLogin } from '../entities/dtos/request/user.request.dto';
import User from '../entities/models/user.model';
import { ApiError } from '../errors/api.error';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { NotFoundError } from '../errors/not-found.error';

require('dotenv/config');

const jwt = require('jsonwebtoken');

const userRepository: Repository<User> = mysqlDataSource.getRepository(User);
const passwordEncoderUtils = require('../utils/password.encoder.utils');


exports.create = async (userRequestDTO: IUserCreateAccount) => {

    let count: number = await userRepository.count({
        where: {
            document: userRequestDTO.document
        },
    });

    if (count && count > 0) {
        throw new ApiError('User already registred.', 409);
    }

    const encodedPass: string = passwordEncoderUtils.encodePass(userRequestDTO.initialPassword);

    let user: User = {
        name: userRequestDTO.name,
        document: userRequestDTO.document,
        passwordEncrypted: encodedPass
    };

    return (await userRepository.insert(user)).identifiers;

};

exports.getJwtToken = async (userLoginDTO: IUserLogin) => {
    const secretJwt: string | any = process.env.JWT_SECRET;
    const expThreeDays: number = Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60);

    if (!userLoginDTO.document ?? !userLoginDTO.password) {
        throw new UnauthorizedError('Invalid credentials');
    }

    let user: User = {};

    await userRepository.findOne(
        {
            where: {
                document: userLoginDTO.document,
            }
        }).then(result => {
        if (result == null) {
            throw new NotFoundError('User not found');
        }
        user = result;
    });


    if (!passwordEncoderUtils.validateIfHashMatchesPassword(userLoginDTO.password, user.passwordEncrypted)) {
        throw new UnauthorizedError('Invalid credentials');
    }

    const claims = {
        'id': user.id,
        'exp': expThreeDays,
        'sub': user.name,
    };


    return jwt.sign(
        claims,
        secretJwt,
        {algorithm: 'HS512'}
    );


};