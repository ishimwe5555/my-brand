/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of your blog
 *         category:
 *           type: string
 *           description: The blog category
 *         content:
 *           type: string
 *           description: The content the blog was added
 *       example:
 *         title: The New Turing Omnibus
 *         content: Alexander K. Dewdney
 *         category: false
 * 
 */


const express = require("express");
const {authenticate, authenticateUser }= require('../middleware/authenticate')

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
  getLikes,
  setLike,
} = require("../controllers/postController");

router.route("/").get(getPosts).post(upload.single('image'), setPost).delete(deletePosts);
router.route("/:id").put(authenticate, updatePost).delete(authenticate, deletePost).get(getPost);
router.route("/:id/comments").get(authenticate,getComments).post(authenticate, setComment)
router.route("/:id/likes").get(authenticate,getLikes).post(authenticate, setLike)

module.exports = router;
