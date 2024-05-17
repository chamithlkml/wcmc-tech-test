import { ErrorCode, HttpException } from "./http-exception"

export class InternalException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any = 'Internal Server Error'){
    super(message, errorCode, statusCode, errors)
  }
}