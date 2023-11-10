const { Task } = require("../models/task.model");

const scheduleTask = async (req, res) => {
  try {
    const { desc, userEmail } = req.body;
    const task = await Task.create({
      desc,
      userEmail,
    });
    const savedTask = await task.save();
    res.status(201).json("Task scheduled", savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const { desc } = req.body;
    const task = await Post.findByIdAndUpdate(req.params.id, {
      desc,
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
