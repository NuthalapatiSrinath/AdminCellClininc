import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const contactService = {
  submitContactForm: async (data) => {
    return await apiClient.post(API_ROUTES.CONTACT.SUBMIT, data);
  },
};
