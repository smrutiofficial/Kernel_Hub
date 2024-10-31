// healthRouter.js
import express from 'express';
import { getHealthStatus } from '../controllers/health.controller';

const router = express.Router();

router.get('/healthcheck', getHealthStatus);

export default router;
