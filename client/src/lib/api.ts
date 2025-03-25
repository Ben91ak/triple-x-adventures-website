import { ContactFormData, WeatherData } from "../types";
import { apiRequest } from "./queryClient";

// API functions for the application
export const api = {
  // Submit contact form
  submitContactForm: async (formData: ContactFormData) => {
    const response = await apiRequest("POST", "/api/contact", formData);
    return response.json();
  },

  // Get weather data
  getWeather: async (): Promise<WeatherData> => {
    const response = await fetch("/api/weather");
    
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      wind: {
        speed: Math.round(data.wind.speed),
      },
      condition: data.weather[0].main,
      icon: data.weather[0].icon
    };
  }
};
