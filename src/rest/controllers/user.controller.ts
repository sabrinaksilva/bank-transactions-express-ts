import { Request, Response, NextFunction } from "express"
import { IUserCreateAccount } from "../../entities/dtos/request/user.request.dto";
const userService = require("../../services/user.service");

exports.register = async (req: Request, resp: Response, next: NextFunction) => {
    const { body } = req;

    if (body != null) {
        try {
            const user: IUserCreateAccount = {
                name: body.name,
                document: body.document,
                initialPassword: body.initialPassword
            }

            resp.status(201).send({
                id: await userService.create(user)
            })


        } catch (err: Error | any) {
            console.log(err);
            const error = new Error(err.message || "Unexpected error to create user");
            next(error);
        }
    }



}

