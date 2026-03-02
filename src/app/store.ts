import { create } from 'zustand';

export interface Product {
  id: string;
  title: string;
  creator: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  downloadCount: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
