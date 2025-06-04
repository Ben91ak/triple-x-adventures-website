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
export type { Experience } from '../types';

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

// TYPES FOR TRANSLATION OBJECTS

// For icon/text feature pairs used in translations
export interface TranslationFeature {
  text: string;
  iconKey: string;
}

// For individual accommodation types under accommodations.types (e.g., hotel, cabins)
export interface AccommodationTypeTranslation {
  title: string;
  description: string;
  features: TranslationFeature[];
}

// For main accommodation items (e.g., cabinHotel, txaChalet)
export interface AccommodationItemTranslation {
  title: string;
  description: string;
  features: TranslationFeature[];
}

// For the entire 'accommodations' section in translations
export interface AccommodationsTranslations {
  title: string;
  subtitle: string;
  viewAll: string;
  whereYouWillStay: string;
  comingSoon: string;
  from: string;
  night: string;
  registerInterest: string;
  checkAvailability: string;
  viewOptions: string;
  cabinHotel: AccommodationItemTranslation;
  txaChalet: AccommodationItemTranslation;
  hotelLaponia: AccommodationItemTranslation;
  description: string; // The overall description for the accommodations section
  types: {
    hotel: AccommodationTypeTranslation;
    cabins: AccommodationTypeTranslation;
    glamping: AccommodationTypeTranslation;
  };
}

// Top-level type for the entire translation object (to be progressively enhanced)
export interface AppTranslations {
  nav: Record<string, string>;
  hero: Record<string, string>;
  heroSection: Record<string, string>; 
  experiences: any; // TODO: Define a strong type for experiences
  accommodations: AccommodationsTranslations;
  booking: any; 
  cta: any; 
  footer: any; 
  legal: any; 
  notFound: any; 
  cookieConsent: any; 
  meta: any; 
  professionalServices: any; 
  contactForm: any; 
  contactPage: any; 
  filter: any; 
  packagePage: any; 
  common: any; 
  drivecenter: any; 
  about: any; 
  aboutSection: any; 
  testimonials: any; 
}

// Contact form data type
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  visitDate?: string;
  interests?: string[];
  charterFlight?: string;
  message?: string;
}

// TYPES FOR TRANSLATION OBJECTS

// For icon/text feature pairs used in translations
export interface TranslationFeature {
  text: string;
  iconKey: string;
}

// For individual accommodation types under accommodations.types (e.g., hotel, cabins)
export interface AccommodationTypeTranslation {
  title: string;
  description: string;
  features: TranslationFeature[];
}

// For main accommodation items (e.g., cabinHotel, txaChalet)
export interface AccommodationItemTranslation {
  title: string;
  description: string;
  features: TranslationFeature[];
}

// For the entire 'accommodations' section in translations
export interface AccommodationsTranslations {
  title: string;
  subtitle: string;
  viewAll: string;
  whereYouWillStay: string;
  comingSoon: string;
  from: string;
  night: string;
  registerInterest: string;
  checkAvailability: string;
  viewOptions: string;
  cabinHotel: AccommodationItemTranslation;
  txaChalet: AccommodationItemTranslation;
  hotelLaponia: AccommodationItemTranslation;
  description: string; // The overall description for the accommodations section
  types: {
    hotel: AccommodationTypeTranslation;
    cabins: AccommodationTypeTranslation;
    glamping: AccommodationTypeTranslation;
  };
}

// Top-level type for the entire translation object (to be progressively enhanced)
export interface AppTranslations {
  nav: Record<string, string>;
  hero: Record<string, string>;
  heroSection: Record<string, string>; 
  experiences: any; // TODO: Define a strong type for experiences
  accommodations: AccommodationsTranslations;
  booking: any; 
  cta: any; 
  footer: any; 
  legal: any; 
  notFound: any; 
  cookieConsent: any; 
  meta: any; 
  professionalServices: any; 
  contactForm: any; 
  contactPage: any; 
  filter: any; 
  packagePage: any; 
  common: any; 
  drivecenter: any; 
  about: any; 
  aboutSection: any; 
  testimonials: any; 
}

// Contact form data type
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  visitDate?: string;
  interests?: string[];
  charterFlight?: string;
  message?: string;
}

