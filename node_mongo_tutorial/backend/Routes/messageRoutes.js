const express = require("express");
const router = express.Router();
const {
  getMessages,
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
  deleteMessages,
} = require("../controllers/messageController");

router.route("/").get(getMessages).post(setMessage).delete(deleteMessages);
router.route("/:id").put(updateMessage).delete(deleteMessage).get(getMessage);

module.exports = router;
