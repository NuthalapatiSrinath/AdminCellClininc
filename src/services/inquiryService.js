import apiClient from "../api/apiClient";

export const inquiryService = {
  createInquiry: async (data) => await apiClient.post("/inquiry/create", data),
  getAllInquiries: async () => await apiClient.get("/inquiry/all"),

  // --- New Methods ---
  updateInquiry: async (id, data) =>
    await apiClient.put(`/inquiry/${id}`, data),
  deleteInquiry: async (id) => await apiClient.delete(`/inquiry/${id}`),
  deleteAllInquiries: async () => await apiClient.delete("/inquiry/all"),
};
