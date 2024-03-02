const express = require("express");

const router = express.Router();

const serviceController = require("../controllers/ServiceController");
const upload = require("../middlewares/handleUpload");
const { verifyToken } = require("../middlewares/auth");

// Middleware to verify token for routes defined below

router.use(verifyToken);
// Create a new service
router.post(
  "/services",
  upload.single("ImageUrl"),
  serviceController.createService
);
router.get("/services/:id", serviceController.getServiceByID);
router.get("/services", serviceController.getAllServices);
router.put(
  "/services/:id",
  upload.single("ImageUrl"),
  serviceController.updateService
);
router.delete("/services/:id", serviceController.deleteService);

module.exports = router;
