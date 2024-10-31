const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  updateAdminData, 
} = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware"); // Import your middleware

const router = express.Router();

// Register user
router.post("/register", registerAdmin);

// Login user
router.post("/login", loginAdmin);

// Get user data
// router.get("/me", authMiddleware, getUserData); // Add the /me route with authentication middleware

// Update user data
router.put("/me", authMiddleware, updateAdminData);

module.exports = router;
