const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add email"],
    },
    phone: {
      type: String,
      required: [true, "Please add phone"],
    },
    car: {
      type: String,
      required: [true, "Please add car"],
    },
    model: {
      type: String,
      required: [true, "Please add model"],
    },
    color: {
      type: String,
      required: [true, "Please add color"],
    },
    license: {
      type: String,
      required: [true, "Please add license"],
    },
    department: {
      type: String,
      required: [true, "Please add department"],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
