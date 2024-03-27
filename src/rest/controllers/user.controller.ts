import { NextFunction, Request, Response } from 'express';
import { IUserCreateAccount, IUserLogin } from 'src/entities/dtos/request/user.request.dto';
import { ApiError } from 'src/entities/dtos/shared/api.error.interface';

const userService = require('../../services/user.service');

exports.register = async (req: Request, resp: Response, next: NextFunction) => {
    const {body} = req;

    if (body != null) {
        try {
            const user: IUserCreateAccount = {
                name: body.name,
                document: body.document,
                initialPassword: body.password
            };

            resp.status(201).send({
                id: await userService.create(user)
            });


        } catch (err: ApiError | Error | any) {
            const error: ApiError = {
                message: err.message || 'Unexpected error to create user',
                status: err.status || 500,
                messageException: err.messageException || null
            };
            next(error);
        }
    }
};

exports.login = async (req: Request, resp: Response, next: NextFunction) => {
    const {body} = req;

    if (body != null) {
        try {
            const user: IUserLogin = {
                document: body.document,
                password: body.password
            };

            let t = await userService.getJwtToken(user);

            resp.status(200).send({
                token: t
            });


        } catch (err: ApiError | Error | any) {
            const error: ApiError = {
                message: err.message || 'Unexpected error to log in user',
                status: err.status || 500,
                messageException: err.messageException || null
            };
            next(error);
        }
    } else {
        const error: ApiError = {
            message: 'No credentials were provided to log in',
            status: 400
        };
        next(error);
    }

};
