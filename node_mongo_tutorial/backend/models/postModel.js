const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: "string",
    unique : true,
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
  likes: {
    type: Array,
  },
},{
    timestamps : true,
});
const validatePost = (post) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(5).max(10000).required(),
    category: Joi.string().min(5).max(100), 
    image: Joi.string(),
  });

  return schema.validate(post);
};

const Post = mongoose.model("Post", postSchema)

module.exports = {Post, validatePost}