export class ApiError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        message = message ?? 'Unknown error';
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = status ?? 500;
    }
}
