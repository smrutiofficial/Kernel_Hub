import {otpStore} from "../utils/otpstore";
import {NextResponse} from "next/server" ;

const verifyOtp = (req) => {
  const { email, otp } = req.body;

  // Check if OTP matches the stored one
  if (otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP once verified
    next(); // Proceed to the next step, i.e., registration
  } else {
    NextResponse.status(400).json({ msg: "Invalid or expired OTP" });
  }
};

module.exports = {verifyOtp};
