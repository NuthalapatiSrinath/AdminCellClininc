import apiClient from "../api/apiClient";

export const catalogService = {
  getBrands: async () => {
    console.log("🚀 [Service] Requesting: GET /catalog/brands");
    try {
      const response = await apiClient.get("/catalog/brands");
      console.log("✅ [Service] Raw Response:", response);
      return response;
    } catch (error) {
      console.error("❌ [Service] Error:", error);
      throw error;
    }
  },

  // ... (keep other methods same, just focus on getBrands for now)
  createBrand: async (data) => await apiClient.post("/catalog/brand", data),
  createDevice: async (data) => await apiClient.post("/catalog/device", data),
  uploadCatalogExcel: async (formData) =>
    await apiClient.post("/catalog/upload", formData),
};
