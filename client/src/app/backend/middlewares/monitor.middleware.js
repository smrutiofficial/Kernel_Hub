// app/api/health/route.js
import os from "os";
import { NextResponse } from "next/server";

const formatUptime = (uptimeInSeconds) => {
  const days = Math.floor(uptimeInSeconds / 86400);
  const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export const GET = async () => {
  try {
    const responseStart = process.hrtime();

    const totalMemory = os.totalmem() / (1024 * 1024);
    const freeMemory = os.freemem() / (1024 * 1024);
    const usedMemory = totalMemory - freeMemory;

    const loadAverage = os.loadavg();
    const uptime = os.uptime();
    const formattedUptime = formatUptime(uptime);

    const responseEnd = process.hrtime(responseStart);
    const responseTime = Math.round(
      (responseEnd[0] * 1e9 + responseEnd[1]) / 1e6
    );

    const metricsData = {
      memoryUsage: {
        total: `${totalMemory.toFixed(2)} MB`,
        free: `${freeMemory.toFixed(2)} MB`,
        used: `${usedMemory.toFixed(2)} MB`,
      },
      cpuLoad: {
        "1min": loadAverage[0].toFixed(2),
        "5min": loadAverage[1].toFixed(2),
        "15min": loadAverage[2].toFixed(2),
      },
      serverUptime: formattedUptime,
      responseTime: `${responseTime} ms`,
    };

    return NextResponse.json({ status: "Healthy", data: metricsData });
  } catch (err) {
    console.error("System health check failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
