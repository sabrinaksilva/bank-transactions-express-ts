import { ApiError } from '../errors/api.error';

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}
