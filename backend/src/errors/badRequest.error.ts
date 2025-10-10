import { CustomError } from "./custom.error";

export default class BadRequestError extends CustomError {
  private readonly _statusCode: number;
  private readonly _logging: boolean;
  private readonly _errorCode: string;

  constructor(params?: { statusCode?: number; errorCode?: string; message?: string; logging?: boolean }) {
    const message = params?.message || 'Bad Request';
    super(message);

    this._statusCode =  params?.statusCode || 400;
    this._errorCode = params?.errorCode || 'BAD_REQUEST';
    this._logging = params?.logging ?? false;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  get errors() {
    return [{ code: this._errorCode, message: this.message }];
  }

  get statusCode() {
    return this._statusCode;
  }

  get logging() {
    return this._logging;
  }
}