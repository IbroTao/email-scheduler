const { CronJob } = require("cron");

const testCron = new CronJob("* * * * *", () => {
  console.log("Running a task every minute");
});

console.log("Cron job scheduled. Waiting for task to run...");
module.exports = { testCron };
