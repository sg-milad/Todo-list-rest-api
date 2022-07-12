const List = require("../model/model.list");
const { BSONTypeError } = require("bson");

const creatList = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const list = await List.create({
      title,
      description,
    });
    res.status(201).json({
      list,
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

const getAllLists = async (req, res, next) => {
  try {
    const lists = await List.find({}).sort({ createdAt: -1 });
    if (!lists) {
      return res.status(404).json({
        message: "Lists not found",
      });
    }
    res.status(200).json({
      lists,
    });
  } catch (err) {
    next(err);
  }
};

const updateList = async (req, res, next) => {
  const { title, description } = req.body;
  const { listid } = req.params;
  try {
    if (req.body.title === undefined || req.body.description === undefined) {
      return res.status(400).json({
        message: "List description|title is required",
      });
    }
    const list = await List.findByIdAndUpdate(listid, {
      title,
      description,
    });
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }
    res.status(200).json({
      id: list._id,
      message: `List updated successfully`,
    });
  } catch (err) {
    if (BSONTypeError(err)) {
      return res.status(400).json({
        message: "id is not valid",
      });
    }
    if (err.errors) {
      return res.status(400).json({
        message: err.errors.title.message,
      });
    }
    next(err);
  }
};

const deleteList = async (req, res, next) => {
  const { listid } = req.params;
  try {
    const list = await List.findByIdAndDelete(listid);
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }
    res.status(200).json({
      id: list._id,
      message: `List deleted successfully`,
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

const getListById = async (req, res, next) => {
  const { listid } = req.params;
  try {
    const list = await List.findById(listid);
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }
    res.status(200).json({
      list,
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
  creatList,
  getAllLists,
  updateList,
  deleteList,
  getListById,
};
