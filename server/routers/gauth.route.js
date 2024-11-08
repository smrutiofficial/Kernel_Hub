const express = require("express");
const passport = require("passport");
const router = express.Router();

// Endpoint to initiate Google authentication
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback endpoint to send JSON response with token, no redirection
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`https://kernelhub.vercel.app?token=${token}`); // Send token in JSON response
  }
);

module.exports = router;
