const nodemailer = require("nodemailer");

let otpStore = {};

const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com", 
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

const sendOtp = async (req, res, next) => {
  const { email, name } = req.body;

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP with email as key
  otpStore[email] = otp;

  try {
    // Send email with the OTP
    await transporter.sendMail({
      from: `kernel Hub ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Verify Your Email for Kernel Hub Registration",
      text: `
Hi ${name},

Thank you for registering with Kernel Hub! To complete your registration and verify your email address, please use the One-Time Password (OTP) provided below:

Your OTP:  ${otp}

Please enter this code on the verification page to confirm your email address. This code is valid for the next 10 minutes.

If you did not request this code, please ignore this email, and your account will not be created.

Need Help?

If you have any questions, feel free to reach out to our support team at support@kernelhub.com.

Thank you,
The Kernel Hub Team
`,
    });

    res
      .status(200)
      .json({ msg: "OTP sent to email. Verify to complete registration." });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
};

module.exports = {sendOtp};
