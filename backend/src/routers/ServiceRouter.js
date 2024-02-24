const express = require("express");

const router = express.Router();
const serviceController = require("../controllers/ServiceController");
const { verifyToken } = require("../middlewares/auth");

router.use(verifyToken);
// Create a new service
router.post("/services", serviceController.createService);
router.get("/services/:id", serviceController.getServiceByID);
router.get("/services", serviceController.getAllServices);
router.put("/services/:id", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

module.exports = router;
