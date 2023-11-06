const { uploadToCloud } = require("../middlewares/cloudinary");
const { Post } = require("../models/post.model");

const createPost = async (req, res) => {
  try {
    const { file, body } = req;
    const url = await uploadToCloud(file.path);

    const post = await Post.create({
      title: body.title,
      content: body.content,
      userid: req.userid,
      image: url,
    });
    res.status(201).json("Post created");
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { file, body } = req;
    const url = await uploadToCloud(file.path);
    const post = await Post.findByIdAndUpdate(req.params.id, {
      image: url,
      title: body.title,
      content: body.content,
      userid: req.userid,
    });
    res.status(200).json("Post updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createPost, updatePost, deletePost };
