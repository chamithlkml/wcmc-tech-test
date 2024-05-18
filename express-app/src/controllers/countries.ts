import { Request, Response, NextFunction } from 'express'
import JsonDataHandler from '../lib/json-data-handler'
import { COUNTRY_METRICS_FILE_PATH } from '../config'
import CountryData from '../lib/country-data'
import SqlDataHandler from '../lib/sql-data-handler'
// const jsonDataHandler = JsonDataHandler.getInstance(COUNTRY_METRICS_FILE_PATH)
const sqlDataHandler = SqlDataHandler.getInstance();
const countryData = new CountryData(sqlDataHandler)

export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prefix = !req.query.prefix ? '' : req.query.prefix.toString()
    const countries = await countryData.getCountries(prefix)
    
    res.json(countries)
  } catch (error) {
    next(error);
  }
};