// healthRouter.js
const express=require("express");
const { getHealthStatus }=require("../controllers/health.controller");
const {getSystemMetrics}=require("../middlewares/monitor.middleware");

const router = express.Router();

router.get('/health', getHealthStatus);
router.get('/monitor',getSystemMetrics);

module.exports = router;
