/**
 * @swagger
 * components:
 *   schemas:
 *     signup:
 *       type: object
 *       required:
 *         - names
 *         - username
 *         - email
 *         - password
 *       properties:
 *         names:
 *           type: string
 *           description: Names of user
 *         username:
 *           type: string
 *           description: Username of user
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: Encrypted password of user
 *       example:
 *         names: Norbert Ishimwe
 *         username: ishimwe
 *         email: ishimwe@mail.com
 *         password: Qwerty12345
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: Encrypted password of user
 *       example:
 *         email: admin105@mail.com
 *         password: Qwert12345
 *     response:
 *       type: object
 *       required:
 *          -code
 *       properties:
 *         code:
 *           type: integer
 *           description: The http response code
 *         message:
 *           type: string
 *           description: message of the response
 *         data:
 *           type: string
 *           description: data responded
 *       example:
 *         {
 *            "names":"ishimwe",
 *            "username":"ishimweshhjw",
 *            "password":"$2b$10$ABCgnGZWFZ2MOl/ab89YXOhop8kglQQzdzytY.Pw22aqSd23qN4TO",       
 *            "email":"test@mmfail.com",
 *            "role":"user",
 *            "_id":"63eb52b603a887a3e13d5c9d",
 *            "__v":0
 *        }
 *          
 *     errormessage:
 *       type: object
 *       required:
 *          -code
 *       properties: 
 *         code:
 *           type: integer
 *           description: The http response code
 *         message:
 *           type: string
 *           description: message of error response
 *       example:
 *         code: 409
 *         message: User Already Exists
 *     editusername:
 *       type: object
 *       required:
 *          -code
 *       properties: 
 *         username:
 *           type: string
 *           description: The New Username
 *       example:
 *         username: ishimweupdated
 *     editusernameresponse:
 *       type: object
 *       required:
 *          -username
 *       properties: 
 *         code:
 *           type: integer
 *           description: The http response code
 *         message:
 *           type: string
 *           description: message of the response
 *         data:
 *           type: string
 *           description: data responded
 *       example:
 *         {"names":"ishimwe","username":"ishimweshhjw","password":"$2b$10$ABCgnGZWFZ2MOl/ab89YXOhop8kglQQzdzytY.Pw22aqSd23qN4TO","email":"test@mmfail.com","role":"user","_id":"63eb52b603a887a3e13d5c9d","__v":0}
 *     editprofilepic:
 *       type: object
 *       required:
 *          -profilepic
 *       properties: 
 *         profilepic:
 *           type: string
 *           description: The New profilepicture
 *       example:
 *         profilepic: uploaded pic
 *     changepassword:
 *       type: object
 *       required:
 *          -password
 *       properties: 
 *         password:
 *           type: string
 *           description: The New Password
 *       example:
 *         password: newpassword
 * 
 * 
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users  api
 * /api/users:
 *   post:
 *     summary: Create a new user(signUp)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signup'
 *     responses:
 *       201:
 *         description: Account Created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       409:
 *         description: User Already Exists
 *         content: 
 *           application/json:
 *             schema:
 *               $$ref: '#/components/schemas/errormessage'
 * 
 * /users/login:
 *   post:
 *     summary: Login as a normal user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Logged In.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errormessage'
 * 
 * /users:
 *   get:
 *     summary: get all Users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Users Fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 * /users/edit/username:
 *   put:
 *     summary: Update Username
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/editusername'
 *     responses:
 *       200:
 *         description: Username Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/editusernameresponse'
 *       406:
 *         description: Username is invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 * /users/edit/profilepic:
 *   put:
 *     summary: Update profile picture
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/editprofilepic'
 *     responses:
 *       200:
 *         description: Profile Picture Updated 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/editusernameresponse'
 *       400:
 *         description: profile pic is invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errormessage'
 * /users/edit/password:
 *   put:
 *     summary: Change password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changepassword'
 *     responses:
 *       200:
 *         description: Password Changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       406:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errormessage'
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       404:
 *         description: User to delete Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errormessage'
 *
 */

const express = require("express");
const router = express.Router();
const multer = require('multer');
const {authenticate, authenticateUser }= require('../middleware/authenticate')
const {
  getUsers,
  getUser,
  setUser,
  updateUser,
  deleteUser,
  deleteUsers,
} = require("../controllers/userController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/").get(authenticate, getUsers).post(setUser).delete(authenticate, deleteUsers);
router.route("/:id").put(authenticate, updateUser).delete(authenticate, deleteUser).get(authenticate, getUser);
router.route("/authenticate").post(authenticateUser)
//router.route("/:id/upload-profile-picture").post(upload.single('picture'),setProfilePicture);

module.exports = router;
