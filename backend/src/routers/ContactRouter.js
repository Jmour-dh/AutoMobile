const express = require("express");

const router = express.Router();
const contactController = require("../controllers/ContactController");
const { verifyToken } = require("../middlewares/auth");

// Routes that don't require token verification
router.post("/contacts", contactController.createContact);

// Middleware to verify token for routes defined below
router.use(verifyToken);
router.get("/contacts/:id", contactController.getContactByID);
router.get("/contacts", contactController.getAllContacts);
router.put("/contacts/:id", contactController.updateContact);
router.delete("/contacts/:id", contactController.deleteContact);

module.exports = router;
