import { ErrorCode, HttpException } from "./http-exception";

export class ArgumentException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any = 'Argument error'){
    super(message, errorCode, statusCode, errors)
  }
}