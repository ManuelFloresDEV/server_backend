const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
