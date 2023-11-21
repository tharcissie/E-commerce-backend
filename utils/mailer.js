const nodemailer = require("nodemailer");
require("dotenv").config();

const config = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

const SENDMAIL = async (mailDetails, callback) => {
    try {
      const info = await config.sendMail(mailDetails)
      callback(info);
    } catch (error) {
      console.log(error);
    } 
  };

module.exports = SENDMAIL;