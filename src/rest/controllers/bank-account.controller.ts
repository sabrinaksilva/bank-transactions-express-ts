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

exports.makeTransfer = async (req: Request, resp: Response, next: NextFunction) => {
    const {body} = req;
    if (!body || !body.originAccountId || !body.destinationAccountId || !body.amount) {
        throw new BadRequestError('The required parameters are required to make a transfer: originAccountId, destinationAccountId amount to transfer');
    }

    await bankAccountService.makeTransfer(body.originAccountId, body.destinationAccountId, body.amount);
    resp.status(200).send({
        'message': 'Successfully transfer amount between accounts'
    });

};
