const nodemailer = require("nodemailer");
const cron = require("node-cron");
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
  } catch (err) {
    res.status(500).json(err);
  }
};

function logMessage() {
  console.log("Event is scheduled.");
}

cron.schedule =
  ("* * * * *",
  () => {
    logMessage();
  });

module.exports = { sendEmail };
