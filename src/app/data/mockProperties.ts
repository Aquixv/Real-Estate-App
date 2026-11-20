export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "For Sale" | "For Rent";
  type: "Flat / Apartment" | "House" | "Land" | "Commercial";
  state: string;
  location: string;
  beds: number;
  baths: number;
  toilets: number;
  parking: number;
  isPremium?: boolean;
  image: string;
  agentName: string;
  agentPhone: string;
}

export const NIGERIAN_STATES = ["Lagos", "Abuja", "Rivers", "Oyo", "Ogun", "Enugu"];

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    title: "Luxury 2 Bedroom Fully Furnished Apartment with Pool & Gym",
    description: "Fully furnished 2-bedroom apartment off Admiralty Way with 24/7 power, swimming pool, and modern gym.",
    price: 350000000,
    category: "For Sale",
    type: "Flat / Apartment",
    state: "Lagos",
    location: "Admiralty Road, Lekki Phase 1, Lagos",
    beds: 2,
    baths: 2,
    toilets: 3,
    parking: 1,
    isPremium: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60",
    agentName: "RLT Homes",
    agentPhone: "2348012345678",
  },
  {
    id: "prop-2",
    title: "5-Bedroom Detached Duplex with BQ",
    description: "Spacious contemporary detached duplex in a secured gated estate with fitted kitchen and rooftop terrace.",
    price: 850000000,
    category: "For Sale",
    type: "House",
    state: "Lagos",
    location: "Banana Island Road, Ikoyi, Lagos",
    beds: 5,
    baths: 5,
    toilets: 6,
    parking: 4,
    isPremium: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
    agentName: "Prime Crest Realty",
    agentPhone: "2348098765432",
  },
  {
    id: "prop-3",
    title: "4-Bedroom Terrace Duplex with 1-Room BQ",
    description: "Well-finished terrace duplex in a serene residential neighborhood with steady water supply and good road network.",
    price: 170000000,
    category: "For Sale",
    type: "House",
    state: "Abuja",
    location: "Dantata Estate, Gwarinpa, Abuja",
    beds: 4,
    baths: 4,
    toilets: 5,
    parking: 2,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
    agentName: "Capital City Estates",
    agentPhone: "2348033334444",
  },
  {
    id: "prop-4",
    title: "Serviced 3 Bedroom Flat",
    description: "Clean, spacious 3-bedroom apartment in a quiet mini-estate close to major commercial hubs.",
    price: 6500000,
    category: "For Rent",
    type: "Flat / Apartment",
    state: "Rivers",
    location: "GRA Phase 2, Port Harcourt, Rivers",
    beds: 3,
    baths: 3,
    toilets: 4,
    parking: 2,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=60",
    agentName: "Garden City Realtors",
    agentPhone: "2348055556666",
  },
  {
    id: "prop-5",
    title: "Modern 2 Bedroom Apartment",
    description: "Newly built 2-bedroom flat with POP ceiling, wardrobes, and ample parking space.",
    price: 2500000,
    category: "For Rent",
    type: "Flat / Apartment",
    state: "Oyo",
    location: "Old Bodija, Ibadan, Oyo",
    beds: 2,
    baths: 2,
    toilets: 3,
    parking: 1,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60",
    agentName: "Apex Properties",
    agentPhone: "2348077778888",
  },
];