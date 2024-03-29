import { NextFunction, Request, Response } from 'express';
import { Jwt } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/unauthorized.error';

require('dotenv/config');
const jwt = require('jsonwebtoken');
const secretJwt: string | any = process.env.JWT_SECRET;

exports.authenticate = (req: Request, resp: Response, next: NextFunction) => {
    let error = undefined;
    let token = req.headers.authorization;

    try {
        token = token?.split('Bearer ')[1];
    } catch (err) {
        error = new UnauthorizedError('Missing Authorization Token');
        next(error);
    }

    jwt.verify(token, secretJwt, {algorithm: 'HS512'}, (err: Error, decodedToken?: Jwt | any) => {
        if (err || !decodedToken) error = new UnauthorizedError('User not logged in.');

        if (!decodedToken || (Date.now() > (decodedToken?.exp ?? 0) * 1000)) error = new UnauthorizedError('Invalid Token');
    });
    next(error);
};