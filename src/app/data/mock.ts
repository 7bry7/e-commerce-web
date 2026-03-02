import { create } from 'zustand';

export interface Product {
  id: string;
  title: string;
  creator: string;
  price: number; // 0 for "Name your price" base
  description: string;
  category: 'Game' | 'Asset' | 'Tool' | 'Art' | 'Comic';
  tags: string[];
  coverImage: string;
  screenshots: string[];
  rating: number;
  reviews: number;
  releaseDate: string;
  isTrending?: boolean;
  isNew?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Neon Nights: Cyber City',
    creator: 'PixelForge',
    price: 14.99,
    description: 'A neon-drenched cyberpunk RPG set in a sprawling metropolis. Hack, slash, and navigate the corporate underworld.',
    category: 'Game',
    tags: ['RPG', 'Cyberpunk', 'Action'],
    coverImage: 'https://images.unsplash.com/photo-1611023624193-31924e0e7d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1lJTIwY2l0eSUyMG5lb258ZW58MXx8fHwxNzcyMjcxNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    screenshots: [
      'https://images.unsplash.com/photo-1720962158937-7ea890052166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBmdXR1cmlzdGljJTIwdWklMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcyMjcxNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1611415536753-ad67e967d533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGN5YmVyJTIwYXZhdGFyfGVufDF8fHx8MTc3MjI3MTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.8,
    reviews: 1240,
    releaseDate: '2023-11-15',
    isTrending: true,
  },
  {
    id: '2',
    title: 'Ethereal Lands Asset Pack',
    creator: 'DreamWeaver Arts',
    price: 4.99,
    description: 'High-quality fantasy landscape assets for Unity and Unreal Engine. Includes trees, rocks, terrain textures, and skyboxes.',
    category: 'Asset',
    tags: ['3D', 'Environment', 'Fantasy'],
    coverImage: 'https://images.unsplash.com/photo-1759177277296-8b20404d29df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwcnBnJTIwbGFuZHNjYXBlJTIwZGlnaXRhbCUyMGFydHxlbnwxfHx8fDE3NzIyNzE1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    screenshots: [],
    rating: 4.9,
    reviews: 85,
    releaseDate: '2024-01-20',
    isNew: true,
  },
  {
    id: '3',
    title: 'Pixel Quest: The Lost Dungeon',
    creator: 'RetroBit',
    price: 0, // Free / PWYW
    description: 'A classic 8-bit dungeon crawler with modern mechanics. Explore procedural dungeons and fight pixelated monsters.',
    category: 'Game',
    tags: ['Pixel Art', 'Roguelike', 'Adventure'],
    coverImage: 'https://images.unsplash.com/photo-1765196176394-e028da216775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMGdhbWUlMjBzY3JlZW5zaG90fGVufDF8fHx8MTc3MjI3MTI5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    screenshots: [],
    rating: 4.5,
    reviews: 340,
    releaseDate: '2023-08-10',
  },
  {
    id: '4',
    title: 'Void Interface UI Kit',
    creator: 'SystemCore',
    price: 9.99,
    description: 'A complete UI kit for sci-fi games and apps. Includes buttons, panels, icons, and HUD elements.',
    category: 'Tool',
    tags: ['UI', 'Sci-Fi', 'Vector'],
    coverImage: 'https://images.unsplash.com/photo-1720962158937-7ea890052166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBmdXR1cmlzdGljJTIwdWklMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcyMjcxNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    screenshots: [],
    rating: 4.7,
    reviews: 56,
    releaseDate: '2024-02-01',
    isNew: true,
  },
  {
    id: '5',
    title: 'Abstract Geometric Wallpapers',
    creator: 'ArtistryDigital',
    price: 2.99,
    description: 'A collection of 4K abstract geometric wallpapers for desktop and mobile.',
    category: 'Art',
    tags: ['Wallpaper', 'Abstract', '4K'],
    coverImage: 'https://images.unsplash.com/photo-1770885653473-ca48b4d69173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBnZW9tZXRyaWMlMjBhcnQlMjBkYXJrfGVufDF8fHx8MTc3MjI3MTUzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    screenshots: [],
    rating: 4.6,
    reviews: 22,
    releaseDate: '2023-12-05',
  },
  {
    id: '6',
    title: 'Cyber Avatar Maker',
    creator: 'IdentitySoft',
    price: 19.99,
    description: 'Create your own cyberpunk avatar with this powerful character creator tool.',
    category: 'Tool',
    tags: ['Character Creator', 'Avatar', 'Cyberpunk'],
    coverImage: 'https://images.unsplash.com/photo-1611415536753-ad67e967d533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGN5YmVyJTIwYXZhdGFyfGVufDF8fHx8MTc3MjI3MTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    screenshots: [],
    rating: 4.8,
    reviews: 890,
    releaseDate: '2023-10-01',
    isTrending: true,
  }
];

export const mockUsers = {
  currentUser: {
    id: 'user_123',
    name: 'Alex Dev',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1611415536753-ad67e967d533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGN5YmVyJTIwYXZhdGFyfGVufDF8fHx8MTc3MjI3MTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    library: ['1', '3'],
    orders: [
      {
        id: 'ord_1',
        date: '2024-02-15',
        total: 14.99,
        items: ['1'],
        status: 'Completed'
      },
      {
        id: 'ord_2',
        date: '2024-01-10',
        total: 0,
        items: ['3'],
        status: 'Completed'
      }
    ]
  }
};
