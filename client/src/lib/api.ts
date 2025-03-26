import { ContactFormData } from "../types";
import { apiRequest } from "./queryClient";

// Adventure form data interface (mirrors schema in shared/schema.ts)
export interface AdventureFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  startDate?: string;
  endDate?: string;
  departureAirport: string;
  groupSize: number;
  selectedPackages: string[];
  selectedAccommodations: string[];
  selectedActivities: string[];
  additionalRequests?: string;
  preferredLanguage: string;
}

// API functions for the application
export const api = {
  // Submit contact form
  submitContactForm: async (formData: ContactFormData) => {
    const response = await apiRequest("POST", "/api/contact", formData);
    return response.json();
  },
  
  // Submit adventure package form
  submitAdventureForm: async (formData: AdventureFormData) => {
    const response = await apiRequest("POST", "/api/adventure", formData);
    return response.json();
  }
};
