const { CronJob } = require("cron");
const { Task } = require("../models/task.model");
const { sendEmail } = require("../controllers/mail.contollers");

const testCron = new CronJob("*/5 * * * *", async () => {
  console.log("Running a task every 5 minute(s)");

  try {
    const tasks = await Task.find({ emailSent: false });

    tasks.forEach(async (task) => {
      const emailContent = `Task: ${task.desc}`;
      sendEmail(task.userEmail, "Task notification", emailContent);

      task.emailSent = true;
      await task.save;
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { testCron };
