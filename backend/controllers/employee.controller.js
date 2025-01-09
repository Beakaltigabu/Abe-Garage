const {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeById,
  getEmployeeByEmail, // Importing the getEmployeeByEmail function
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getActiveEmployees
} = require("../services/employee.service");

// Create employee function
async function createEmployeeHandler(req, res) {
  const {
    employee_email,
    employee_password,
    employee_first_name,
    employee_last_name,
    employee_phone,
    active_employee = 1, // Default to 1 if not provided
    company_role_name,
  } = req.body;

  // Backend validation
  if (
    !employee_email ||
    !employee_password ||
    !employee_first_name ||
    !employee_last_name ||
    !employee_phone ||
    !company_role_name
  ) {
    return res.status(400).json({
      error: "All fields are required!",
    });
  }

  if (employee_password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long.",
    });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(employee_email)) {
    return res.status(400).json({
      error: "Please enter a valid email address.",
    });
  }

  const employeeExists = await checkIfEmployeeExists(employee_email);
  console.log("Employee Exists:", employeeExists); // Log to check the result
  if (employeeExists) {
    return res.status(400).json({
      error: "User with this email already exists!",
    });
  }

  // Create the new employee
  try {
    const newEmployee = await createEmployee({
      employee_email,
      employee_password,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_name,
    });

    if (newEmployee) {
      return res.status(201).json({
        success: true,
        message: "Employee created successfully",
        employee: newEmployee,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to create the employee. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create the employee. Please try again.",
    });
  }
}
// Get employee by employee_id
async function getEmployeeHandler(req, res) {
  const { employee_id } = req.params;
  // console.log("Amber", employee_id);
  const employee = await getEmployeeById(employee_id);
  // console.log(employee);
  if (!employee) {
    return res.status(404).json({
      error: "No Employee found with this employee_id!",
    });
  }

  res.status(200).json({
    status: "true",
    message: "Employee found",
    employee: employee,
  });
}

// Get employee by employee_email
async function getEmployeeByEmailHandler(req, res) {
  const { employee_email } = req.params;

  try {
    const employee = await getEmployeeByEmail(employee_email);
    // console.log(employee);
    if (!employee) {
      return res
        .status(404)
        .json({ message: "No employee found with this email." });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error.message);
    res.status(500).json({ message: "Error fetching employee." });
  }
}





async function updateEmployeeHandler(req, res) {
  const { employee_id } = req.params;
  const {
    employee_email,
    employee_password,
    employee_first_name,
    employee_last_name,
    employee_phone,
    company_role_name,
    active_employee,
  } = req.body;

  if (
    !employee_email ||
    !employee_first_name ||
    !employee_last_name ||
    !employee_phone ||
    !company_role_name
  ) {
    return res.status(400).json({
      error: "All fields except password are required!",
    });
  }

  if (employee_password && employee_password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters.",
    });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(employee_email)) {
    return res.status(400).json({
      error: "Please enter a valid email address.",
    });
  }

  try {
    const result = await updateEmployee(employee_id, {
      employee_email,
      employee_password,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_name,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      status: "success",
      message: `${employee_first_name}'s information updated successfully`,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
}



// Delete employee
async function deleteEmployeeHandler(req, res) {
  const { employee_id } = req.params;

  try {
    const result = await deleteEmployee(employee_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      status: "success",
      message: `Employee with ID ${employee_id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: `Failed to delete this employee ` });
  }
}

// Get all employees
async function getAllEmployeesHandler(req, res) {
  try {
    const employees = await getAllEmployees();
    const employeesArray = Array.isArray(employees) ? employees : [employees];

    if (employeesArray.length === 0) {
      return res.status(404).json({
        error: "No employees found!",
      });
    }

    res.status(200).json({
      status: "true",
      employees: employeesArray,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      status: "fail",
      message: "Server error!",
    });
  }
}


const getActiveEmployeesHandler = async (req, res) => {
  try {
    const activeEmployees = await getActiveEmployees();
    res.status(200).json({ employees: activeEmployees });
  } catch (error) {
    console.error("Error in getActiveEmployees controller:", error);
    res.status(500).json({ error: "Failed to fetch active employees" });
  }
};


module.exports = {
  createEmployeeHandler,
  getEmployeeHandler,
  getEmployeeByEmailHandler,
  updateEmployeeHandler,
  deleteEmployeeHandler,
  getAllEmployeesHandler,
  getActiveEmployeesHandler
};
