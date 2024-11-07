const express = require("express");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard", // or wherever you want to redirect after success
    failureRedirect: "/login",     // handle failure
  })
);

module.exports = router;
