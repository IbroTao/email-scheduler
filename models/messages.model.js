const mongoose = require("mongoose");

const Messages = mongoose.model(
  "messages",
  new mongoose.Schema({
    message: {
      text: {
        type: String,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
  })
);

module.exports = { Messages };
