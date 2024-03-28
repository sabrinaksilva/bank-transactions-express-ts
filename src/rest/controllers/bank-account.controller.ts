import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../entities/dtos/shared/api.error.interface';
import { ICreateBankAccount } from '../../entities/dtos/request/bank-account.requests.dtos';

const bankAccountService = require('../../services/bank-account.service');

exports.create = async (req: Request<ICreateBankAccount>, resp: Response, next: NextFunction) => {

    const {body} = req;
    if (!body) {
        const error: ApiError = {
            message: 'No data provided to create account',
            status: 400
        };
        next(error);
    }
    try {
        resp.status(201).send({
            id: await bankAccountService.create(body)
        });


    } catch (err: ApiError | Error | any) {
        const error: ApiError = {
            message: err.message || 'Unexpected error',
            status: err.status || 500,
            messageException: err.messageException || null
        };
        next(error);
    }
};