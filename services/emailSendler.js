const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_USER, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // also can use 25 or 2525, but they aren't secured
  secure: true,
  // secure: false,
  // pull: true,
  auth: {
    user: META_USER,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: META_USER,
  };

  transport
    .sendMail(email)
    .then(() => console.log("NODEMAILER. Email sent successfully"))
    .catch((error) => console.log("NODEMAILER. Email send error: \n", error));
};

const emailSendler = {
  sendEmail,
};

module.exports = emailSendler;
