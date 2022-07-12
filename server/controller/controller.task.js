const Task = require("../model/model.task");
const List = require("../model/model.list");
const { BSONTypeError } = require("bson");
const { getListById } = require("../controller/controller.list");
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
    if (err.errors.title) {
      return res.status(400).json({
        message: err.errors.title.message,
      });
    }
    if (BSONTypeError(err)) {
      return res.status(400).json({
        message: "id is not valid",
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
    if (!tasks || tasks.length === 0) {
      return res.status(204).json({
        message: "Tasks is empty",
      });
    }
    res.status(200).json({
      tasks,
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

const updateTask = async (req, res, next) => {
  const { title, completed } = req.body;
  try {
    const { listid } = req.params;
    const list = await List.findById(listid);
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }
    if (req.body.title === undefined) {
      return res.status(400).json({
        message: "title is required",
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
    return res.status(200).json({
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
    const list = await List.findOne({ _id: req.params.listid });
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
