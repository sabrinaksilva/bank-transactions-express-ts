import { NextFunction, Request, Response } from 'express';
import { ICreateBank } from '../../entities/dtos/request/bank.requests.dtos';
import { ApiError } from '../../entities/dtos/shared/api.error.interface';

const bankService = require('../../services/bank.service');

exports.create = async (req: Request, resp: Response, next: NextFunction) => {
    const {body} = req;

    validateMandatoryFields(body, next);

    if (body != null) {
        try {
            const bankDTO: ICreateBank = {
                companyName: body.companyName,
                tradeName: body.tradeName,
                registrationNumber: body.registrationNumber

            };

            resp.status(201).send({
                id: await bankService.create(bankDTO)
            });

        } catch (err: { status: number; message: string; } | any) {
            console.log(err);

            let error: ApiError;

            if (err.code === 'ER_DUP_ENTRY') {
                error = {
                    message: 'Bank agency already exists!',
                    status: 400
                };
            } else {
                error = {
                    message: err.message || 'Unexpected error to create bank',
                    status: err.status || 500
                };
            }

            next(error);
        }
    } else {
        const error: ApiError = {
            message: 'No fields provided to create a new Bank agency',
            status: 400
        };
        next(error);
    }


};

function validateMandatoryFields(body: any, next: NextFunction): void {
    let message = null;
    if (!body.companyName) {
        message = 'The company name must be provided!';
    }
    if (!body.tradeName) {
        message = 'The trade name must be provided!';
    }
    if (!body.registrationNumber) {
        message = 'The registration number must be provided!';
    }

    if (message) {
        let error: { status: number; message: string; } = {
            status: 400, message: 'The company name must be provided!'
        };
        next(error);
    }
}

