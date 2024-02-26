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
router.get("/verifyPhone", userController.verifyExistingPhone);
router.post("/login", userController.login, verifyPassword); // Login route

// Middleware to verify token for routes defined below
router.use(verifyToken);

// Routes that require token verification
router.get("/users/:id", userController.getUserByID);
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/logout", userController.logout, experiedToken);

module.exports = router;
