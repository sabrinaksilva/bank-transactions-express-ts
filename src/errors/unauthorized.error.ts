import { ApiError } from '../errors/api.error';

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}
