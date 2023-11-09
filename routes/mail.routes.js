const { sendEmail } = require("../controllers/mail.contollers");
const { verifyAndAuthorizeUser } = require("../middlewares/header");

const router = require("express").Router();

router.post("/send", sendEmail);

module.exports = router;
