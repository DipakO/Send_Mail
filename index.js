import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import route from "./routes/sendMail.js";
dotenv.config();
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/mail", route);
const port = process.env.PORT || 2000;

// create reusable transporter object using the default SMTP transport
route.post("/atachmentmail", (req, res) => {
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
    attachments: [
      {
        // file on disk as an attachment
        filename: "dipak.jpg",
        path: "dipak.jpg",
      },
      {
        // file on disk as an attachment
        filename: "text_file.txt",
        path: "text_file.txt",
      },
    ],
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
app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
