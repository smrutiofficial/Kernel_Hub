const express = require("express");
const connectDB = require("./db/db");
const path = require("path");
const app = express();
const cors = require("cors");
const tagsRouter = require("./routers/tag.route.js");
const healthRouter=require("./routers/health.route.js");
const mailsend =require("./routers/email.route.js");

app.use(cors());
// Load environment variables from .env file
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON
app.use(express.json());

// Define routes
app.use("/", require("./routers/api"));
app.use("/api/auth", require("./routers/auth.route.js"));
app.use("/api/posts", require("./routers/post.route.js"));
app.use("/api/comments", require("./routers/comment.route.js")); // Comment routes
app.use("/api/auth/admin",require("./routers/admin.route.js"))
// tags routes
app.use("/api/tags", tagsRouter);
// health  routes
app.use("/api", healthRouter);
// test mail
app.use("/api",mailsend);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
