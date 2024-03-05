const express = require("express");

const router = express.Router();

const motoController = require("../controllers/MotoController");
const upload = require("../middlewares/handleUpload");
const { verifyToken } = require("../middlewares/auth");

router.get("/motos/:id", motoController.getMotoByID);
router.get("/motos", motoController.getAllMotos);

// Create a new moto

router.post(
  "/motos",
  verifyToken,
  upload.array("images", 6),
  motoController.createMoto
);

router.put(
  "/motos/:id",
  verifyToken,
  upload.array("images", 6),
  motoController.updateMoto
);
router.delete("/motos/:id", verifyToken, motoController.deleteMoto);

module.exports = router;
