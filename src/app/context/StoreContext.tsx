import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  title: string;
  creator: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  user: any;
  login: () => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const login = () => {
    setUser({
      name: "Alex Creator",
      email: "alex@rhinefront.com",
      avatar: "https://images.unsplash.com/photo-1615843423179-bea071facf96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwc3R5bGl6ZWQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzIyNzExMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    });
  };

  const logout = () => setUser(null);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        user,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
