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

// Define the complete Experience type
export interface Experience {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  gallery?: string[];
  tag?: ExperienceTag;
  // New field for structured detail sections
  detailSections?: DetailSection[];
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
  features?: string[];
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