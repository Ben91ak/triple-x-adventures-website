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
    coordinates: [65.6842, 19.2580], // Karlavagnen 1, Arvidsjaur
    description: "Our traditional restaurant and cabin area where you can enjoy authentic Swedish Lapland cuisine.",
    type: "accommodation",
    image: "/images/restaurant.jpg",
  },
  {
    id: 3,
    name: "Triple X Cabins",
    coordinates: [65.6840, 19.2582], // Karlavagnen 1, Arvidsjaur (slightly offset for visibility)
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
    coordinates: [65.5861, 19.1556],
    description: "Prime location for aurora borealis viewing with unobstructed views of the night sky.",
    type: "experience",
    image: "/images/northern-lights-spot.jpg",
  },
  {
    id: 7,
    name: "Ice Fishing Experience",
    coordinates: [65.5783, 19.1732],
    description: "Frozen lake perfect for traditional ice fishing experiences and winter activities.",
    type: "experience",
    image: "/images/ice-fishing.jpg",
  },
  {
    id: 8,
    name: "Arctic Forest Trail",
    coordinates: [65.5935, 19.1877],
    description: "Scenic hiking trail through pristine Arctic forests with opportunities to spot local wildlife.",
    type: "experience",
    image: "/images/forest-trail.jpg",
  },
  {
    id: 9,
    name: "Traditional Sami Camp",
    coordinates: [65.5814, 19.2145],
    description: "Experience authentic Sami culture and traditions in this cultural immersion site.",
    type: "experience",
    image: "/images/sami-camp.jpg",
  },
  {
    id: 10,
    name: "Dog Sledding Trail Start",
    coordinates: [65.5766, 19.1902],
    description: "Starting point for our exhilarating dog sledding adventures through the winter landscape.",
    type: "experience",
    image: "/images/dog-sledding.jpg",
  },
  {
    id: 11,
    name: "Snowmobile Adventure Park",
    coordinates: [65.5952, 19.1965],
    description: "Thrilling snowmobile tracks and trails for all skill levels.",
    type: "experience",
    image: "/images/snowmobile-park.jpg",
  },
  {
    id: 12,
    name: "Arctic Wildlife Spotting Area",
    coordinates: [65.6025, 19.1827],
    description: "Area known for reindeer, moose, and arctic fox sightings with professional guides.",
    type: "landmark",
    image: "/images/wildlife-area.jpg",
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