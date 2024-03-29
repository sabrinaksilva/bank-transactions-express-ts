import { NextFunction, Request, Response } from 'express';
import { ICreateBankAccount } from '../../entities/dtos/request/bank-account.requests.dtos';
import { BadRequestError } from '../../errors/bad-request.error';

const bankAccountService = require('../../services/bank-account.service');

exports.create = async (req: Request<ICreateBankAccount>, resp: Response, next: NextFunction) => {
    const {body} = req;
    if (!body) {
        throw new BadRequestError('Missing data to create account');
    }
    resp.status(201).send({
        id: await bankAccountService.create(body)
    });

};