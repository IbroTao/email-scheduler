const { scheduleTask } = require("../controllers/task.controllers");
const { verifyUser } = require("../middlewares/header");

const router = require("express").Router();

router.post("/create", verifyUser, scheduleTask);

module.exports = router;
