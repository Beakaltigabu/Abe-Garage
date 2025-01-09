const express = require("express");
const router = express.Router();
const {
  getAllService,
  fetchServices,
  fetchServiceById,
  createService,
  modifyService,
  removeService,
} = require("../controllers/service.controller");

// Route to get all services
router.get("/api/services", getAllService);

// Route to add a new service
router.post("/api/services", createService);

// Route to get a single service by ID
router.get("/api/services/:service_id", fetchServiceById);

// Route to update a service by ID
router.put("/api/services/:service_id", modifyService);

// Route to delete a service by ID
router.delete("/api/services/:service_id", removeService);

module.exports = router;
