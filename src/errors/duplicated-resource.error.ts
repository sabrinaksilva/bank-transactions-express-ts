import { ApiError } from '../errors/api.error';

export class DuplicatedResourceError extends ApiError {
    constructor(message: string) {
        super(message);
        this.status = 409;
    }
}
