import nodemailer from "nodemailer";

const mailsend = async (req, res) => {
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
  console.log(info);
  res.send(info);
};

module.exports = { mailsend };
