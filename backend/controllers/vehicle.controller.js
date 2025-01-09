const {
  getOneVehicle,
  addVehicle,
  updateVehicle,
  getVehiclesByCustomerId,
  vehicleExists,
  getMileageHistory,
  getVehicleInfo,
  removeVehicle
} = require("../services/vehicle.service");

const getSingleVehicle = async (req, res) => {
    try {
        const vehicle = await getOneVehicle(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Server not responding" });
    }
};


async function createVehicle(req, res, next) {
  try {
    const { vehicle_tag, vehicle_serial } = req.body;
    const { customer_id } = req.params;

    console.log("Received vehicle data:", req.body);
    console.log("Customer ID:", customer_id);

    // Validate input data
    if (!vehicle_tag || !vehicle_serial || !customer_id) {
      return res.status(400).json({
        error: "Vehicle tag, serial number, and customer ID are required!",
      });
    }

    // Check if a vehicle with the given tag or serial number already exists
    const exists = await vehicleExists(vehicle_tag, vehicle_serial);

    if (exists) {
      return res.status(400).json({
        error: "This vehicle tag or serial number is already associated with another vehicle!",
      });
    }

    // Create the vehicle with the provided data
    const vehicleData = { ...req.body, customer_id };

    const vehicleAddedData = await addVehicle(vehicleData);
    if (!vehicleAddedData) {
      return res.status(400).json({
        error: "Failed to add the vehicle!",
      });
    }

    // Successful creation
    return res.status(201).json({
      status: "true",
      vehicleAddedData,
    });

  } catch (error) {
    console.error("Error in createVehicle:", error);
    return res.status(500).json({
      error: "Something went wrong!",
      details: error.message,
    });
  }
}


  const updateVehicleInfo = async (req, res) => {
    try {
        const updated = await updateVehicle(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ error: 'Vehicle not found or no changes made' });
        }
    } catch (error) {
        console.error('Error in updateVehicleInfo:', error);
        res.status(500).json({ message: "Server error while updating vehicle" });
    }
};


const getCustomerVehicles = async (req, res) => {
  try {
    const vehicles = await getVehiclesByCustomerId(req.params.customer_id);
    console.log("Fetched vehicles:", vehicles);
    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error in getCustomerVehicles:", error);
    res.status(500).json({ message: "Server not responding", error: error.message });
  }
};

const getVehicleMileageHistory = async (req, res) => {
    try {
        const history = await getMileageHistory(req.params.vehicle_id);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Server not responding" });
    }
};


async function getVehicleById(req, res) {
  const vehicle_id = req.params.vehicle_id;

  try {
    const vehicle = await getVehicleInfo(vehicle_id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json({ vehicle });
  } catch (error) {
    console.error('Error fetching vehicle by ID:', error);
    res.status(500).json({ error: "Failed to fetch vehicle" });
  }
}

const deleteVehicle = async (req, res) => {
  try {
    const result = await removeVehicle(req.params.vehicle_id);
    if (result) {
      res.status(200).json({ message: "Vehicle deleted successfully" });
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error) {
    console.error('Error in deleteVehicle:', error);
    res.status(500).json({ message: "Server error while deleting vehicle" });
  }
};


module.exports = {
    getSingleVehicle,
    createVehicle,
    updateVehicleInfo,
    getCustomerVehicles,
    getVehicleMileageHistory,
    getVehicleById,
    deleteVehicle
};
