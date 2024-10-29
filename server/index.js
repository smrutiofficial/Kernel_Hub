const express = require("express");
const connectDB = require("./db/db");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
// Load environment variables from .env file
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set views directory
app.set("views", path.join(__dirname, "views"));
// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.static("public"));

// Define routes
app.use("/api/auth", require("./routers/auth.route.js"));
app.use("/api/posts", require("./routers/post.route.js"));
app.use("/api/comments", require("./routers/comment.route.js")); // Comment routes
app.use("/", require("./routers/api"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
