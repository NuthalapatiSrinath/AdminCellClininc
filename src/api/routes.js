export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    CREATE_ADMIN: "/auth/create-admin",
  },
  CATALOG: {
    GET_BRANDS: "/catalog/brands",
    GET_DEVICES: (brandId) => `/catalog/devices/${brandId}`,
    GET_SERVICES: (deviceId) => `/catalog/services/${deviceId}`,
    SEED: "/catalog/seed", // Admin Only
  },
  INQUIRY: {
    CREATE: "/inquiry/create", // Public User Booking
    GET_ALL: "/inquiry/all", // Admin Dashboard
  },
  CONTACT: {
    SUBMIT: "/contact/submit",
  },
};
