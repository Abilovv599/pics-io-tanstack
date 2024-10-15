import axios from 'axios';

// Base URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Helper to add Authorization header if token exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiClient };
