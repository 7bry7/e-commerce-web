import { motion } from "motion/react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export interface ProductProps {
  id: string;
  title: string;
  creator: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: ProductProps;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="p-2 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors" title="Add to Cart">
            <ShoppingCart size={20} />
          </button>
          <button className="p-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors" title="Wishlist">
            <Heart size={20} />
          </button>
        </div>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-xs font-medium px-2 py-1 rounded text-white border border-white/10">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-zinc-100 truncate pr-2">{product.title}</h3>
          <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
            <Star size={12} fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-zinc-400 mb-3 truncate">by {product.creator}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
          <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
