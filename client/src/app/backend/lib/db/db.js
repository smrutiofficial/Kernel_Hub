import mongoose from "mongoose";

// Check for both common environment variable names
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/blogapp";

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;
  
  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  
  if (connectionState === 2) {
    console.log("Connecting to MongoDB...");
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      bufferCommands: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err; // Re-throw to handle in calling code if needed
  }
};

export default connectDB;