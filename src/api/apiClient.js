import axios from "axios";

// Change this to your deployed URL later
const BASE_URL = "https://cell-clinic-hyderabad-backend-w9qt.vercel.app/api";
// const BASE_URL = "http://localhost:5000/api";

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

// --- Response Interceptor (Error Handling & File Download Fix) ---
apiClient.interceptors.response.use(
  (response) => {
    // FIX: If the request is for a file download (blob), return the full response.
    // This allows the frontend to read headers like "content-disposition" for the filename.
    if (response.config.responseType === "blob") {
      return response;
    }

    // Otherwise, return only the data (standard behavior)
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export default apiClient;
