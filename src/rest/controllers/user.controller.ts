import { NextFunction, Request, Response } from 'express';
import { IUserCreateAccount, IUserLogin } from '../../entities/dtos/request/user.request.dto';
import { ApiError } from '../../errors/api.error';
import { UnauthorizedError } from '../../errors/unauthorized.error';
import { BadRequestError } from '../../errors/bad-request.error';

const userService = require('../../services/user.service');

exports.register = async (req: Request, resp: Response, next: NextFunction) => {
    const {body} = req;
    if (!body || !body.document) {
        throw new BadRequestError('Missing data to register');
    }
    try {
        const user: IUserCreateAccount = {
            name: body.name,
            document: body.document,
            initialPassword: body.password
        };

        resp.status(201).send({
            id: await userService.create(user)
        });


    } catch (err: Error | any) {
        throw new ApiError(err.message ?? 'Unexpected error to create user', err.status);
    }
};

exports.login = async (req: Request, resp: Response, next: NextFunction) => {
    const {body} = req;

    if (!body) {
        throw new UnauthorizedError('Missing credentials');
    }

    try {
        const user: IUserLogin = {
            document: body.document,
            password: body.password
        };

        await userService.getJwtToken(user).then((token: string) => {
            resp.status(200).send(
                {
                    token: token
                }
            );
        });


    } catch (err: Error | any) {
        throw new ApiError(err.message, err.status);
    }
};
