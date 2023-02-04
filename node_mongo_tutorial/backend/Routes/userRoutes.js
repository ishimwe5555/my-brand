const express = require("express");
const router = express.Router();
const multer = require('multer');
const authenticate = require('../middleware/authenticate')
const {
  getUsers,
  getUser,
  setUser,
  updateUser,
  deleteUser,
  deleteUsers,
  authenticateUser,
  setProfilePicture,
} = require("../controllers/userController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/").get(authenticate, getUsers).post(setUser).delete(authenticate, deleteUsers);
router.route("/:id").put(authenticate, updateUser).delete(authenticate, deleteUser).get(authenticate, getUser);
router.route("/authenticate").post(authenticateUser)
router.route("/:id/upload-profile-picture").post(upload.single('picture'),setProfilePicture);

module.exports = router;
