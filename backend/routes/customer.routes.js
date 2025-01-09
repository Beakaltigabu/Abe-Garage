const express = require("express");
// Import the router module
const router = express.Router();
// Import the login controller
// Import the customer controller
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
  getCustomerVehicles

} = require("../controllers/customer.controller");

// Route to get all customers
router.get("/api/customers", getAllCustomers);

// Route to get a single customer by ID
router.get("/api/customers/:customer_id", getCustomerById);
// Route to delete a customer by ID
router.delete("/api/customers/:customer_id", deleteCustomerById);
// Route to add a new customer
router.post("/api/customers", createCustomer); // Notice no trailing slash here

// Route to update an existing customer by ID
router.put("/api/customers/:customer_id", updateCustomerById);

router.get("/api/customers/:customer_id/vehicles", getCustomerVehicles);





module.exports = router;
