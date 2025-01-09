const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { getSingleVehicle, createVehicle, updateVehicleInfo, getCustomerVehicles, getVehicleMileageHistory,getVehicleById,  deleteVehicle } = require('../controllers/vehicle.controller');

// Get Single Vehicle by ID
router.get("/api/vehicle/:customer_id", /* authMiddleware, */ getSingleVehicle);
// Add New Vehicle
router.post("/api/customers/:customer_id/vehicles", createVehicle);

 // Get Vehicles by Customer ID
router.get(
  "/api/customers/:customer_id/vehicles",
  getCustomerVehicles
);
 // Get vehicle mileage history
router.get("/api/vehicle/mileage/:vehicle_id", /* authMiddleware, */ getVehicleMileageHistory);

router.get('/api/vehicles/:vehicle_id', getVehicleById);

router.put("/api/vehicle/:id", /* authMiddleware, */ updateVehicleInfo);


router.delete("/api/vehicles/:vehicle_id", /* authMiddleware, */ deleteVehicle);

module.exports = router;
