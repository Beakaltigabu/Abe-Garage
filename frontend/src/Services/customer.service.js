import axios from "axios";

const apiUrl = "http://localhost:2030";

const createCustomer = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/customers/`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createCustomer service:", error);
    throw error;
  }
};

/* const getAllCustomer = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/customers`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createCustomer service:", error);
    throw error;
  }
}; */
const getAllCustomer = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/customers`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in getAllCustomer service:", error);
    throw error;
  }
};

const getSingleCustomer = async (customer_id) => {
  try {
    const response = await axios.get(`${apiUrl}/api/customers/${customer_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createCustomer service:", error);
    throw error;
  }
};

const editCustomer = async (customer_id, customerData) => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/customers/${customer_id}`,
      customerData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createCustomer service:", error);
    throw error;
  }
};

const deleteCustomer = async (customer_id) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/api/customers/${customer_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createCustomer service:", error);
    throw error;
  }
};

const getCustomerVehicles = async (customer_id) => {
  try {
    console.log('Calling getCustomerVehicles with customer_id:', customer_id);
    const response = await axios.get(`${apiUrl}/api/customers/${customer_id}/vehicles`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('getCustomerVehicles response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error in getCustomerVehicles service:", error);
    throw error;
  }
};

export const getCustomersCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/customers/count`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching customers count:', error);
    throw error;
  }
};

const customerService = {
  createCustomer,
  getAllCustomer,
  editCustomer,
  deleteCustomer,
  getSingleCustomer,
  getCustomerVehicles,
};

export default customerService;
