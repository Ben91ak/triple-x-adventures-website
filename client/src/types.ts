// Define the experience detail section interface for structured information display
export interface DetailSection {
  title: string;
  content: string;
}

// Define the tag interface for experiences
export interface ExperienceTag {
  type: 'bestseller' | 'new' | 'featured';
  text: string;
}

// Define the detailed info structure for experiences
export interface DetailedInfoType {
  introduction?: string;
  adventureOptionsTitle?: string;
  tours?: {
    title: string;
    description?: string;
    details?: string[];
  }[];
  importantInfoTitle?: string;
  importantInfo?: string[];
  closingRemark?: string;
}

// Define the complete Experience type
export interface Experience {
  id: number;
  title: string;
  description: string;
  fullDescription?: string; // Make optional as it's being replaced
  image: string;
  gallery?: string[];
  price?: number;
  duration?: string; // e.g., "2 hours", "Full Day"
  intensityLevel?: 'Relaxed' | 'Moderate' | 'Thrilling' | 'Extreme'; // Added intensity level
  keyHighlights?: string[]; // e.g., ["Arctic Scenery", "Professional Guide", "Adrenaline Rush"]
  tag?: {
    text: string;
    type: 'bestseller' | 'featured' | 'new';
  };
  features?: string[]; // Add optional features array
  detailedInfo?: DetailedInfoType; // Add optional detailed info structure

}

// Define type for the weather data
export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  wind: number;
  humidity: number;
  feelsLike: number;
}

// Define accommodation type
export interface Accommodation {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  gallery?: string[];
  features: {
    icon: string;
    text: string;
  }[];
  pricePerNight: number;
  featured?: boolean;
  price?: string;
}

// Define testimonial type
export interface Testimonial {
  id: number;
  author: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
}