import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const catalogService = {
  getBrands: async () => {
    return await apiClient.get(API_ROUTES.CATALOG.GET_BRANDS);
  },

  getDevices: async (brandId) => {
    return await apiClient.get(API_ROUTES.CATALOG.GET_DEVICES(brandId));
  },

  getServices: async (deviceId) => {
    return await apiClient.get(API_ROUTES.CATALOG.GET_SERVICES(deviceId));
  },

  // Admin Only: Seed Data
  seedDatabase: async (jsonData) => {
    return await apiClient.post(API_ROUTES.CATALOG.SEED, jsonData);
  },
};
