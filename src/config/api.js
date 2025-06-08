import axios from "axios";

export const API_BASE_URL = "https://project-tracker-backend-6hnh.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for CORS with cookies/auth
});

api.defaults.headers.post["Content-Type"] = "application/json";

// Interceptor to set Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
