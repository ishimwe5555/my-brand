const express = require("express");
const authenticate = require('../middleware/authenticate')

const router = express.Router();
const {
  getPosts,
  getPost,
  setPost,
  updatePost,
  deletePost,
  deletePosts,
  setComment,
  upload,
  getComments,
} = require("../controllers/postController");

router.route("/").get(getPosts).post(upload.single('image'), setPost).delete(deletePosts);
router.route("/:id").put(updatePost).delete(deletePost).get(getPost);
router.route("/:id/comments").get(authenticate,getComments).post(authenticate, setComment)

module.exports = router;
