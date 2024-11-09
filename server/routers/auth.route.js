const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
  updateUserData, 
} = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware"); // Import your middleware
const {verifyOtp}  =require("../middlewares/otpverify.middleware.js")
const {sendOtp}=require("../middlewares/sendotp.middleware")
const router = express.Router();
const { upload } = require("../middlewares/profile_pic.middleware.js");



router.post("/register", sendOtp);
// Register user
router.post("/register/complete",verifyOtp, registerUser);

// Login user
router.post("/login", loginUser);

// Get user data
router.get("/me", authMiddleware, getUserData); // Add the /me route with authentication middleware

// Update user data
router.put("/me", authMiddleware, upload.single("image"), updateUserData);
// router.put("/me", authMiddleware, updateUserData);

module.exports = router;
