const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    dscription: {
      type: String,
      required: true,
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
