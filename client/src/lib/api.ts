import { ContactFormData } from "../types/index";
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
    try {
      const response = await apiRequest('POST', '/api/contact', formData);
      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
  
  // Submit adventure package form
  submitAdventureForm: async (formData: AdventureFormData) => {
    try {
      const response = await apiRequest('POST', '/api/adventure', formData);
      return await response.json();
    } catch (error) {
      console.error('Error submitting adventure form:', error);
      throw error;
    }
  }
};
