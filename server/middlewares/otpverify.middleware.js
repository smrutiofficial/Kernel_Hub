const {otpStore} =require("../utils/otpstore") 

const verifyOtp = (req, res, next) => {
  const { email, otp } = req.body;

  // Check if OTP matches the stored one
  if (otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP once verified
    next(); // Proceed to the next step, i.e., registration
  } else {
    res.status(400).json({ msg: "Invalid or expired OTP" });
  }
};

module.exports = {verifyOtp};
