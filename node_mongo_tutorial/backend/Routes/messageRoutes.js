/**
 * @swagger
 * components:
 *   schemas:
 *     send:
 *       type: object
 *       required:
 *         - names
 *         - email
 *         - message
 *       properties:
 *         names:
 *           type: string
 *           description: The name of client
 *         email:
 *           type: string
 *           description: The email of client
 *         content:
 *           type: string
 *           description: Message or query
 *       example:
 *         names: Norbert
 *         email: ishimwe@mail.com
 *         content: Hi how are you?
 *     sent:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: integer
 *           description: The http code of response
 *         content:
 *           type: string
 *           description: The message of response
 *         MessageSent:
 *           type: string
 *           description: The message which was sent
 *       example:
 *         code: 201
 *         message: Message Sent
 *         MessageSent: {}
 * 
 */
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages  api
 * /api/messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/send'
 *     responses:
 *       200:
 *         description: Message Sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/sent'
 * 
 */

const express = require("express");
const router = express.Router();
const {authenticate, authenticateUser }= require('../middleware/authenticate')
const {
  getMessages,
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
  deleteMessages,
} = require("../controllers/messageController");

router.route("/").get(authenticate, getMessages).post(setMessage).delete(authenticate,deleteMessages);
router.route("/:id").put(authenticate, updateMessage).delete(authenticate, deleteMessage).get(authenticate, getMessage);

module.exports = router;
