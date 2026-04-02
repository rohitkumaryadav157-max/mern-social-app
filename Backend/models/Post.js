const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: String,
  text: String,
  image: String,

  likes: [String], // store usernames
  comments: [
    {
      username: String,
      text: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);