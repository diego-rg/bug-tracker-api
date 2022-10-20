const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BugSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "You must provide a name for the bug"],
      unique: [true, "A bug with that name already exists"],
    },
    description: {
      type: String,
      required: [true, "You must provide a description for the bug"],
    },
    status: {
      type: String,
      enum: ["new", "assigned", "fixed"],
      default: "new",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "high"],
      required: [true, "You must provide a priority level for the bug"],
    },
    severity: {
      type: String,
      enum: ["low", "high"],
      required: [true, "You must provide a severity level for the bug"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", BugSchema);
