// Base URL
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
});

export { apiClient };
