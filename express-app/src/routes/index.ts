import { Router } from 'express'
import countriesRoutes from './countries';
const rootRouter = Router();

rootRouter.use('/countries', countriesRoutes);

export default rootRouter;