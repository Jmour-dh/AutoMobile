const express = require("express");

const router = express.Router();
const multer = require("multer");
const serviceController = require("../controllers/ServiceController");
const { verifyToken } = require("../middlewares/auth");

// Middleware to verify token for routes defined below
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./assets/upload");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.use(verifyToken);
// Create a new service
router.post(
  "/services",
  upload.single("ImageUrl"),
  serviceController.createService
);
router.get("/services/:id", serviceController.getServiceByID);
router.get("/services", serviceController.getAllServices);
router.put("/services/:id", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

module.exports = router;
