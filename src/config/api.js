import axios from "axios";

export const API_BASE_URL = "https://project-tracker-backend-6hnh.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // IMPORTANT: allows sending cookies/credentials
});

api.defaults.headers.post["Content-Type"] = "application/json";

// Interceptor to attach JWT token in Authorization header
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
