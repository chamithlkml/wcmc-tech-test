import { Router } from 'express'
import { getCountries } from '../controllers/countries'

const countriesRoutes  = Router()

countriesRoutes.get('/', getCountries);

export default countriesRoutes;