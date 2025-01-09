const mysql = require("mysql2/promise");
const { pool } = require("../config/db.config");
const crypto = require("crypto");

// Create a new customer
async function createCustomer({
  customer_email,
  customer_phone_number,
  customer_first_name,
  customer_last_name,
  active_customer_status,
}) {
  let createdCustomer = {};

  const connection = await pool.getConnection();

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Generate a unique customer hash
    const customerHash = crypto.randomBytes(16).toString("hex");

    // Insert into customer_identifier table with generated customer hash
    const [result1] = await connection.query(
      `INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_added_date, customer_hash)
       VALUES (?, ?, NOW(), ?)`,
      [customer_email, customer_phone_number, customerHash]
    );

    if (result1.affectedRows !== 1) {
      throw new Error("Failed to insert customer_identifier");
    }

    const customer_id = result1.insertId;

    // Insert into customer_info table
    const [result2] = await connection.query(
      `INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status)
       VALUES (?, ?, ?, ?)`,
      [
        customer_id,
        customer_first_name,
        customer_last_name,
        active_customer_status,
      ]
    );

    if (result2.affectedRows !== 1) {
      throw new Error("Failed to insert customer_info");
    }

    // Commit the transaction
    await connection.commit();

    createdCustomer = {
      customer_id,
      customer_email,
      customer_phone_number,
      customer_first_name,
      customer_last_name,
      customer_hash: customerHash,
      active_customer_status,
    };
  } catch (error) {
    // Rollback the transaction in case of error
    await connection.rollback();
    console.error("Error in createCustomer service:", error.message);
    throw error;
  } finally {
    // Release the connection back to the pool
    connection.release();
  }

  return createdCustomer;
}

// Get customer by ID
async function getCustomerById(customer_id) {
  const query = `
    SELECT ci.customer_id, ci.customer_email, ci.customer_phone_number,
           info.customer_first_name, info.customer_last_name, info.active_customer_status,
           DATE_FORMAT(ci.customer_added_date, '%Y-%m-%d %H:%i:%s') as customer_added_date
    FROM customer_identifier ci
    INNER JOIN customer_info info ON ci.customer_id = info.customer_id
    WHERE ci.customer_id = ?
  `;

  try {
    const [rows] = await pool.query(query, [customer_id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching customer by ID:", error.message);
    throw error;
  }
}

// Get all customers
async function getAllCustomers() {
  const query = `
    SELECT ci.customer_id, ci.customer_email, ci.customer_phone_number,
           info.customer_first_name, info.customer_last_name, info.active_customer_status,
           DATE_FORMAT(ci.customer_added_date, '%Y-%m-%d %H:%i:%s') as customer_added_date
    FROM customer_identifier ci
    INNER JOIN customer_info info ON ci.customer_id = info.customer_id
  `;

  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching all customers:", error.message);
    throw error;
  }
}

// Update customer by ID
async function updateCustomerById(customer_id, customerData) {
  const query = `
    UPDATE customer_identifier ci
    INNER JOIN customer_info info ON ci.customer_id = info.customer_id
    SET
      ci.customer_email = ?,
      ci.customer_phone_number = ?,
      info.customer_first_name = ?,
      info.customer_last_name = ?,
      info.active_customer_status = ?
    WHERE ci.customer_id = ?
  `;

  const {
    customer_email,
    customer_phone_number,
    customer_first_name,
    customer_last_name,
    active_customer_status,
  } = customerData;

  try {
    const [result] = await pool.query(query, [
      customer_email,
      customer_phone_number,
      customer_first_name,
      customer_last_name,
      active_customer_status,
      customer_id,
    ]);
    return result;
  } catch (error) {
    console.error("Error updating customer:", error.message);
    throw error;
  }
}

// Delete customer by ID
async function deleteCustomerById(customer_id) {
  const connection = await pool.getConnection();

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Delete from dependent tables first
    await connection.query(
      "DELETE FROM customer_vehicle_info WHERE customer_id = ?",
      [customer_id]
    );

    // Delete from customer_info table
    await connection.query("DELETE FROM customer_info WHERE customer_id = ?", [
      customer_id,
    ]);

    // Delete from customer_identifier table
    const [result] = await connection.query(
      "DELETE FROM customer_identifier WHERE customer_id = ?",
      [customer_id]
    );

    // Commit the transaction
    await connection.commit();

    return result.affectedRows > 0;
  } catch (error) {
    // Rollback the transaction in case of error
    await connection.rollback();
    console.error("Error deleting customer:", error.message);
    throw error;
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}


// Get customer by email
async function getCustomerByEmail(customer_email) {
  const query = `SELECT * FROM customer_identifier WHERE customer_email = ?`;

  try {
    const [rows] = await pool.query(query, [customer_email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching customer by email:", error.message);
    throw error;
  }
}


async function getCustomerVehicle(customer_id) {
  const query = `
    SELECT *
    FROM customer_vehicle_info
    WHERE customer_id = ?
  `;

  try {
    console.log('Executing query for customer_id:', customer_id);
    const [rows] = await pool.query(query, [customer_id]);
    console.log('Query result:', rows);
    return rows;
  } catch (error) {
    console.error("Error fetching customer vehicles:", error.message);
    throw error;
  }
}


module.exports = {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomerById,
  deleteCustomerById,
  getCustomerByEmail,
  getCustomerVehicle
};
