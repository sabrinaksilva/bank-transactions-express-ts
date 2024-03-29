import { NextFunction, Request, Response } from 'express';
import { ICreateBank } from '../../entities/dtos/request/bank.requests.dtos';
import { ApiError } from '../../errors/api.error';
import { DuplicatedResourceError } from '../../errors/duplicated-resource.error';
import { BadRequestError } from '../../errors/bad-request.error';

const bankService = require('../../services/bank.service');

exports.create = async (req: Request, resp: Response, next: NextFunction) => {
    const {body} = req;
    if (!body) throw new BadRequestError('Missing fields to create a new Bank agency');

    validateMandatoryFields(body);

    try {
        const bankDTO: ICreateBank = {
            companyName: body.companyName,
            tradeName: body.tradeName,
            registrationNumber: body.registrationNumber

        };

        resp.status(201).send({
            id: await bankService.create(bankDTO)
        });

    } catch (err: { status?: number; message?: string; } | any) {
        if (err.code === 'ER_DUP_ENTRY') throw new DuplicatedResourceError('Bank agency already exists!');
        throw new ApiError(err.message, err.status);
    }


};

function validateMandatoryFields(body: any): void {
    if (!body.companyName || !body.tradeName || !body.registrationNumber) {
        throw new BadRequestError('Company name, trade name and registration number are required!');
    }
}

