const express = require("express");

const router = express.Router();

const messageController = require("../controllers/MessageController");
const { verifyToken } = require("../middlewares/auth");

// Middleware to verify token for routes defined below
router.use(verifyToken);
router.post("/messages", messageController.createMessage);
router.get("/messages/:id", messageController.getMessageByID);
router.get("/messages", messageController.getAllMessages);
router.put("/messages/:id", messageController.updateMessage);
router.delete("/messages/:id", messageController.deleteMessage);

module.exports = router;
