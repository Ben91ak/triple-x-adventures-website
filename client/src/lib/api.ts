import { ContactFormData } from "../types/index";

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
      // Ensure we have all required fields for the API
      const payload = {
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        message: formData.message || '',
        visitDate: formData.visitDate || '',
        interests: formData.interests || [],
        charterFlight: formData.charterFlight || ''
      };
      
      // Use the same API endpoint as the main contact form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
if (!response.ok) {
         const errorText = await response.text();
         console.error('Server returned error:', response.status, errorText);
        throw new Error(`Request failed with status: ${response.status}`);
       }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
  
  // Submit adventure package form
  submitAdventureForm: async (formData: AdventureFormData) => {
    try {
      const response = await fetch('/api/adventure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
if (!response.ok) {
         const errorText = await response.text();
         console.error('Server returned error:', response.status, errorText);
        throw new Error(`Request failed with status: ${response.status}`);
       }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting adventure form:', error);
      throw error;
    }
  }
};

