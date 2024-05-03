export class NetworkError extends Error {
    constructor(message: string, asserter: any = undefined) {
        super(message);
        Error.captureStackTrace?.(this, asserter || this.constructor);
    }
}