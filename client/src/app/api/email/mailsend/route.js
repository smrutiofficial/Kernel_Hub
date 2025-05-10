import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const GET = async () => {
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Kernel hub" <smrutiprakashr0@gmail.com>', // sender address
    to: "routpriyadarsani317@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello from kernel hub?</b>", // html body
  });
  // console.log(info);
  NextResponse.send(info);
};

