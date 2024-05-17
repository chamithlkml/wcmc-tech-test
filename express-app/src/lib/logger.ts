import winston from "winston";
import Loggable from "../interfaces/loggable";

class Logger implements Loggable{
  private static instance: Logger;
  private logger: winston.Logger;

  private constructor(){
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: '/app/log/error.log', level: 'error' }),
        new winston.transports.File({ filename: '/app/log/combined.log' }),
      ],
    });
  }

  static getInstance(): Logger{
    if(!this.instance){
      this.instance = new Logger()
    }

    return this.instance
  }

  info(message: any): void {
    this.logger.info(message);
  }

  error(message: any): void {
      this.logger.info(message);
  }
}

export default Logger;