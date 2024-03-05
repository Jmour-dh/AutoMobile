const express = require("express");

const router = express.Router();

const serviceController = require("../controllers/ServiceController");
const upload = require("../middlewares/handleUpload");
const { verifyToken } = require("../middlewares/auth");

// Routes that don't require token verification
router.get("/services/:id", serviceController.getServiceByID);
router.get("/services", serviceController.getAllServices);

// Create a new service
router.post(
  "/services",
  verifyToken,
  upload.single("ImageUrl"),
  serviceController.createService
);

router.put(
  "/services/:id",
  verifyToken,
  upload.single("ImageUrl"),
  serviceController.updateService
);
router.delete("/services/:id", verifyToken, serviceController.deleteService);

module.exports = router;
