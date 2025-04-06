// Experience type
export interface Experience {
  id: number;
  title: string;
  description: string;
  price?: number;
  image: string;
  // Gallery images for the expanded view
  gallery: string[];
  // Longer, more detailed description for the expanded view
  fullDescription?: string;
  tag?: {
    text: string;
    type: string;
  };
}

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

// Gallery image type
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

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
