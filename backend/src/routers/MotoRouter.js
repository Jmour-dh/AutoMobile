const express = require("express");

const router = express.Router();

const motoController = require("../controllers/MotoController");
const upload = require("../middlewares/handleUpload");
const { verifyToken } = require("../middlewares/auth");

// Middleware to verify token for routes defined below
router.use(verifyToken);

// Create a new moto
console.log("upload image", upload.array("ImageUrl", 6).length);
router.post("/motos", upload.array("ImageUrl", 6), motoController.createMoto);
router.get("/motos/:id", motoController.getMotoByID);
router.get("/motos", motoController.getAllMotos);
router.put("/motos/:id", motoController.updateMoto);
router.delete("/motos/:id", motoController.deleteMoto);

module.exports = router;
