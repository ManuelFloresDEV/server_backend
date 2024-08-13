const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    profilePic: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
