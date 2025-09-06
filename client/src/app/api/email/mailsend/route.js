import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Kernel hub" <smrutiprakashr0@gmail.com>', // sender address
      to: "routpriyadarsani317@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello from kernel hub?</b>", // html body
    });

    console.log("Email sent:", info.messageId);
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({
      error: "Failed to send email",
      details: error.message
    }, { status: 500 });
  }
};
