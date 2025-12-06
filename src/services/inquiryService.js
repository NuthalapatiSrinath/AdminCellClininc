import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const inquiryService = {
  // User sends booking request
  createInquiry: async (data) => {
    return await apiClient.post(API_ROUTES.INQUIRY.CREATE, data);
  },

  // Admin fetches all requests
  getAllInquiries: async () => {
    return await apiClient.get(API_ROUTES.INQUIRY.GET_ALL);
  },
};
