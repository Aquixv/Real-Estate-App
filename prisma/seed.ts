import { PrismaClient } from "@prisma/client/extension";
import "dotenv/config";
import { prisma } from "@/lib/prisma";

const LOCATIONS: Record<string, string[]> = {
  Lagos: ["Lekki Phase 1", "Ikoyi", "Victoria Island", "Ikeja GRA", "Yaba", "Surulere", "Ajah"],
  Abuja: ["Maitama", "Wuse II", "Gwarinpa", "Asokoro", "Guzape", "Jabi"],
  Rivers: ["GRA Phase 2, Port Harcourt", "Trans-Amadi, Port Harcourt", "Peter Odili Road, Port Harcourt"],
  Oyo: ["Old Bodija, Ibadan", "Jericho, Ibadan", "Akobo, Ibadan"],
  Ogun: ["Abeokuta GRA", "Magboro", "Mowe"],
  Enugu: ["Independence Layout", "New Haven", "GRA Enugu"],
};

const AGENTS = [
  { name: "RLT Homes", phone: "2348012345678" },
  { name: "Prime Crest Realty", phone: "2348098765432" },
  { name: "Capital City Estates", phone: "2348033334444" },
  { name: "Garden City Realtors", phone: "2348055556666" },
  { name: "Apex Properties", phone: "2348077778888" },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=60",
];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  // Wipe existing rows so you can re-run the seed cleanly anytime
  await prisma.property.deleteMany();

  const states = Object.keys(LOCATIONS);
  const categories = ["For Sale", "For Rent"];
  const types = ["Flat / Apartment", "House", "Land", "Commercial"];
  const furnishings = ["Furnished", "Semi-Furnished", "Unfurnished"];

  const listings = Array.from({ length: 30 }).map((_, i) => {
    const state = pick(states);
    const area = pick(LOCATIONS[state]);
    const category = pick(categories);
    const type = pick(types);
    const agent = pick(AGENTS);
    const isLand = type === "Land";

    const beds = isLand ? 0 : type === "House" ? randInt(3, 5) : randInt(1, 3);
    const baths = isLand ? 0 : beds;
    const toilets = isLand ? 0 : beds + 1;
    const parking = isLand ? 0 : randInt(1, 4);

    // Realistic Naira pricing
    let price: number;
    if (category === "For Sale") {
      price = isLand
        ? randInt(15, 120) * 1_000_000
        : type === "House"
        ? randInt(85, 450) * 1_000_000
        : randInt(45, 220) * 1_000_000;
    } else {
      price = type === "House"
        ? randInt(6, 25) * 1_000_000
        : randInt(15, 90) * 100_000;
    }

    const title = isLand
      ? `600sqm Dry Residential Plot in ${area}`
      : type === "Commercial"
      ? `Modern Commercial Office Space in ${area}`
      : `${beds}-Bedroom ${type === "House" ? "Detached Duplex" : "Serviced Apartment"} in ${area}`;

    return {
      title,
      description: `Well-positioned ${type.toLowerCase()} located in ${area}, ${state}. Features good road network, 24/7 security, reliable power infrastructure, and verified documentation. Available ${category.toLowerCase()}.`,
      price,
      category,
      type,
      state,
      location: `${area}, ${state}`,
      beds,
      baths,
      toilets,
      parking,
      furnishing: isLand ? "Unfurnished" : pick(furnishings),
      serviced: !isLand && Math.random() > 0.4,
      isPremium: i < 6, // First 6 are marked Premium for your homepage carousel
      image: IMAGES[i % IMAGES.length],
      agentName: agent.name,
      agentPhone: agent.phone,
    };
  });

  await prisma.property.createMany({ data: listings });
  console.log(`Seeded ${listings.length} Nigerian property listings.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });