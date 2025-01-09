import api from "../utils/axios";



const createVehicle = async (customer_id, formData) => {
  try {
    const response = await api.post(`/customers/${customer_id}/vehicles`, { ...formData, customer_id });
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createVehicle service:", error);
    throw error;
  }
};

const getVehicle = async (customer_id) => {
  try {
    const response = await api.get(`/customers/${customer_id}/vehicles`);
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.error("Error in getVehicle service:", error);
    console.error("Error response:", error.response);
    throw error;
  }
};


const getVehicleById = async (vehicleId) => {
  try {
    const response = await api.get(`/vehicles/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle by ID:', error);
    throw error;
  }
};
const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const response = await api.put(`/vehicle/${vehicleId}`, vehicleData);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // If the update was successful but returned 404, we still consider it a success
      return { success: true, data: null };
    }
    console.error('Error updating vehicle:', error);
    throw error;
  }
};




const deleteVehicle= async (vehicleId) => {
  try {
    const response = await api.delete(`/vehicles/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};

const VehicleService = {
  createVehicle,
  getVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};

export default VehicleService;
