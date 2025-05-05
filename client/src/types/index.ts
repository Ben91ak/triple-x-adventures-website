// Define nested types for detailedInfo
export interface TourType {
  title?: string;
  description?: string;
  details?: string[];
}

export interface DetailedInfoType {
  introduction?: string;
  adventureOptionsTitle?: string;
  tours?: TourType[];
  importantInfoTitle?: string;
  importantInfo?: string[];
  closingRemark?: string;
}

// Experience type
export { Experience } from '../types';

// Accommodation type
export interface Accommodation {
  id: number;
  title: string;
  description: string;
  pricePerNight: number;
  image: string;
  featured?: boolean;
  features: Array<{
    icon: string;
    text: string;
  }>;
}

// Team member type
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// Testimonial type
export interface Testimonial {
  id: number;
  text: string;
  author: {
    name: string;
    location: string;
    image: string;
  };
  rating: number;
}

// Gallery image type removed as it's no longer used

// Weather data type removed as requested

// Package option type
export interface PackageOption {
  id: string;
  title: string;
  price: number;
  description: string;
  category: 'core' | 'accommodation' | 'addon';
}

// Contact form data type
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  visitDate?: string;
  interests?: string[];
  message?: string;
}
