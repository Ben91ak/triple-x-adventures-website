export interface AdventureLocation {
  id: number;
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  description: string;
  type: 'accommodation' | 'experience' | 'landmark';
  image?: string;
}

// Adventure locations in Swedish Lapland centered around Kiruna area
export const adventureLocations: AdventureLocation[] = [
  {
    id: 1,
    name: "Triple X Adventures Base",
    coordinates: [67.8558, 20.2253], // Akkavare location
    description: "Our primary base for all arctic adventures, where your journey begins.",
    type: "accommodation",
    image: "/images/basecamp.jpg",
  },
  {
    id: 2,
    name: "Northern Lights Viewpoint",
    coordinates: [67.8498, 20.2521],
    description: "Prime location for aurora borealis viewing with unobstructed views of the night sky.",
    type: "experience",
    image: "/images/northern-lights-spot.jpg",
  },
  {
    id: 3,
    name: "Ice Fishing Lake",
    coordinates: [67.8382, 20.2107],
    description: "Frozen lake perfect for traditional ice fishing experiences and winter activities.",
    type: "experience",
    image: "/images/ice-fishing.jpg",
  },
  {
    id: 4,
    name: "Arctic Forest Trail",
    coordinates: [67.8602, 20.2395],
    description: "Scenic hiking trail through pristine Arctic forests with opportunities to spot local wildlife.",
    type: "experience",
    image: "/images/forest-trail.jpg",
  },
  {
    id: 5,
    name: "Luxury Mountain Lodge",
    coordinates: [67.8722, 20.2112],
    description: "Premium accommodation with panoramic mountain views and private hot tubs.",
    type: "accommodation",
    image: "/images/luxury-lodge.jpg",
  },
  {
    id: 6,
    name: "Traditional Sami Camp",
    coordinates: [67.8437, 20.1932],
    description: "Experience authentic Sami culture and traditions in this cultural immersion site.",
    type: "experience",
    image: "/images/sami-camp.jpg",
  },
  {
    id: 7,
    name: "Dog Sledding Trail Start",
    coordinates: [67.8692, 20.2442],
    description: "Starting point for our exhilarating dog sledding adventures through the winter landscape.",
    type: "experience",
    image: "/images/dog-sledding.jpg",
  },
  {
    id: 8,
    name: "Ice Hotel Experience",
    coordinates: [67.8512, 20.2636],
    description: "Visit the famous ice hotel architecture and enjoy a drink at the ice bar.",
    type: "accommodation",
    image: "/images/ice-hotel.jpg",
  },
  {
    id: 9,
    name: "Snowmobile Adventure Park",
    coordinates: [67.8345, 20.2332],
    description: "Thrilling snowmobile tracks and trails for all skill levels.",
    type: "experience",
    image: "/images/snowmobile-park.jpg",
  },
  {
    id: 10,
    name: "Arctic Wildlife Spotting Area",
    coordinates: [67.8603, 20.1867],
    description: "Area known for reindeer, moose, and arctic fox sightings with professional guides.",
    type: "landmark",
    image: "/images/wildlife-area.jpg",
  },
  {
    id: 11,
    name: "Frozen Waterfall",
    coordinates: [67.8760, 20.2289],
    description: "Spectacular frozen waterfall offering ice climbing opportunities for adventure seekers.",
    type: "landmark",
    image: "/images/frozen-waterfall.jpg",
  },
  {
    id: 12,
    name: "Glass Igloo Village",
    coordinates: [67.8481, 20.2782],
    description: "Luxury glass igloos for comfortable aurora viewing from your bed.",
    type: "accommodation",
    image: "/images/glass-igloo.jpg",
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
    en: "Natural Landmark",
    de: "Natürliches Wahrzeichen",
    sv: "Naturligt landmärke"
  }
};