const mongoose = require("mongoose");
const { compareSync, hashSync } = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please add name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add email"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
