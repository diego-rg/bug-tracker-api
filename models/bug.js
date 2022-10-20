const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BugSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "assigned", "fixed"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "high"],
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "high"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", BugSchema);
