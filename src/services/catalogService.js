import apiClient from "../api/apiClient";

const multipartConfig = { headers: { "Content-Type": "multipart/form-data" } };

export const catalogService = {
  // --- READ ---
  getBrands: async () => await apiClient.get("/catalog/brands"),
  getDevices: async (brandId) =>
    await apiClient.get(`/catalog/devices/${brandId}`),
  getServices: async (deviceId) =>
    await apiClient.get(`/catalog/services/${deviceId}`),

  // --- BRAND WRITE ---
  createBrand: async (formData) =>
    await apiClient.post("/catalog/brand", formData, multipartConfig),
  updateBrand: async (id, formData) =>
    await apiClient.put(`/catalog/brand/${id}`, formData, multipartConfig),
  deleteBrand: async (id) => await apiClient.delete(`/catalog/brand/${id}`),

  // --- DEVICE WRITE ---
  createDevice: async (formData) =>
    await apiClient.post("/catalog/device", formData, multipartConfig),
  updateDevice: async (id, formData) =>
    await apiClient.put(`/catalog/device/${id}`, formData, multipartConfig),
  deleteDevice: async (id) => await apiClient.delete(`/catalog/device/${id}`),

  // --- SERVICE WRITE ---
  createService: async (data) => await apiClient.post("/catalog/service", data),
  updateService: async (id, data) =>
    await apiClient.put(`/catalog/service/${id}`, data),
  deleteService: async (id) => await apiClient.delete(`/catalog/service/${id}`), // Ensure this exists for ManageModal

  // --- EXCEL ---
  uploadCatalogExcel: async (formData) =>
    await apiClient.post("/catalog/upload", formData, multipartConfig),
  uploadBrandExcel: async (brandId, formData) =>
    await apiClient.post(
      `/catalog/brand/${brandId}/upload`,
      formData,
      multipartConfig
    ),
};
