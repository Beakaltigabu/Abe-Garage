import api from "../utils/axios";

export const getOrders = async (params) => {

  try {
    const token = localStorage.getItem("token");
    // console.log(token);
    const response = await api.get("/orders",  {params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getOrder = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return [response.data];
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const response = await api.put(`/orders/${id}`, {
      ...orderData,
      order_status: orderData.order_status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/orders", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete order",
    };
  }
};

export const getOrdersByCustomerId = async (customerId, options) => {
  try {
    const response = await api.get(`/orders/customer/${customerId}`, {
      params: options,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by customer ID:", error);
    throw error;
  }
};

export const getOrdersCount = async () => {
  try {
    const response = await api.get('/orders/count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching orders count:', error);
    throw error;
  }
};
