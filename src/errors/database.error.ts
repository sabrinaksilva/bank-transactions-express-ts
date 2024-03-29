import { ApiError } from '../errors/api.error';

export class DatabaseError extends ApiError {
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}
