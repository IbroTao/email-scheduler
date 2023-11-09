const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "ghostcodert@gmail.com",
    pass: "vast ffoy hdqi bdqa",
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
      text: text,
      html: "<b>Hey there!</b> <br>This is my first message sent with Nodemailer <br/>",
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

module.exports = { sendEmail };
