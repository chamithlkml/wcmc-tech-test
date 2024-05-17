import { Router } from "express";
import { getMetrics } from "../controllers/metrics";

const metricRoutes = Router()
metricRoutes.get('/', getMetrics);

export default metricRoutes;