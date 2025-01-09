import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2030/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


instance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default instance;