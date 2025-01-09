const { query } = require("../config/db.config");

async function getServices(page, limit, searchQuery = "") {
  const offset = (page - 1) * limit;
  const searchCondition = searchQuery
    ? `WHERE service_name LIKE ? OR service_description LIKE ?`
    : "";
  const query = `
    SELECT * FROM common_services
    ${searchCondition}
    ORDER BY service_name ASC
    LIMIT ? OFFSET ?
  `;

  const searchParams = searchQuery
    ? [`%${searchQuery}%`, `%${searchQuery}%`]
    : [];
  const rows = await query(query, [...searchParams, limit, offset]);

  const countQuery = `
    SELECT COUNT(*) as total FROM common_services
    ${searchCondition}
  `;
  const [countResult] = await query(countQuery, searchParams);
  const total = countResult[0].total;

  return { services: rows[0], total };
}

async function getServiceById(service_id) {
  const sql = "SELECT * FROM common_services WHERE service_id = ?";
  const [rows] = await query(sql, [service_id]);
  if (rows.length === 0) {
    throw new Error("Service not found.");
  }
  return rows[0];
}

async function addService(service_name, service_description) {
  const sql = `
    INSERT INTO common_services (service_name, service_description)
    VALUES (?, ?)
  `;
  const [result] = await query(sql, [service_name, service_description]);
  return result;
}

async function updateService(service_id, service_name, service_description) {
  const sql = `
    UPDATE common_services
    SET service_name = ?, service_description = ?
    WHERE service_id = ?
  `;
  const [result] = await query(sql, [
    service_name,
    service_description,
    service_id,
  ]);
  if (result.affectedRows === 0) {
    throw new Error("Service not found.");
  }
  return result;
}

async function deleteService(service_id) {
  const checkQuery = "SELECT COUNT(*) as count FROM order_services JOIN orders ON order_services.order_id = orders.order_id WHERE order_services.service_id = ? AND orders.active_order = 1";
  const [checkResult] = await query(checkQuery, [service_id]);

  if (checkResult[0].count > 0) {
    return { hasActiveReferences: true, count: checkResult[0].count };
  }

  const deleteQuery = "DELETE FROM common_services WHERE service_id = ?";
  const [result] = await query(deleteQuery, [service_id]);

  if (result.affectedRows === 0) {
    throw new Error("Service not found.");
  }

  return { hasActiveReferences: false, deletedCount: result.affectedRows };
}



async function getAllServices() {
  try {
    const [rows] = await query("SELECT * FROM common_services");
    return rows;
  } catch (error) {
    console.error("Error fetching services:", error.message);
    throw new Error("Failed to fetch services");
  }
}


module.exports = {
  getAllServices,
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
};
