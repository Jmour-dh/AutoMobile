const express = require("express");

const router = express.Router();
const contactController = require("../controllers/ContactController");
const { verifyToken } = require("../middlewares/auth");

// Routes that don't require token verification
router.post("/contacts", contactController.createContact);

router.get("/contacts/:id", verifyToken, contactController.getContactByID);
router.get("/contacts", verifyToken, contactController.getAllContacts);
router.put("/contacts/:id", verifyToken, contactController.updateContact);
router.delete("/contacts/:id", verifyToken, contactController.deleteContact);

module.exports = router;
