import { AUTH_TOKEN } from '../config';
import { Request, Response, NextFunction } from 'express'
import { ErrorCode, HttpException } from '../exceptions/http-exception';


export const authRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    if(req.headers['x-auth-token'] != AUTH_TOKEN){
      throw new HttpException('You are not authorised to perform this action', ErrorCode.AUTH_FAILURE, 500, 'Auth failure');
    }

    next();
  } catch (error) {
    next(error);
  }
};