const express = require("express");

const router = express.Router();
const avisController = require("../controllers/AvisController");
const { verifyToken } = require("../middlewares/auth");

// Middleware to verify token for routes defined below
router.use(verifyToken);
router.post("/avis", avisController.createAvis);
router.get("/avis/:id", avisController.getAvisByID);
router.get("/avis", avisController.getAllAvis);
router.put("/avis/:id", avisController.updateAvis);
router.delete("/avis/:id", avisController.deleteAvis);

module.exports = router;
