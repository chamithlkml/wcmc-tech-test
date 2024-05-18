import { Request, Response, NextFunction } from 'express'
import JsonDataHandler from '../lib/json-data-handler'
import { COUNTRY_METRICS_FILE_PATH } from '../config'
import MetricData from '../lib/metric-data'
import { ArgumentException } from '../exceptions/argument-exception'
import { ErrorCode } from '../exceptions/http-exception'
import SqlDataHandler from '../lib/sql-data-handler'
// const jsonDataHandler = JsonDataHandler.getInstance(COUNTRY_METRICS_FILE_PATH)
const sqlDataHandler = SqlDataHandler.getInstance();
const metricData = new MetricData(sqlDataHandler)

export const getMetrics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.query.country){
      throw new ArgumentException('country is required', ErrorCode.ARGUMENT_ERROR, 422)
    }
    const metrics = await metricData.getMetrics(req.query.country.toString())
    
    res.json(metrics)
  } catch (error) {
    next(error)
  }
}