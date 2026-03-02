import { Link, Outlet } from 'react-router';
import { ShoppingCart, Library, User, Menu, LogOut, Package, Search } from 'lucide-react';
import { useStore } from './store';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { clsx } from 'clsx';

export default function Layout() {
  const { cart, user, logout } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                RhineFront
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Store</Link>
              <Link to="/browse" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Browse</Link>
              <Link to="/community" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Community</Link>
              {user && (
                <Link to="/library" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Library</Link>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="bg-zinc-900 border border-zinc-800 rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 w-64 transition-all"
                />
              </div>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-violet-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-zinc-500">Creator</p>
                  </div>
                  <button onClick={() => logout()} className="p-2 text-zinc-400 hover:text-red-400 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
                  <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white">Log in</Link>
                  <Link to="/signup" className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-full transition-colors">
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-zinc-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-900 border-b border-zinc-800"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                <Link to="/" className="block px-3 py-2 text-base font-medium text-white hover:bg-zinc-800 rounded-md">Store</Link>
                <Link to="/browse" className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">Browse</Link>
                <Link to="/library" className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">Library</Link>
                <div className="border-t border-zinc-800 my-2 pt-2">
                  {!user ? (
                    <>
                      <Link to="/login" className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white">Log in</Link>
                      <Link to="/signup" className="block px-3 py-2 text-base font-medium text-violet-400 hover:text-violet-300">Sign up</Link>
                    </>
                  ) : (
                     <button onClick={() => logout()} className="w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:bg-zinc-800 rounded-md">Log Out</button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-4">RhineFront</h3>
              <p className="text-zinc-500 text-sm">
                The premier marketplace for indie creators. Buy, sell, and discover unique digital assets.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-violet-400">Games</a></li>
                <li><a href="#" className="hover:text-violet-400">Assets</a></li>
                <li><a href="#" className="hover:text-violet-400">Tools</a></li>
                <li><a href="#" className="hover:text-violet-400">Comics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-violet-400">Blog</a></li>
                <li><a href="#" className="hover:text-violet-400">Developers</a></li>
                <li><a href="#" className="hover:text-violet-400">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-violet-400">Help Center</a></li>
                <li><a href="#" className="hover:text-violet-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-violet-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-600 text-sm">
            &copy; 2024 RhineFront Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Cart Slide-over */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart } = useStore();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                <LogOut className="w-5 h-5 rotate-180" /> {/* Using logout icon as close/back/arrow */}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">Your cart is empty.</p>
                  <button onClick={onClose} className="mt-4 text-violet-400 hover:text-violet-300 text-sm font-medium">Continue Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg bg-zinc-800" />
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="text-sm text-zinc-500">{item.creator}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-violet-400 font-bold">${item.price.toFixed(2)}</span>
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

            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-800 bg-zinc-900">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="text-xl font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <Link 
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full py-3 bg-violet-600 hover:bg-violet-500 text-white text-center font-bold rounded-lg transition-colors"
                >
                  Checkout Now
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
