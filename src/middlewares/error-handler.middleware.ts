import { NextFunction, Request, Response } from 'express';

exports.handle = async (error: { status: any; message: any; }, req: Request, resp: Response, next: NextFunction) => {
    resp.status(error.status ?? 500).send({message: error.message ?? 'Unexpected error'});
};