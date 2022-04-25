const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '名稱必填'],
    },
    content: {
      type: String,
      required: [true, '內容必填'],
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
