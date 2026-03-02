import { Heart, Star, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  downloads: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-lg flex flex-col h-full"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-slate-800">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-2 right-2 p-2 bg-slate-950/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button className="flex items-center justify-center">
              <Heart className="w-5 h-5 text-white hover:text-red-500 transition-colors" />
            </button>
        </div>
        <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-md z-10 pointer-events-none">
            {product.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <Link to={`/product/${product.id}`} className="block flex-1 min-w-0">
                <h3 className="text-lg font-medium text-white truncate pr-2 hover:text-emerald-400 transition-colors">{product.title}</h3>
                <p className="text-sm text-slate-400 truncate">by {product.author}</p>
            </Link>
            <div className="flex flex-col items-end shrink-0 ml-2">
                <p className="text-lg font-bold text-emerald-400">${product.price}</p>
            </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 text-sm text-slate-500 border-t border-slate-800/50">
            <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-slate-300 font-medium">{product.rating}</span>
                <span className="text-xs">({product.downloads})</span>
            </div>
            <Link to={`/product/${product.id}`} className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors group/btn">
                <Download className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                <span className="text-xs font-medium">View</span>
            </Link>
        </div>
      </div>
    </motion.div>
  );
}
