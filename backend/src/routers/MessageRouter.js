const express = require("express");

const router = express.Router();

const messageController = require("../controllers/MessageController");
const { verifyToken } = require("../middlewares/auth");

router.post("/messages", messageController.createMessage);

router.get("/messages/:id", verifyToken, messageController.getMessageByID);
router.get("/messages", verifyToken, messageController.getAllMessages);
router.put("/messages/:id", verifyToken, messageController.updateMessage);
router.delete("/messages/:id", verifyToken, messageController.deleteMessage);

module.exports = router;
