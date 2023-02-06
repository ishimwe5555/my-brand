const asyncHandler = require('express-async-handler')
const multer = require('multer');
const path = require('path');
const Post = require('../models/postModel')
const Comment = require('../models/commentsModel')
const cloudinary = require('cloudinary').v2;
const authenticate = require('../middleware/authenticate');
const Like = require('../models/likesModel');

 
// Configuration 
cloudinary.config({
  cloud_name: "dir6akgf8",
  api_key: "558841897122288",
  api_secret: "DxV73zCbjvJl2kcgEbCLNMqTFKQ"
});

//CREATE STORAGE FOR IMAGE
 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, './uploads');
     },
   filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
   }
 });

const upload = multer({storage: storage})
// Get Single Post
const getPost = asyncHandler(async (req, res) => {
  try {
		const post = await Post.findOne({ _id: req.params.id })
   // res.contentType('image/jpeg').send(post.image);
		res.send({
      title:post.title,
      image: post.image, // placeholder for now
      category: post.category,
      content: post.content,
    })
	} catch {
		res.status(404)
		res.json({ error: "Post doesn't exist!" })
	}
});

//Get posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
  res.status(200).json(posts);
});

//Set Post
const setPost = asyncHandler(async (req, res) => {
  //console.log(req.body);
    if(!req.body.title || !req.body.content ){
          res.status(400)
          //res.send(req.body.title)
          throw new Error("Please add the required blog details") 
    }
   
    Post.findOne({ title: req.body.title }, async (err, data) => {

      //if post not in db, add it
      if (!data) {
          //create a new POST object using the POST model and req.body
          const post = await new Post({
              title:req.body.title,
              image: '/uploads/' + req.file.filename, // placeholder for now
              category: req.body.category,
              content: req.body.content,
          })

          // save this object to database
          post.save((err, data)=>{
              if(err) return res.json({Error: err});
              return res.status(201).json(data);
          })
      //if there's an error or the POST is in db, return a message         
      }else{
          if(err) return res.json({message:"Post already exists"});
      }
  })    
});
//Update Posts
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if(!post){
    res.status(404)
    return res.json({message:"Post already exists"});
    }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body,{
    new : true,
  })
  res.status(200).json(updatedPost);
});
//Delete single Post
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if(!post){
    res.status(400)
    return res.json({message:"Post not found"});
  }
  await post.remove()
  res.status(200).json({
    id: req.params.id
  });
});

//Delete All Posts
const deletePosts = asyncHandler(async (req, res) => {
  const post = await Post.find()
  if(!post){
    res.status(404).json({error : 'No posts are found'})
  }
    post.forEach(element => {
       element.remove()
    });
 // await user.deleteMany()
  res.status(200).json({
    post,
  });
});
          // ##  COMMENTS ###
// --- ADD POST COMMENT ---
const setComment = asyncHandler(async (req, res) => {
 
  if(!req.body.text){
    res.status(400) 
    throw new Error("Please add the required comment details") 
}
 
  const comment = await new Comment({
    post:req.params.id,
    user: req.user,
    text: req.body.text,
  })

   // save this comment to database
          comment.save((err, data)=>{
              if(err) return res.json({Error: err});
              return res.status(201).json(data);
          })
})

//Get comments
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
  res.status(200).json(comments);
});

// --- LIKES FUNCTIONALITY  ---
// --- Like POST  ---
const setLike = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user;
  //console.log(userId);
    const post = await Post.findById(postId);
  try {
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'User has already liked this post' });
    }
    post.likes.push(userId);
    await post.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }

  // const like = new Like({
  //   post:req.params.id,
  //   user: req.user,
  // })

  //  // save this like to database
  // like.save((err, data)=>{
  //   if(err) return res.json({Error: err});
  //   return res.status(201).json(data);
  // })
})

//Get comments
const getLikes = asyncHandler(async (req, res) => {
  const likes = await Like.find()
  res.status(200).json(likes);
});

module.exports = {
  getPosts,
  getPost,
  setPost,
  updatePost,
  deletePost,
  deletePosts,
  setComment,
  getComments,
  upload,
  getLikes,
  setLike,
};
