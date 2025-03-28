export interface AdventureLocation {
  id: number;
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  description: string;
  type: 'accommodation' | 'experience' | 'landmark';
  image?: string;
}

// Adventure locations in Swedish Lapland centered around Arvidsjaur
export const adventureLocations: AdventureLocation[] = [
  {
    id: 1,
    name: "Triple X Adventures Office",
    coordinates: [65.5940, 19.1710], // Storgatan 6F, Arvidsjaur
    description: "Our main office in Arvidsjaur, where your Arctic adventure begins.",
    type: "landmark",
    image: "/images/basecamp.jpg",
  },
  {
    id: 2,
    name: "Sameland & JayJay's Restaurant",
    coordinates: [65.5951, 19.1731], // Karlavagnen 1, Arvidsjaur - adjusted to be closer to town center
    description: "Our traditional restaurant and cabin area where you can enjoy authentic Swedish Lapland cuisine.",
    type: "accommodation",
    image: "/images/restaurant.jpg",
  },
  {
    id: 3,
    name: "Triple X Cabins",
    coordinates: [65.5953, 19.1735], // Karlavagnen 1, Arvidsjaur - adjusted and slightly offset for visibility
    description: "Comfortable cabins with traditional design, perfect for immersing yourself in the Arctic experience.",
    type: "accommodation",
    image: "/images/cabins.jpg",
  },
  {
    id: 4,
    name: "Hotel Laponia",
    coordinates: [65.5900, 19.1660], // Storgatan 45, Arvidsjaur
    description: "Modern hotel accommodations with all amenities for a comfortable stay in Swedish Lapland.",
    type: "accommodation",
    image: "/images/hotel.jpg",
  },
  {
    id: 5,
    name: "Triple X Chalet",
    coordinates: [65.5902, 19.1662], // Storgatan 45, Arvidsjaur (slightly offset for visibility)
    description: "Premium chalet with luxury amenities and breathtaking views of the surrounding landscape.",
    type: "accommodation",
    image: "/images/luxury-lodge.jpg",
  },
  {
    id: 6,
    name: "Northern Lights Viewpoint",
    coordinates: [65.5880, 19.1680],
    description: "Prime location for aurora borealis viewing with unobstructed views of the night sky.",
    type: "experience",
    image: "/images/northern-lights-spot.jpg",
  },
  {
    id: 7,
    name: "Ice Fishing Experience",
    coordinates: [65.5920, 19.1650],
    description: "Frozen lake perfect for traditional ice fishing experiences and winter activities.",
    type: "experience",
    image: "/images/ice-fishing.jpg",
  },
  {
    id: 8,
    name: "Arctic Forest Trail",
    coordinates: [65.5935, 19.1700],
    description: "Scenic hiking trail through pristine Arctic forests with opportunities to spot local wildlife.",
    type: "experience",
    image: "/images/forest-trail.jpg",
  }
];

// This can be translated later if needed
export const typeLabels = {
  accommodation: {
    en: "Accommodation",
    de: "Unterkunft",
    sv: "Boende"
  },
  experience: {
    en: "Experience",
    de: "Erlebnis",
    sv: "Upplevelse"
  },
  landmark: {
    en: "Point of Interest",
    de: "Sehenswürdigkeit",
    sv: "Intressepunkt"
  }
};