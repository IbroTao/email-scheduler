const express = require("express");
const { mongoSetUp } = require("./configs/mongo.configs");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
const adminRouter = require("./routes/admin.routes");
const mailRouter = require("./routes/mail.routes");
const { testCron } = require("./controllers/schedule.controllers");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/admin", adminRouter);
app.use("/api/mail", mailRouter);

const runServer = (port) => {
  mongoSetUp()
    .then((res) => {
      app.listen(port);
      console.log(`App is running on PORT ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

testCron.start();
runServer(port);
