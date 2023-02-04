const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: "string",
    required: [true, "Please add a post title"],
  },
  category: {
    type: 'string',
  },
  image: {
    type: String,
  },
  content: {
    type: "string",
    required: [true, "Please add a post content"],
  },
},{
    timestamps : true,
});

module.exports = mongoose.model("Post", postSchema)