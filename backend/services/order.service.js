const { query } = require("../config/db.config");


const getOrders = async (queryParams) => {
  const limit = parseInt(queryParams.limit) || 10;
  const page = parseInt(queryParams.page) || 1;
  const sortby = queryParams.sortby || 'o.order_date DESC';
  const completed = queryParams.completed !== undefined ? parseInt(queryParams.completed) : null;

  const offset = (page - 1) * limit;

  let querySql = `
    SELECT SQL_CALC_FOUND_ROWS
      o.*, oi.*, c.*, ci.*, v.*, e.*, os.*,
      ae.employee_first_name as assigned_employee_first_name,
      ae.employee_last_name as assigned_employee_last_name,
      ae.employee_id as assigned_employee_id
    FROM orders o
    JOIN order_info oi ON o.order_id = oi.order_id
    JOIN customer_info c ON o.customer_id = c.customer_id
    JOIN customer_identifier ci ON o.customer_id = ci.customer_id
    JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
    JOIN employee_info e ON o.employee_id = e.employee_id
    LEFT JOIN order_status os ON o.order_id = os.order_id
    LEFT JOIN employee_info ae ON o.assigned_employee_id = ae.employee_id
  `;

  const queryValues = [];

  if (completed !== null) {
    querySql += " WHERE o.active_order = ?";
    queryValues.push(completed);
  }

  querySql += ` ORDER BY ${sortby} LIMIT ? OFFSET ?`;
  queryValues.push(limit, offset);

  try {
    const [rows] = await query(querySql, queryValues);
    const [[{ total }]] = await query('SELECT FOUND_ROWS() as total');

    return { orders: rows, total };
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};






const getOrder = async (id) => {
  const orderQuery = `
  SELECT o.*, oi.*, c.*, ci.*, v.*, e.*,
         o.assigned_employee_id,
         o.last_updated,
         ae.employee_first_name as assigned_employee_first_name,
         ae.employee_last_name as assigned_employee_last_name
  FROM orders o
  JOIN order_info oi ON o.order_id = oi.order_id
  JOIN customer_info c ON o.customer_id = c.customer_id
  JOIN customer_identifier ci ON o.customer_id = ci.customer_id
  JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
  JOIN employee_info e ON o.employee_id = e.employee_id
  LEFT JOIN employee_info ae ON o.assigned_employee_id = ae.employee_id
  WHERE o.order_id = ?
`;

  const servicesQuery = `
    SELECT ors.*, cs.service_name, cs.service_description
    FROM order_services ors
    JOIN common_services cs ON ors.service_id = cs.service_id
    WHERE ors.order_id = ? AND ors.service_completed = 0
  `;

  const [orderRows] = await query(orderQuery, [id]);
  const [servicesRows] = await query(servicesQuery, [id]);

  if (orderRows.length === 0) {
    return null;
  }

  const order = orderRows[0];
  order.services = servicesRows;

  return order;
};



const addOrder = async (orderData) => {
  const {
    employee_id,
    customer_id,
    vehicle_id,
    order_description,
    estimated_completion_date,
    order_services,
    order_total_price,
    additional_request,
    notes_for_internal_use,
    notes_for_customer,
    order_status
  } = orderData;

  const employeeId = employee_id ? parseInt(employee_id) : null;
  const customerId = customer_id ? parseInt(customer_id) : null;
  const vehicleId = vehicle_id ? parseInt(vehicle_id) : null;
  const estimatedCompletionDate = estimated_completion_date ? new Date(estimated_completion_date) : null;
  const totalPrice = order_total_price ? parseFloat(order_total_price) : null;

  console.log('Processed order data:', {
    employeeId,
    customerId,
    vehicleId,
    order_description,
    estimatedCompletionDate,
    totalPrice,
    additional_request,
    notes_for_internal_use,
    notes_for_customer,
    order_status
  });

  try {
    const orderResult = await query(
      "INSERT INTO orders (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash) VALUES (?, ?, ?, ?, ?, ?)",
      [
        employeeId,
        customerId,
        vehicleId,
        new Date(),
        1,
        'some_hash_value'
      ]
    );

    const order_id = orderResult[0].insertId;

    if (!order_id) {
      throw new Error('Failed to obtain order_id after insertion');
    }

    console.log('Inserted order_id:', order_id);

    await query(
      `INSERT INTO order_info (
        order_id,
        order_description,
        estimated_completion_date,
        order_total_price,
        additional_request,
        notes_for_internal_use,
        notes_for_customer
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        order_id,
        order_description || null,
        estimatedCompletionDate,
        totalPrice,
        additional_request || null,
        notes_for_internal_use || null,
        notes_for_customer || null
      ]
    );

    if (Array.isArray(order_services) && order_services.length > 0) {
      const serviceValues = order_services.map(service => [
        order_id,
        service.service_id ? parseInt(service.service_id) : null,
        service.service_completed ? parseInt(service.service_completed) : 0
      ]).filter(service => service[1] !== null);

      if (serviceValues.length > 0) {
        const placeholders = serviceValues.map(() => '(?, ?, ?)').join(', ');
        await query(
          `INSERT INTO order_services (order_id, service_id, service_completed) VALUES ${placeholders}`,
          serviceValues.flat()
        );
      }
    }

    await query(
      "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)",
      [order_id, order_status || 'received']
    );

    return { success: true, order_id };
  } catch (error) {
    console.error('Error in addOrder service:', error);
    console.error('SQL Error:', error.sql);
    console.error('SQL Parameters:', error.parameters);
    throw new Error(`Failed to add order: ${error.message}`);
  }
};




const modifyOrder = async (id, orderData) => {
  const {
    assigned_employee_id,
    order_description,
    estimated_completion_date,
    completion_date,
    order_completed,
    order_services,
    order_total_price,
    additional_request,
    notes_for_internal_use,
    notes_for_customer,
    additional_requests_completed,
    order_status,
  } = orderData;

  // Update orders table with assigned employee
  await query(
    "UPDATE orders SET assigned_employee_id = ?, last_updated = CURRENT_TIMESTAMP WHERE order_id = ?",
    [assigned_employee_id, id]
  );
}


const removeOrder = async (id) => {
  try {
    const orderExists = await query("SELECT 1 FROM orders WHERE order_id = ?", [id]);
    if (orderExists.length === 0) {
      return { success: false, message: "Order not found" };
    }

    await query("DELETE FROM order_services WHERE order_id = ?", [id]);
    await query("DELETE FROM order_status WHERE order_id = ?", [id]);
    await query("DELETE FROM order_info WHERE order_id = ?", [id]);
    const result = await query("DELETE FROM orders WHERE order_id = ?", [id]);

    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


const getCustomerOrder = async (customer_id, options) => {
  const { page, limit, sortby } = options;
  const offset = (page - 1) * limit;

  const sqlQuerys = `
    SELECT o.*, oi.*, os.*
    FROM orders o
    JOIN order_info oi ON o.order_id = oi.order_id
    LEFT JOIN order_status os ON o.order_id = os.order_id
    WHERE o.customer_id = ?
    ORDER BY ${sortby}
    LIMIT ? OFFSET ?
  `;

  const [rows] = await query(sqlQuerys, [customer_id, parseInt(limit), offset]);
  const [[{ total }]] = await query('SELECT FOUND_ROWS() as total');

  return { orders: rows, total };
};


module.exports = {
  getOrders,
  getOrder,
  addOrder,
  modifyOrder,
  removeOrder,
  getCustomerOrder
};
