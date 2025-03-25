import { ContactFormData } from "../types";
import { apiRequest } from "./queryClient";

// API functions for the application
export const api = {
  // Submit contact form
  submitContactForm: async (formData: ContactFormData) => {
    const response = await apiRequest("POST", "/api/contact", formData);
    return response.json();
  }
};
