import { NextFunction, Request, Response } from 'express';

exports.handle = async (error: {
    status: any;
    message: any;
    name?: any;
    parameters: any[] | undefined
}, req: Request, resp: Response, next: NextFunction) => {

    if (error.name === 'QueryFailedError') {
        if (error.message?.contains('ER_DUP_ENTRY')) {
            error.message = 'Resource already exists: ' + error.message.slice('ER_DUP_ENTRY')[1].slice('Duplicated entry')[0];
            error.status = 400;
        } else error.message = 'Operation failed. ';

    }

    resp.status(error.status ?? 500).send({message: error.message ?? 'Unexpected error'});
};