const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    userProfileImg: {
      type: String,
      default: true,
    },
    content: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
