import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/blogapp";

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      bufferCommands: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

export default connectDB;
