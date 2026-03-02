import { create } from 'zustand';
import { Product } from '../data/mock';

interface CartItem extends Product {
  quantity: number; // For digital goods usually 1, but maybe for assets multiple licenses?
  // Sticking to 1 for digital goods mostly, but I'll keep quantity for standard practice.
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setOpen: (open: boolean) => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product) => set((state) => {
    const existing = state.items.find(item => item.id === product.id);
    if (existing) {
      return state; // Digital items usually just 1
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  total: () => get().items.reduce((sum, item) => sum + item.price, 0),
}));
