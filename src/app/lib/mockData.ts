import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Product = {
  id: string;
  title: string;
  creator: string;
  price: number;
  originalPrice?: number; // for sales
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  images: string[];
  rating: number;
  downloads: number;
  releaseDate: string;
};

export const CATEGORIES = [
  "All",
  "Games",
  "Assets", 
  "Tools",
  "Comics",
  "Books",
  "Soundtracks"
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Neon Cyber Glitch",
    creator: "PixelForge",
    price: 14.99,
    description: "A high-octane cyberpunk action platformer with glitch mechanics.",
    category: "Games",
    tags: ["Action", "Platformer", "Cyberpunk"],
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    ],
    rating: 4.8,
    downloads: 12050,
    releaseDate: "2023-11-15"
  },
  {
    id: "p2",
    title: "Low Poly Dungeon Pack",
    creator: "AssetMaster",
    price: 9.99,
    originalPrice: 19.99,
    description: "Over 500 low poly models for your dungeon crawler game.",
    category: "Assets",
    tags: ["3D", "Low Poly", "Fantasy"],
    coverImage: "https://images.unsplash.com/photo-1615840287214-7ff58ee04996?q=80&w=2070&auto=format&fit=crop",
    images: [
       "https://images.unsplash.com/photo-1615840287214-7ff58ee04996?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.5,
    downloads: 3400,
    releaseDate: "2024-01-10"
  },
  {
    id: "p3",
    title: "Echoes of the Void",
    creator: "Stellar Studios",
    price: 0, // Free / Name your price
    description: "An atmospheric visual novel about space exploration and loneliness.",
    category: "Games",
    tags: ["Visual Novel", "Sci-Fi", "Story Rich"],
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    ],
    rating: 4.9,
    downloads: 89000,
    releaseDate: "2023-08-20"
  },
  {
    id: "p4",
    title: "RPG Maker 8-Bit Audio",
    creator: "RetroSound",
    price: 4.99,
    description: "Authentic 8-bit chiptune tracks and sound effects.",
    category: "Assets",
    tags: ["Audio", "Retro", "Music"],
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.2,
    downloads: 1200,
    releaseDate: "2024-02-01"
  },
  {
    id: "p5",
    title: "Voxel City Generator",
    creator: "CodeWiz",
    price: 24.99,
    description: "Procedural city generation tool for Unity and Unreal.",
    category: "Tools",
    tags: ["Tool", "Procedural", "Voxel"],
    coverImage: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000&auto=format&fit=crop",
    images: [
       "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000&auto=format&fit=crop"
    ],
    rating: 4.7,
    downloads: 560,
    releaseDate: "2023-12-05"
  },
  {
    id: "p6",
    title: "The Silent Forest",
    creator: "IndieHorror",
    price: 5.00,
    description: "A short horror experience set in a dense, fog-covered forest.",
    category: "Games",
    tags: ["Horror", "First Person", "Short"],
    coverImage: "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.6,
    downloads: 4500,
    releaseDate: "2023-10-31"
  }
];

export const MOCK_COMMENTS = [
  { id: 1, user: "Gamer123", text: "This game is incredible! The art style is unique.", rating: 5, date: "2 days ago" },
  { id: 2, user: "DevFan", text: "Great assets, saved me weeks of work.", rating: 5, date: "1 week ago" },
  { id: 3, user: "IndieLover", text: "Controls are a bit floaty, but otherwise good.", rating: 4, date: "3 weeks ago" },
];
