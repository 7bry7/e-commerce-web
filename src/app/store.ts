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

export type UserRole = 'buyer' | 'seller';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roles: UserRole[];
  currentRole: UserRole;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  requestSellerAccess: () => void;
  hasRole: (role: UserRole) => boolean;
}

// Hardcoded test accounts
const TEST_ACCOUNTS = {
  'buyer@test.com': {
    password: '123456',
    user: {
      id: '1',
      name: 'Test Buyer',
      email: 'buyer@test.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=buyer',
      roles: ['buyer' as UserRole],
      currentRole: 'buyer' as UserRole,
    },
  },
  'seller@test.com': {
    password: '123456',
    user: {
      id: '2',
      name: 'Test Seller',
      email: 'seller@test.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seller',
      roles: ['seller' as UserRole],
      currentRole: 'seller' as UserRole,
    },
  },
  'both@test.com': {
    password: '123456',
    user: {
      id: '3',
      name: 'Test Both',
      email: 'both@test.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=both',
      roles: ['buyer' as UserRole, 'seller' as UserRole],
      currentRole: 'buyer' as UserRole,
    },
  },
};

export const useStore = create<AppState>()((set, get) => ({
  user: null,
  cart: [],
  addToCart: (product: Product) =>
    set((state: AppState) => {
      const existing = state.cart.find((item: CartItem) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item: CartItem) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId: string) =>
    set((state: AppState) => ({
      cart: state.cart.filter((item: CartItem) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
  login: (email: string, password: string) => {
    const account = TEST_ACCOUNTS[email as keyof typeof TEST_ACCOUNTS];
    if (account && account.password === password) {
      set({ user: { ...account.user } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, cart: [] }),
  switchRole: (role: UserRole) => {
    const user = get().user;
    if (user && user.roles.includes(role)) {
      set({ user: { ...user, currentRole: role } });
    }
  },
  requestSellerAccess: () => {
    const user = get().user;
    if (user && !user.roles.includes('seller')) {
      const updatedUser = {
        ...user,
        roles: [...user.roles, 'seller' as UserRole],
        currentRole: 'seller' as UserRole,
      };
      set({ user: updatedUser });
    }
  },
  hasRole: (role: UserRole) => {
    const user = get().user;
    return user ? user.roles.includes(role) : false;
  },
}));
