export class HttpException extends Error {
  public message: string;
  public errorCode: any;
  public statusCode: ErrorCode;
  public errors: any;

  constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any){
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  INTERNAL_ERROR = 1001
}