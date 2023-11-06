const router = require("express").Router();
const { sendMsg } = require("../controllers/admin.controllers");

router.post("/send/msg", sendMsg);

module.exports = router;
