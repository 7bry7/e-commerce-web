import { Link } from "react-router";
import { Twitter, Disc, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-white text-xl tracking-tight">
            <div className="h-8 w-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">R</span>
            </div>
            RhineFront
          </Link>
          <p className="text-zinc-400 text-sm max-w-xs">
            Discover, buy, and sell high-quality digital assets for creators. The marketplace for the modern web.
          </p>
          <div className="flex gap-4 text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Disc size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2">Marketplace</h3>
          <Link to="/browse" className="text-zinc-400 hover:text-white text-sm transition-colors">All Assets</Link>
          <Link to="/new" className="text-zinc-400 hover:text-white text-sm transition-colors">New Releases</Link>
          <Link to="/featured" className="text-zinc-400 hover:text-white text-sm transition-colors">Featured</Link>
          <Link to="/top-rated" className="text-zinc-400 hover:text-white text-sm transition-colors">Top Rated</Link>
        </div>

        {/* Community */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2">Community</h3>
          <Link to="/blog" className="text-zinc-400 hover:text-white text-sm transition-colors">Blog</Link>
          <Link to="/forum" className="text-zinc-400 hover:text-white text-sm transition-colors">Forum</Link>
          <Link to="/discord" className="text-zinc-400 hover:text-white text-sm transition-colors">Discord Server</Link>
          <Link to="/events" className="text-zinc-400 hover:text-white text-sm transition-colors">Events</Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white">Stay Updated</h3>
          <p className="text-zinc-400 text-sm">Get the latest assets and news delivered to your inbox.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white w-full placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
        <p>&copy; {new Date().getFullYear()} RhineFront Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-zinc-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-zinc-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
