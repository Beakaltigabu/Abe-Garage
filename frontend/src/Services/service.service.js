
import api from '../utils/axios';

export const getServiceById = async (id) => {
  try {
    const response = await api.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service:', error);
    throw error;
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const deleteService = async (id, force = false) => {
  try {
    const response = await api.delete(`/services/${id}${force ? '?force=true' : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

export const addService = async (serviceData) => {
  try {
    const response = await api.post('/services', serviceData);
    return response.data;
  } catch (error) {
    console.error('Error adding service:', error);
    throw error;
  }
};



export const getActiveServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch (error) {
    console.error('Error fetching active services:', error);
    throw error;
  }
};


// Add this function to your existing service.service.js
export const getServicesCount = async () => {
  try {
    const response = await api.get('/services/count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching services count:', error);
    throw error;
  }
};
