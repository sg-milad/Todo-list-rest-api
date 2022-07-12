const Task = require("../model/model.task");
const List = require("../model/model.list");
const { BSONTypeError } = require("bson");

const creatTask = async (req, res, next) => {
  const { title } = req.body;
  try {
    const list = List.findOne({ _id: req.params.listid });
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }
    const task = await Task.create({
      title,
      listId: req.params.listid,
    });
    res.status(201).json({
      task,
    });
  } catch (err) {
    if (err.errors) {
      return res.status(400).json({
        message: err.errors.title.message,
      });
    }
    next(err);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      listId: req.params.listid,
    }).sort({ createdAt: -1 });
    if (!tasks) {
      return res.status(404).json({
        message: "Tasks not found",
      });
    }
    res.status(200).json({
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  const { title, completed } = req.body;
  try {
    const list = List.findOne({ _id: req.params.listid });
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }
    if (req.body.title === undefined) {
      return res.status(400).json({
        message: "List title is required",
      });
    }
    const task = await Task.findByIdAndUpdate(req.params.taskid, {
      title,
      completed,
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      id: task._id,
      message: `Task updated successfully`,
    });
  } catch (err) {
    if (BSONTypeError(err)) {
      return res.status(400).json({
        message: "id is not valid",
      });
    }
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const list = List.findOne({ _id: req.params.listid });
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }
    const task = await Task.findByIdAndDelete(req.params.taskid);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      id: task._id,
      message: `Task deleted successfully`,
    });
  } catch (err) {
    if (BSONTypeError(err)) {
      return res.status(400).json({
        message: "id is not valid",
      });
    }
    next(err);
  }
};

module.exports = {
  creatTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
