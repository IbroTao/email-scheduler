const mongoose = require("mongoose");

const Post = mongoose.model(
  "posts",
  new mongoose.Schema(
    {
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      userid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Post };
