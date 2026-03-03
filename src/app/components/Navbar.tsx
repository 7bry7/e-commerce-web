import { Search, ShoppingCart, User, Menu, LogOut, Store, Package } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useStore } from '../store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const hasBuyerRole = user?.roles.includes('buyer');
  const hasSellerRole = user?.roles.includes('seller');
  const sellLink = hasSellerRole ? '/creator' : '/become-seller';

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
            {user ? (
              <>
                <Link to="/cart" className="text-slate-400 hover:text-white transition-colors">
                  <ShoppingCart className="h-6 w-6" />
                </Link>
                
                {/* User Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-slate-400 hover:text-white transition-colors focus:outline-none">
                      <div className="flex items-center gap-2">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="h-8 w-8 rounded-full border-2 border-slate-700"
                        />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-700">
                    <DropdownMenuLabel className="text-slate-300">
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-slate-500">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    
                    {hasBuyerRole && (
                      <DropdownMenuItem asChild className="text-slate-300 focus:bg-slate-800 cursor-pointer">
                        <Link to="/dashboard" className="flex items-center">
                          <Package className="mr-2 h-4 w-4" />
                          <span>My Library</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    {hasSellerRole && (
                      <DropdownMenuItem asChild className="text-slate-300 focus:bg-slate-800 cursor-pointer">
                        <Link to="/creator" className="flex items-center">
                          <Store className="mr-2 h-4 w-4" />
                          <span>Seller Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-400 focus:bg-slate-800 focus:text-red-300 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sell Button - shown to all authenticated users */}
                <Link 
                  to={sellLink}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {hasSellerRole ? 'Sell' : 'Become a Seller'}
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="text-slate-400 hover:text-white transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link 
                  to="/auth" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
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
            
            {user ? (
              <>
                <Link to="/cart" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Cart</Link>
                {hasBuyerRole && (
                  <Link to="/dashboard" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My Library</Link>
                )}
                {hasSellerRole && (
                  <Link to="/creator" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Seller Dashboard</Link>
                )}
                <Link to={sellLink} className="text-emerald-400 hover:text-emerald-300 block px-3 py-2 rounded-md text-base font-medium">
                  {hasSellerRole ? 'Sell' : 'Become a Seller'}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/auth" className="text-emerald-400 hover:text-emerald-300 block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
              </>
            )}
            
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
