import { Router } from 'express'
import countriesRoutes from './countries';
import metricRoutes from './metrics';
const rootRouter = Router();

rootRouter.use('/countries', countriesRoutes);
rootRouter.use('/metrics', metricRoutes);

export default rootRouter;