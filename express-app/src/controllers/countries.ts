import { Request, Response, NextFunction } from 'express'
import JsonDataHandler from '../lib/json-data-handler'
import { COUNTRY_METRICS_FILE_PATH } from '../config'
import CountryData from '../lib/country-data'
const jsonDataHandler = JsonDataHandler.getInstance(COUNTRY_METRICS_FILE_PATH)
const countryData = new CountryData(jsonDataHandler)

export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const countries = await countryData.getCountries()
    
    res.json(countries)
  } catch (error) {
    next(error);
  }
};