import { Link } from "react-router";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-white text-xl tracking-tight">
          <div className="h-8 w-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">R</span>
          </div>
          RhineFront
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search assets, templates, icons..."
              className="h-10 w-full rounded-full bg-zinc-900 border border-zinc-800 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/browse" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Browse
          </Link>
          <Link to="/sell" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Sell
          </Link>
          <Link to="/community" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Community
          </Link>
          
          <div className="h-6 w-px bg-zinc-800 mx-2"></div>
          
          <button className="relative text-zinc-300 hover:text-white transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white border border-zinc-950">
              2
            </span>
          </button>
          
          <button className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors">
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 overflow-hidden">
              <User size={16} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-zinc-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-zinc-800 bg-zinc-950"
          >
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="h-10 w-full rounded-md bg-zinc-900 border border-zinc-800 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/browse" className="text-sm font-medium text-zinc-300 hover:text-white py-2 block">
                  Browse
                </Link>
                <Link to="/sell" className="text-sm font-medium text-zinc-300 hover:text-white py-2 block">
                  Sell
                </Link>
                <Link to="/community" className="text-sm font-medium text-zinc-300 hover:text-white py-2 block">
                  Community
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
