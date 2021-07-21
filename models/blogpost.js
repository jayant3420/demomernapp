const mongoose = require("mongoose");

//Schema
const dummySchema = mongoose.Schema({
  id: Number,
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now()
  }
});

const BlogPostModel = mongoose.model("blogposts", dummySchema);
module.exports = BlogPostModel;
