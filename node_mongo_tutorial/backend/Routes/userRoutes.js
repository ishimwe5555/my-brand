/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
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
 *         password: norbert1234
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
 *         email: ishimwe@mail.com
 *         password: norbert1234
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
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users Fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response' 
 * 
 *   put:
 *     summary: Updates user details
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
 * /api/users/login:
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
 * /api/users/delete/{id}:
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
router.route("/login").post(authenticateUser)
//router.route("/:id/upload-profile-picture").post(upload.single('picture'),setProfilePicture);

module.exports = router;
