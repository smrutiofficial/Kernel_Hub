const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
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

const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: `Kernel Hub <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Kernel Hub!",
      text: `Hi ${name},\n\nWelcome to Kernel Hub! We’re excited to have you onboard.\n\nYour registration is successful, and you’re all set to explore the latest updates and news about Linux and the open-source ecosystem.\n\nEnjoy your time with us!\n\nBest regards,\nThe Kernel Hub Team`,
    });
    // console.log(`Welcome email sent to ${email}`);
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
};

module.exports = { sendWelcomeEmail };
