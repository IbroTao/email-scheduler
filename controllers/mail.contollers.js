const nodemailer = require("nodemailer");
require("dotenv").config();

const sender = process.env.SENDER_NAME;
const emailAccess = process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: sender,
    pass: emailAccess,
  },
  secure: true,
});

const sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const mailData = {
      from: "ghostcodert@gmail.com",
      to: to,
      subject: subject,
      html: `<b>Your Task: ${text}</b>`,
    };

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(error);
      }
      res.status(200).json({
        message: "Mail sent",
        message_id: info.messageId,
      });
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.json(err);
  }
};

module.exports = { sendEmail };
