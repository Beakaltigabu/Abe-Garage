/* This JavaScript code defines a module called `EmployeeService` that contains functions for
interacting with an API to perform CRUD operations on employee data. Here's a breakdown of what each
function does: */
import {axiosInstance} from "../../src/API/axios";
import axios from "axios"

const apiUrl = "http://localhost:2030";

const createEmployee = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post("/api/employee/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createEmployee service:", error);
    throw error;
  }
};

export const getAllEmployee = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllEmployee service:", error);
    throw error;
  }
};

const getSingleEmployee = async (employee_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/employees/${employee_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createCustomer service:", error);
    throw error;
  }
};

const editEmployee = async (employee_id, employeeData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${apiUrl}/api/employees/${employee_id}`,
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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



const deleteEmployee = async (employee_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${apiUrl}/api/employees/${employee_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete employee"
    };
  }
};





export const getActiveEmployees = async () => {
  try {
    const token = localStorage.getItem("token");
    // Update the endpoint to match your API route structure
    const response = await axios.get(`${apiUrl}/api/employees/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching active employees:", error.response || error);
    throw error;
  }
};


// Add this function to your existing employee.service.js
export const getEmployeesCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/employees/count`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching employees count:', error);
    throw error;
  }
};

const EmployeeService = {
  createEmployee,
  getAllEmployee,
  editEmployee,
  deleteEmployee,
  getSingleEmployee,
  getActiveEmployees,

};

export default EmployeeService;
