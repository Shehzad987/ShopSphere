import axios from 'axios';

// Central Axios instance. Vite proxies "/api" to the Express server in dev.
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopsphere_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response handling — surface a consistent error shape
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    if (error.response?.status === 401) {
      localStorage.removeItem('shopsphere_token');
      localStorage.removeItem('shopsphere_user');
    }

    return Promise.reject({ ...error, message });
  }
);

export default api;
