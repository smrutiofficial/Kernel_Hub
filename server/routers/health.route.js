// healthRouter.js
const express=require("express");
const { getHealthStatus }=require("../controllers/health.controller");

const router = express.Router();

router.get('/healthcheck', getHealthStatus);

module.exports = router;
