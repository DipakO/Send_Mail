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

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
