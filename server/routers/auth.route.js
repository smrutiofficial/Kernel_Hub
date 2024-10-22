const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
  updateUserData, 
} = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware"); // Import your middleware

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user data
router.get("/me", authMiddleware, getUserData); // Add the /me route with authentication middleware

// Update user data
router.put("/me", authMiddleware, updateUserData);

module.exports = router;
