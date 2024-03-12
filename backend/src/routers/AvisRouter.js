const express = require("express");

const router = express.Router();
const avisController = require("../controllers/AvisController");
const { verifyToken } = require("../middlewares/auth");

// Middleware to verify token for routes defined below

router.post("/avis", avisController.createAvis);
router.get("/avis", avisController.getAllAvis);

router.get("/avis/:id", verifyToken, avisController.getAvisByID);
router.put("/avis/:id", verifyToken, avisController.updateAvis);
router.delete("/avis/:id", verifyToken, avisController.deleteAvis);

router.get("/avis/service/:serviceID", avisController.getAllAvisByServiceID);

module.exports = router;
