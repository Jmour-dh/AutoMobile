const express = require("express");

const router = express.Router();

const motoController = require("../controllers/MotoController");
const upload = require("../middlewares/handleUpload");
const { verifyToken } = require("../middlewares/auth");

// Middleware to verify token for routes defined below
router.use(verifyToken);

// Create a new moto

router.post("/motos", upload.array("images", 6), motoController.createMoto);
router.get("/motos/:id", motoController.getMotoByID);
router.get("/motos", motoController.getAllMotos);
router.put("/motos/:id", upload.array("images", 6), motoController.updateMoto);
router.delete("/motos/:id", motoController.deleteMoto);

module.exports = router;
