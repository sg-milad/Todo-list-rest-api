const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "List title is required"],
      minlength: 1,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "List description is required"],
      minlength: 1,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
