import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              RhineFront
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/marketplace" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Marketplace</Link>
              <Link to="/creators" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Creators</Link>
              <Link to="/community" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Community</Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-full leading-5 bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                placeholder="Search assets, tools, art..."
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart" className="text-slate-400 hover:text-white transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/creator" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Sell
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/marketplace" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Marketplace</Link>
            <Link to="/creators" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Creators</Link>
            <div className="mt-4 px-3">
              <input
                type="text"
                className="block w-full pl-3 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
