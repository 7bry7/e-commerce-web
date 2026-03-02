import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Star, ShoppingCart, ShieldCheck, Download, Heart, Share2, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router';
import { PRODUCTS } from '../data/products';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');

  // Find product by ID or default to the first one
  const productData = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(productData.price);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-300 bg-[#0A0E17]">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-400">{productData.category}</span>
          <span className="mx-2">/</span>
          <span className="text-white">{productData.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Media */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video bg-black rounded-lg overflow-hidden border border-slate-800 shadow-2xl group"
            >
              <img 
                src={productData.image} 
                alt={productData.title} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="px-2 py-1 bg-black/60 text-xs font-mono text-[#00D28A] border border-[#00D28A]/30 rounded">
                  PREVIEW
                </span>
              </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`aspect-video rounded-md overflow-hidden border ${i === 0 ? 'border-[#00D28A]' : 'border-slate-800 hover:border-slate-600'} cursor-pointer transition-colors bg-black`}>
                  <img 
                    src={productData.image} 
                    alt={`Thumbnail ${i+1}`}
                    className={`w-full h-full object-cover ${i === 0 ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0f1420] border border-slate-800 rounded-lg p-6 shadow-xl"
            >
              <h1 className="text-3xl font-bold text-white mb-2 leading-tight">{productData.title}</h1>
              
              <div className="flex items-center gap-4 text-sm mb-6">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current text-slate-600" />
                  <span className="ml-2 text-slate-400">({productData.reviews})</span>
                </div>
                <div className="text-slate-400">
                  By <a href="#" className="text-[#00D28A] hover:underline font-medium">{productData.creator}</a>
                </div>
              </div>

              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-bold text-[#00D28A]">{formattedPrice}</span>
                {/* Randomize discount for visual variety */}
                <span className="text-sm text-slate-500 line-through mb-1.5">${(productData.price * 1.3).toFixed(2)}</span>
                <span className="text-xs bg-[#00D28A]/10 text-[#00D28A] px-2 py-1 rounded mb-1.5 ml-auto border border-[#00D28A]/20">
                  -30% OFF
                </span>
              </div>

              <div className="space-y-3 mb-8">
                <button className="w-full bg-[#00D28A] hover:bg-[#00b074] text-black font-bold py-3.5 rounded flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-[0_0_20px_rgba(0,210,138,0.2)]">
                  <Download className="w-5 h-5" />
                  Buy Now
                </button>
                <button className="w-full bg-transparent border border-[#00D28A] text-[#00D28A] hover:bg-[#00D28A]/10 font-bold py-3.5 rounded flex items-center justify-center gap-2 transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-400 border-t border-slate-800 pt-6">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  <Heart className="w-4 h-4" /> Add to Wishlist
                </button>
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </motion.div>

            <div className="bg-[#0f1420] border border-slate-800 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00D28A]" />
                Purchase Includes
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                {productData.features?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                    {feature}
                  </li>
                )) || (
                  <>
                     <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />High Resolution Assets</li>
                     <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />Commercial License</li>
                     <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />Lifetime Updates</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex gap-8 border-b border-slate-800 mb-8 overflow-x-auto">
            {['description', 'reviews', 'more_from_creator'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium transition-colors uppercase tracking-wide border-b-2 px-1 ${
                  activeTab === tab 
                    ? 'text-[#00D28A] border-[#00D28A]' 
                    : 'text-slate-500 border-transparent hover:text-white hover:border-slate-700'
                }`}
              >
                {tab.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 text-slate-400 leading-relaxed space-y-6">
              {activeTab === 'description' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-lg text-slate-300">{productData.description}</p>
                  <p>
                    Perfect for sci-fi, cyberpunk, and futuristic game projects. All assets are optimized for real-time rendering and come with custom colliders.
                    This pack has been rigorously tested in major game engines to ensure seamless integration into your workflow.
                  </p>
                  <h3 className="text-white font-bold text-xl mt-8 mb-4">Technical Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-[#0f1420] p-4 rounded border border-slate-800">
                      <span className="block text-slate-500 mb-1">File Format</span>
                      <span className="text-white">.FBX, .OBJ, .BLEND</span>
                    </div>
                    <div className="bg-[#0f1420] p-4 rounded border border-slate-800">
                      <span className="block text-slate-500 mb-1">Texture Resolution</span>
                      <span className="text-white">2048x2048, 4096x4096</span>
                    </div>
                    <div className="bg-[#0f1420] p-4 rounded border border-slate-800">
                      <span className="block text-slate-500 mb-1">Poly Count</span>
                      <span className="text-white">Low to Mid Poly</span>
                    </div>
                    <div className="bg-[#0f1420] p-4 rounded border border-slate-800">
                      <span className="block text-slate-500 mb-1">Compatibility</span>
                      <span className="text-white">Unity 2021+, Unreal 5+</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'reviews' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-[#0f1420] p-6 rounded-lg border border-slate-800">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-white font-bold">CyberDev_99</h4>
                      <div className="flex text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <p className="text-slate-400">"Absolutely stunning assets. The textures are incredibly detailed and the modular system makes building environments a breeze. Highly recommended!"</p>
                  </div>
                  <div className="bg-[#0f1420] p-6 rounded-lg border border-slate-800">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-white font-bold">NeonArchitect</h4>
                      <div className="flex text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 text-slate-600" />
                      </div>
                    </div>
                    <p className="text-slate-400">"Great pack for the price. Some of the colliders needed tweaking but otherwise top notch work."</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'more_from_creator' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>More assets from {productData.creator} coming soon.</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar Tags */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {productData.tags?.map((tag) => (
                  <span key={tag} className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
