const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getEmployeeByEmail } = require("../services/employee.service");

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

async function logIn(employee_email, password) {
  try {
    // Input validation
    if (!employee_email || !password) {
      throw new AuthenticationError("Email and password are required");
    }

    // Get employee with role and status
    const employees = await getEmployeeByEmail(employee_email);

    if (!employees || employees.length === 0) {
      throw new AuthenticationError("Invalid credentials");
    }

    const employee = employees[0];

    // Check if employee is active
    if (!employee.active_employee) {
      throw new AuthenticationError("Account is inactive");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      employee.employee_password_hashed
    );

    if (!isValidPassword) {
      throw new AuthenticationError("Invalid credentials");
    }

    // Generate JWT token
    const tokenPayload = {
      id: employee.employee_id,
      email: employee.employee_email,
      role: employee.company_role_name,
      firstName: employee.employee_first_name
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Return user data and token
    return {
      employee_id: employee.employee_id,
      employee_first_name: employee.employee_first_name,
      employee_email: employee.employee_email,
      role: employee.company_role_name,
      token
    };

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Password hashing utility
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

module.exports = {
  logIn,
  hashPassword
};
