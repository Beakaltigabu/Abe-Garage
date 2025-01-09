
const mysql = require("mysql2/promise");
const { pool } = require("../config/db.config");
const bcrypt = require("bcrypt");

// A function to check if an employee exists in the database
async function checkIfEmployeeExists(employee_email) {
  const [rows] = await pool.query(
    `SELECT * FROM employee WHERE employee_email = ?`,
    [employee_email]
  );
  return rows.length > 0;
}

// Function to create a new employee


async function createEmployee(employeeData) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Hash password
    const hashedPassword = await hashPassword(employeeData.password);

    // Insert employee base record
    const [employeeResult] = await connection.query(
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)",
      [employeeData.email, true]
    );

    const employeeId = employeeResult.insertId;

    // Insert employee info
    await connection.query(
      `INSERT INTO employee_info
       (employee_id, employee_first_name, employee_last_name, employee_phone)
       VALUES (?, ?, ?, ?)`,
      [employeeId, employeeData.firstName, employeeData.lastName, employeeData.phone]
    );

    // Insert password
    await connection.query(
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)",
      [employeeId, hashedPassword]
    );

    // Insert role
    await connection.query(
      `INSERT INTO employee_role (employee_id, company_role_id)
       SELECT ?, company_role_id FROM company_roles WHERE company_role_name = ?`,
      [employeeId, employeeData.role]
    );

    await connection.commit();
    return { employeeId };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}


// Function to get an employee by employee_id
async function getEmployeeById(employee_id) {
  const query = `
    SELECT
      employee.employee_id,
      employee.employee_email,
      employee_info.employee_first_name,
      employee_info.employee_last_name,
      employee_info.employee_phone,
      company_roles.company_role_name,
      employee.active_employee
    FROM
      employee
    INNER JOIN
      employee_info ON employee.employee_id = employee_info.employee_id
    INNER JOIN
      employee_role ON employee.employee_id = employee_role.employee_id
    INNER JOIN
      company_roles ON employee_role.company_role_id = company_roles.company_role_id
    WHERE
      employee.employee_id = ?`;

  try {
    const [rows] = await pool.query(query, [employee_id]);
    console.log(rows);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error;
  }
}

// Function to get an employee by email
async function getEmployeeByEmail(employee_email) {
  const query = `
    SELECT
      e.employee_id,
      e.employee_email,
      e.active_employee,
      ei.employee_first_name,
      ei.employee_last_name,
      ep.employee_password_hashed,
      cr.company_role_name
    FROM employee e
    INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
    INNER JOIN employee_pass ep ON e.employee_id = ep.employee_id
    INNER JOIN employee_role er ON e.employee_id = er.employee_id
    INNER JOIN company_roles cr ON er.company_role_id = cr.company_role_id
    WHERE e.employee_email = ?`;

  try {
    const [rows] = await pool.query(query, [employee_email]);
    return rows;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
}






async function updateEmployee(employee_id, employeeData) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const updateEmployeeQuery = `
      UPDATE employee
      SET employee_email = ?, active_employee = ?
      WHERE employee_id = ?
    `;
    await connection.query(updateEmployeeQuery, [
      employeeData.employee_email,
      employeeData.active_employee,
      employee_id
    ]);

    const updateEmployeeInfoQuery = `
      UPDATE employee_info
      SET employee_first_name = ?, employee_last_name = ?, employee_phone = ?
      WHERE employee_id = ?
    `;
    await connection.query(updateEmployeeInfoQuery, [
      employeeData.employee_first_name,
      employeeData.employee_last_name,
      employeeData.employee_phone,
      employee_id
    ]);

    if (employeeData.employee_password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(employeeData.employee_password, salt);
      const updatePasswordQuery = `
        UPDATE employee_pass
        SET employee_password_hashed = ?
        WHERE employee_id = ?
      `;
      await connection.query(updatePasswordQuery, [hashedPassword, employee_id]);
    }

    const updateRoleQuery = `
      UPDATE employee_role
      SET company_role_id = (SELECT company_role_id FROM company_roles WHERE company_role_name = ?)
      WHERE employee_id = ?
    `;
    await connection.query(updateRoleQuery, [employeeData.company_role_name, employee_id]);

    await connection.commit();
    return { affectedRows: 1 };
  } catch (error) {
    await connection.rollback();
    console.error("Error updating employee:", error);
    throw error;
  } finally {
    connection.release();
  }
}




// In employee.service.js
const deleteEmployee = async (employee_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${apiUrl}/api/employees/${employee_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          cascade: true
        }
      }
    );
    return {
      success: true,
      data: response.data,
      message: "Employee and all related data successfully deleted"
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete employee"
    };
  }
};




// Function to get all employees
async function getAllEmployees() {
  const query = `
    SELECT
      e.employee_id,
      e.employee_email,
      e.active_employee,
      ei.employee_first_name,
      ei.employee_last_name,
      ei.employee_phone,
      cr.company_role_name
    FROM employee e
    JOIN employee_info ei ON e.employee_id = ei.employee_id
    JOIN employee_role er ON e.employee_id = er.employee_id
    JOIN company_roles cr ON er.company_role_id = cr.company_role_id
    ORDER BY e.employee_id DESC
  `;

  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
}

async function getActiveEmployees() {
  const query = `
    SELECT
      e.employee_id,
      e.employee_email,
      ei.employee_first_name,
      ei.employee_last_name,
      ei.employee_phone,
      cr.company_role_name
    FROM employee e
    JOIN employee_info ei ON e.employee_id = ei.employee_id
    JOIN employee_role er ON e.employee_id = er.employee_id
    JOIN company_roles cr ON er.company_role_id = cr.company_role_id
    WHERE e.active_employee = 1
    ORDER BY e.employee_id DESC
  `;

  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching active employees:", error);
    throw error;
  }
}

module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeById,
  getEmployeeByEmail,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getActiveEmployees
};
