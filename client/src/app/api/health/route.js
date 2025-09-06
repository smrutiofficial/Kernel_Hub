// healthController.js
import mongoose from "mongoose";
import os from "os";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Check database connectivity
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    let dbResponseTime = 'N/A';

    if (mongoose.connection.db) {
      const dbResponseStart = process.hrtime();
      // Attempt a simple operation instead of command({ ping: 1 })
      await mongoose.connection.db.admin().ping();
      const dbResponseEnd = process.hrtime(dbResponseStart);
      dbResponseTime = Math.round((dbResponseEnd[0] * 1e9 + dbResponseEnd[1]) / 1e6); // in ms
    } else {
      console.error("Database connection is not properly established.");
    }

    // Check Cloudinary connectivity
    let cloudinaryStatus = 'Disconnected';
    try {
      await cloudinary.v2.api.ping();
      cloudinaryStatus = 'Connected';
    } catch (err) {
      console.error('Cloudinary connection error:', err);
    }

    // Get server uptime and memory usage
    const serverUptime = os.uptime();
    const memoryUsage = process.memoryUsage().rss / (1024 * 1024); // in MB

    // Response data
    const healthData = {
      database: {
        status: dbStatus,
        responseTime: `${dbResponseTime}ms`
      },
      cloudinary: {
        status: cloudinaryStatus
      },
      server: {
        uptime: `${serverUptime} seconds`,
        memoryUsage: `${memoryUsage.toFixed(2)} MB`
      }
    };

    NextResponse.status(200).json({ status: 'Healthy', data: healthData });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
