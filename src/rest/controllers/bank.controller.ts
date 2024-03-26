import { Request, Response, NextFunction } from "express"
import { ICreateBank } from "../../entities/dtos/request/bank.requests.dtos";
const bankService = require("../../services/bank.service")

exports.create = async (req: Request, resp: Response, next: NextFunction) => {
    const { body } = req;

    validateMandatoryFields(body, next);

    if (body != null) {
        try {
            const bankDTO: ICreateBank = {
                companyName: body.companyName,
                tradeName: body.tradeName,
                registrationNumber: body.registrationNumber,
                taxes: body.taxes

            }

            resp.status(201).send({
                id: await bankService.create(bankDTO)
            })

        } catch (err: { status: number; message: string; } | any) {
            console.log(err);
            let error;
            if (err.code === 'ER_DUP_ENTRY') {
                error = new Error("Bank agency already exists!");
            } else {
                error = {
                    message: err.message || "Unexpected error to create user",
                    status: err.status || 400
                }
            }

            next(error);
        }
    } else {
        const error = new Error("No fields provided to create a new Bank agency");
        next(error);
    }


}

function validateMandatoryFields(body: any, next: NextFunction) {
    if (!body.companyName) {
        let error: { status: number; message: string; } = {
            status: 400, message: "The company name must be provided!"
        };
        next(error);
    }
    if (!body.tradeName) {
        let error: { status: number; message: string; } = {
            status: 400, message: "The trade name must be provided!"
        };
        next(error);
    }
    if (!body.registrationNumber) {
        let error: { status: number; message: string; } = {
            status: 400, message: "The registration number must be provided!"
        };
        next(error);
    }
    if (!body.taxes) {
        const error = new Error("taxes (%) field must be provided!");
        next(error);
    }
}

