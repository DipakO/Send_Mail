import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const route = express.Router();

route.post("/textmail", (req, res) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.OWNEMAIL,
      pass: process.env.PASS,
    },
    secure: true,
  });

  const { to } = req.body;
  const mailData = {
    from: process.env.OWNEMAIL, // Your email
    to: to, // Your friend email
    subject: "Sending mail using express js",
    text: "Thats a Amazing",
    html: `<b>Hey there! </b> <br><p> This is our first message sent with Nodemailer</p><br/>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      return console.log(err);
    } else {
      res.status(200).send("Mail send Succesfully");
      console.log({ massege: MailSend, message_id: info.messageId });
    }
  });
});

export default route;
