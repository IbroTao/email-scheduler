const { Task } = require("../models/task.model");

const scheduleTask = async (req, res) => {
  try {
    const { body } = req;
    const task = await Task.create({
      desc: body.desc,
    });
    res.status(201).json("Task scheduled");
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const { body } = req;
    const task = await Post.findByIdAndUpdate(req.params.id, {
      desc: body.desc,
    });
    res.status(200).json("Task updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { scheduleTask, updateTask, deleteTask };
