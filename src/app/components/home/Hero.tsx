import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
              <Sparkles size={14} className="text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300 uppercase tracking-wide">Featured Drop</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Neon Genesis <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Asset Collection
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
              Elevate your next project with over 500+ high-fidelity 3D assets, textures, and environments. Compatible with Blender, Unity, and Unreal Engine.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2">
                Get Access Now
                <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 bg-zinc-900 text-white font-medium rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors">
                View Demo
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-zinc-500 mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-zinc-800 border-2 border-zinc-950"></div>
                ))}
              </div>
              <p>Trusted by 10,000+ creators</p>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1762278804729-13d330fad71a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBkaWdpdGFsJTIwYXJ0JTIwYWJzdHJhY3QlMjBuZW9ufGVufDF8fHx8MTc3MjI3MjAwMHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Cyberpunk Digital Art"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            
            {/* Float Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 z-20 flex justify-between items-center"
            >
              <div>
                <p className="text-white font-medium">Neon Genesis Pack</p>
                <p className="text-xs text-zinc-400">Created by CyberDreams</p>
              </div>
              <span className="text-emerald-400 font-bold">$49.99</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
