import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';

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

interface ProductGridProps {
  title: string;
  products: Product[];
}

export function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <div className="bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
            <a href="#" className="text-emerald-400 hover:text-emerald-300 font-medium text-sm flex items-center">
                View all <span aria-hidden="true" className="ml-1">→</span>
            </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
