import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { Footer } from '../components/Footer';
import { PRODUCTS } from '../data/products';

export default function Home() {
  const trendingProducts = PRODUCTS.slice(0, 4).map(p => ({
    ...p,
    downloads: 100 + Math.floor(Math.random() * 500) // Mock downloads since it wasn't in the original object
  }));
  
  const freshReleases = PRODUCTS.slice(4, 8).map(p => ({
    ...p,
    downloads: 50 + Math.floor(Math.random() * 200)
  }));

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />
      <main>
        <Hero />
        <ProductGrid title="Trending Now" products={trendingProducts} />
        <ProductGrid title="Fresh Releases" products={freshReleases} />
        
        {/* Newsletter / CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Monetize Your Creativity?</h2>
            <p className="text-zinc-400 mb-8 text-lg">Join thousands of creators selling their digital assets on RhineFront today.</p>
            <button className="px-8 py-3 bg-white text-zinc-950 font-bold rounded-lg hover:bg-zinc-200 transition-colors">
              Become a Seller
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
