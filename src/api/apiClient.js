import axios from "axios";

// Change this to your deployed URL later
const BASE_URL = "http://localhost:4000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Request Interceptor (Adds Admin Token if logged in) ---
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // Storing token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor (Error Handling) ---
apiClient.interceptors.response.use(
  (response) => response.data, // Return only data, skip the wrapper
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export default apiClient;
