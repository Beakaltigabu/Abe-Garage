const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");

// Create a route to handle the add employee request on post
router.post(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.createEmployeeHandler
);

// Create a route to handle the get all employees request on get
router.get(
  "/api/employees",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployeesHandler
);

// Create a route to handle the get employee by id request on get
router.get(
  "/api/employees/:employee_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getEmployeeHandler
);

router.delete(
  "/api/employees/:employee_id",
  employeeController.deleteEmployeeHandler
);

// Create a route to handle the update employee by id request on put
router.put(
  "/api/employees/:employee_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.updateEmployeeHandler
);

router.get(
  "/api/employees/active",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getActiveEmployeesHandler
);


// Export the router
module.exports = router;
