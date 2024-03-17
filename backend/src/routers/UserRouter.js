const express = require("express");

const router = express.Router();
const userController = require("../controllers/UserController");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  experiedToken,
} = require("../middlewares/auth");

// Create a new user
router.post("/users/CreateUser", hashPassword, userController.createUser);

// Create a new Personal
router.post(
  "/users/CreatePersonal",
  hashPassword,
  userController.createPersonal
);

// Routes that don't require token verification
router.post("/verifyEmail", userController.verifyExistingEmail);
router.post("/verifyPhone", userController.verifyExistingPhone);
router.post("/login", userController.login, verifyPassword); // Login route

// Routes that require token verification
router.get("/users/:id", verifyToken, userController.getUserByID);
router.get("/users", verifyToken, userController.getAllUsers);
router.put("/users/:id", verifyToken, userController.updateUser);
router.delete("/users/:id", verifyToken, userController.deleteUser);
router.get("/logout", verifyToken, userController.logout, experiedToken);

module.exports = router;
