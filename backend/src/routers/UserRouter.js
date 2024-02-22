const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const { hashPassword } = require("../middlewares/auth");

// Create a new user
router.post("/users/CreateUser", hashPassword, userController.createUser);

module.exports = router;
