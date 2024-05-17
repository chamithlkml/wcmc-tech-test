import { Request, Response, NextFunction } from "express";
import Logger from "../lib/logger";
import { ErrorCode, HttpException } from "../exceptions/http-exception";
const logger = Logger.getInstance()

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  logger.error(err);

  if(err instanceof HttpException){
    res.status(err.statusCode).json({
      success: false,
      error_code: err.errorCode,
      message: err.message,
      errors: err.errors || [err.message]
    })
  }else{
    res.status(500).json({
      success: false,
      errorCode: ErrorCode.INTERNAL_ERROR,
      message: err.message,
      errors: [err.message]
    });
  }
};

export default ErrorHandler;