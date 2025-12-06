import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const authService = {
  login: async (email, password) => {
    const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, {
      email,
      password,
    });
    if (response.success && response.token) {
      localStorage.setItem("adminToken", response.token); // Save token
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem("adminToken");
  },
};
