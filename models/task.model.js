const mongoose = require("mongoose");

const Task = mongoose.model(
  "tasks",
  new mongoose.Schema(
    {
      desc: {
        type: String,
        required: true,
      },
      userEmail: {
        type: String,
        required: true,
      },
      emailSent: {
        type: Boolean,
        default: false,
      },
    },
    {
      timeseries: true,
    }
  )
);

module.exports = { Task };
