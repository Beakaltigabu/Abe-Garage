
const conn = require("../config/db.config");



const addVehicle = async (vehicleData) => {
  let addedVehicle = {};
  try {
    // Check if all required fields are provided
    if (
      !vehicleData.customer_id ||
      !vehicleData.vehicle_year ||
      !vehicleData.vehicle_make ||
      !vehicleData.vehicle_model ||
      !vehicleData.vehicle_type ||
      !vehicleData.vehicle_serial
    ) {
      throw new Error("All required fields must be provided.");
    }

    console.log("Inserting vehicle data:", vehicleData);

    // Insert the new vehicle into the database
    const query = `
      INSERT INTO customer_vehicle_info
      (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await conn.query(query, [
      vehicleData.customer_id,
      vehicleData.vehicle_year,
      vehicleData.vehicle_make,
      vehicleData.vehicle_model,
      vehicleData.vehicle_type,
      vehicleData.vehicle_mileage,
      vehicleData.vehicle_tag,
      vehicleData.vehicle_serial,
      vehicleData.vehicle_color,
    ]);

    console.log("Database insertion result:", result);

    if (result.affectedRows === 1) {
      addedVehicle = {
        vehicle_id: result.insertId,
        ...vehicleData,
      };
    } else {
      throw new Error("Failed to insert vehicle into customer_vehicle_info");
    }
  } catch (err) {
    console.error("Failed to add vehicle:", err.message, err.stack);
    throw err;
  }
  return addedVehicle;
};

const getVehiclesByCustomerId = async (customer_id) => {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM customer_vehicle_info WHERE customer_id = ?",
      [customer_id]
    );
    console.log("Database query result:", rows);

    return rows;
  } catch (error) {
    console.error("Error fetching vehicles:", error.message);
    throw new Error("Error fetching vehicles: " + error.message);
  }
};


const vehicleExists = async (vehicle_tag, vehicle_serial) => {
  const [rows] = await conn.query(
    `SELECT vehicle_id FROM customer_vehicle_info WHERE vehicle_tag = ? OR vehicle_serial = ?`,
    [vehicle_tag, vehicle_serial]
  );
  console.log("Vehicle exists check result:", rows);
  return rows.length > 0;
};

async function getVehicleInfo(vehicle_id) {
  const query = `
    SELECT *
    FROM customer_vehicle_info
    WHERE vehicle_id = ?
  `;

  try {
    const [rows] = await conn.query(query, [vehicle_id]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    throw error;
  }
}

const updateVehicle = async (id, vehicleData) => {
  try {
    const result = await conn.query(
      `UPDATE customer_vehicle_info SET
       vehicle_year = ?,
       vehicle_make = ?,
       vehicle_model = ?,
       vehicle_type = ?,
       vehicle_mileage = ?,
       vehicle_tag = ?,
       vehicle_serial = ?,
       vehicle_color = ?
       WHERE vehicle_id = ?`,
      [
        vehicleData.vehicle_year,
        vehicleData.vehicle_make,
        vehicleData.vehicle_model,
        vehicleData.vehicle_type,
        vehicleData.vehicle_mileage,
        vehicleData.vehicle_tag,
        vehicleData.vehicle_serial,
        vehicleData.vehicle_color,
        id
      ]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};


const removeVehicle = async (vehicle_id) => {
  try {
    const [result] = await conn.query('DELETE FROM customer_vehicle_info WHERE vehicle_id = ?', [vehicle_id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error removing vehicle:', error);
    throw error;
  }
};


module.exports = {
  addVehicle,
  getVehiclesByCustomerId,
  vehicleExists,
  getVehicleInfo,
  updateVehicle,
  removeVehicle
};
