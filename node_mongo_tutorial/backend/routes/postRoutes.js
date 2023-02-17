/**
 * @swagger
 * components:
 *   schemas:
 *     create:
 *       type: object
 *       required:
 *         - title
 *         - blogImage
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: title of blog
 *         imageUrl:
 *           type: string
 *           description: imageUrl of blog
 *         content:
 *           type: string
 *           description: content of blog
 *       example:
 *         id: d5fE_asz
 *         title: How to code in 2022
 *         blogImage: www.image.com/image.jpg
 *         content: Hello world
 *     getblogs:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: The http code of response
 *         message:
 *           type: string
 *           description: Message of response
 *       example:
 *         code: 200
 *         message: Blogs Fetched
 *         Blogs: {}
 *     getblog:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: The http code of response
 *         message:
 *           type: string
 *           description: Message of response
 *       example:
 *         {
 *            "title": "post6",
 *           "image": null,
 *           "content": "my contentfggfgdfgd"
 *          }
 *     blognotfound:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: The http code of response
 *         message:
 *           type: string
 *           description: Message of response
 *       example:
 *         error: Blog doesn't exist
 */
/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blogs API
 * /api/posts:
 *   get:
 *     summary: Gets all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Blog Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getblogs'
 * /api/posts/{id}:
 *   get:
 *     summary: Gets a single blog
 *     parameters :
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description : object ID of user
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Single Blog Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getblog'
 *       404:
 *         description: Single Blog Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blognotfound'
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
