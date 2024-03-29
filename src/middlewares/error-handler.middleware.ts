import { NextFunction, Request, Response } from 'express';

exports.handle = async (error: {
    status: any;
    message?: string;
    name?: any;
    parameters: any[] | undefined
}, req: Request, resp: Response, next: NextFunction) => {

    if (error.name === 'QueryFailedError') {
        try {
            if (error.message && error.message.includes('ER_DUP_ENTRY')) {
                error.message = 'Resource already exists: ' + error.message.split('ER_DUP_ENTRY')[1].split('Duplicated entry')[0];
                error.status = 400;
            } else {
                if (error.message && error.message.includes('ER_NO_DEFAULT_FOR_FIELD')) {
                    error.message = 'Mandatory field ' + error.message.split('ER_NO_DEFAULT_FOR_FIELD:')[1].replace('default value', 'any value. Please enter a valid value');
                    error.status = 400;
                } else error.message = 'Operation failed. ';

            }
        } catch (ignored) {
        }

    }

    resp.status(error.status ?? 500).send({message: error.message ?? 'Unexpected error'});
};