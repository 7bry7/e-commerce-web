import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export function Hero() {
  return (
    <div className="relative bg-slate-950 pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-slate-950 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
          <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20">
                  <Star className="w-3 h-3 mr-1 fill-emerald-400" /> Featured: Cyberpunk Interface Kit
                </span>
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Premium assets for</span>{' '}
                  <span className="block text-emerald-400 xl:inline">digital creators</span>
                </h1>
                <p className="mt-3 text-base text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover thousands of high-quality 3D models, textures, plugins, and sound effects. Curated by the community, for the community.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <div className="rounded-md shadow">
                    <Link
                      to="/marketplace"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg transition-all"
                    >
                      Start Exploring
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/creators"
                      className="w-full flex items-center justify-center px-8 py-3 border border-slate-700 text-base font-medium rounded-md text-emerald-400 bg-slate-900 hover:bg-slate-800 md:py-4 md:text-lg transition-all"
                    >
                      View Creators <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-950 z-10 w-full h-full pointer-events-none" />
            <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1771875802948-0d0f3424fe6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYWJzdHJhY3QlMjBhcnQlMjBkYXJrJTIwbmVvbnxlbnwxfHx8fDE3NzIyNzIzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Digital Abstract Art"
            />
        </div>
      </div>
    </div>
  );
}
