import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, User, Menu, LogOut, Package, Gamepad2, PenTool, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const { itemCount, toggleCart, isCartOpen, items, removeFromCart, total } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Store', path: '/', icon: <Gamepad2 size={18} /> },
    { name: 'Assets', path: '/category/assets', icon: <Package size={18} /> },
    { name: 'Comics', path: '/category/comics', icon: <PenTool size={18} /> },
    { name: 'Software', path: '/category/software', icon: <LayoutGrid size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl tracking-tight">RhineFront</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                    ? 'text-purple-400' 
                    : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search games, assets..." 
                  className="bg-neutral-800 border border-neutral-700 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 w-64 transition-all"
                />
              </div>

              <button 
                onClick={toggleCart}
                className="relative p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce">
                    {itemCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="relative group">
                  <Link to="/library" className="flex items-center gap-2">
                    <img 
                      src={user.avatar || "https://via.placeholder.com/32"} 
                      alt="Avatar" 
                      className="w-8 h-8 rounded-full border-2 border-neutral-700 group-hover:border-purple-500 transition-colors"
                    />
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                     <div className="py-1">
                        <Link to="/library" className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white">My Library</Link>
                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-700 hover:text-red-300 flex items-center gap-2">
                          <LogOut size={14} /> Log Out
                        </button>
                     </div>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="hidden sm:block px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-[calc(100vh-200px)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="font-bold text-lg">RhineFront</span>
            </div>
            <p className="text-neutral-500 text-sm">
              Supporting indie creators since 2026. Buy, sell, and discover unique digital content.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Marketplace</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-purple-400">Browse Games</a></li>
              <li><a href="#" className="hover:text-purple-400">Game Assets</a></li>
              <li><a href="#" className="hover:text-purple-400">Tools & Software</a></li>
              <li><a href="#" className="hover:text-purple-400">Comics & Books</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Community</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-purple-400">Devlogs</a></li>
              <li><a href="#" className="hover:text-purple-400">Jams</a></li>
              <li><a href="#" className="hover:text-purple-400">Forum</a></li>
              <li><a href="#" className="hover:text-purple-400">Creator Hub</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Cart Slide-out */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-neutral-900 border-l border-neutral-800 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingCart size={20} /> Your Cart
                </h2>
                <button onClick={toggleCart} className="p-2 hover:bg-neutral-800 rounded-full">
                  <LogOut size={18} className="rotate-180" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-20 text-neutral-500">
                    <p>Your cart is empty.</p>
                    <button onClick={toggleCart} className="mt-4 text-purple-400 hover:text-purple-300">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-neutral-800/50 p-3 rounded-lg">
                      <img src={item.coverImage} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-neutral-400">{item.creator}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-mono text-purple-400">${item.price.toFixed(2)}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-4 border-t border-neutral-800 bg-neutral-900">
                  <div className="flex justify-between items-center mb-4 text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      toggleCart();
                      navigate('/checkout');
                    }}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
