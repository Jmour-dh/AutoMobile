const express = require("express");

const router = express.Router();

const motoController = require("../controllers/MotoController");
const { verifyToken } = require("../middlewares/auth");

// Middleware to verify token for routes defined below
router.use(verifyToken);

// Create a new moto
router.post("/motos", motoController.createMoto);
router.get("/motos/:id", motoController.getMotoByID);
router.get("/motos", motoController.getAllMotos);
router.put("/motos/:id", motoController.updateMoto);
router.delete("/motos/:id", motoController.deleteMoto);

module.exports = router;
