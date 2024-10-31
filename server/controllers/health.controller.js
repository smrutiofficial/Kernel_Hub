// healthController.js
const mongoose=require("mongoose");
const os=require("os");
const cloudinary=require("cloudinary");

const getHealthStatus = async (req, res) => {
  try {
    // Check database connectivity
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    const dbResponseStart = process.hrtime();
    await mongoose.connection.db.command({ ping: 1 });
    const dbResponseEnd = process.hrtime(dbResponseStart);
    const dbResponseTime = Math.round((dbResponseEnd[0] * 1e9 + dbResponseEnd[1]) / 1e6); // in ms

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

    res.status(200).json({ status: 'Healthy', data: healthData });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ status: 'Unhealthy', error: error.message });
  }
};


module.exports={getHealthStatus}