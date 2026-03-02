import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useCart } from '../context/CartContext';
import Slider from 'react-slick';
import { Star, MessageSquare, Share2, Flag, ShoppingCart, Play, Download, ExternalLink, Calendar, Layers } from 'lucide-react';
import { motion } from 'motion/react';

// Mock data for a single product
const productData = {
  id: '1',
  title: 'Neon Odyssey: Cybernetic Soul',
  price: 19.99,
  creator: 'PixelForge Studios',
  description: `
    Dive into a sprawling metropolis where humanity and technology have merged. Hack, slash, and negotiate your way through the underbelly of Neo-Tokyo.
    
    Features:
    - 50+ hours of gameplay
    - Fully customizable cybernetic enhancements
    - Multiple endings based on your choices
    - Original synthwave soundtrack
    
    System Requirements:
    - OS: Windows 10/11
    - Processor: Intel Core i5
    - Memory: 8 GB RAM
    - Graphics: NVIDIA GeForce GTX 1060
  `,
  coverImage: 'https://images.unsplash.com/photo-1561344640-2453889cde5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  images: [
    'https://images.unsplash.com/photo-1561344640-2453889cde5b?w=1080',
    'https://images.unsplash.com/photo-1649355019584-bc0112fda698?w=1080',
    'https://images.unsplash.com/photo-1765196176394-e028da216775?w=1080',
  ],
  tags: ['RPG', 'Cyberpunk', 'Action', 'Open World'],
  rating: 4.8,
  reviews: 1240,
  releaseDate: '2025-11-15',
  version: '1.2.0',
  fileSize: '15 GB'
};

const comments = [
  { id: 1, user: 'RetroGamer99', text: 'Absolutely stunning visuals! The soundtrack is a banger too.', date: '2 days ago' },
  { id: 2, user: 'CodeWizard', text: 'Found a small bug in level 3, but the dev patched it instantly. Great support.', date: '1 week ago' },
  { id: 3, user: 'ArtLover', text: 'The pixel art style mixed with 3D lighting is genius.', date: '2 weeks ago' },
];

export const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'description' | 'comments' | 'devlog'>('description');
  
  // In a real app, fetch product by id
  const product = productData; 

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: "rounded-xl overflow-hidden shadow-2xl mb-8 border border-neutral-800"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Breadcrumbs */}
      <div className="text-sm text-neutral-500 mb-6 flex gap-2">
        <Link to="/" className="hover:text-purple-400">Home</Link> / 
        <Link to="/games" className="hover:text-purple-400">Games</Link> / 
        <span className="text-white">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Media & Details */}
        <div className="lg:col-span-2">
          
          {/* Title Mobile */}
          <div className="lg:hidden mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
               <span>By <span className="text-purple-400 font-medium">{product.creator}</span></span>
               <div className="flex items-center gap-1 text-yellow-500">
                 <Star size={14} fill="currentColor" /> {product.rating} ({product.reviews})
               </div>
            </div>
          </div>

          <Slider {...sliderSettings}>
            {product.images.map((img, idx) => (
              <div key={idx} className="relative aspect-video bg-black flex items-center justify-center">
                 <img src={img} alt={`Screenshot ${idx}`} className="w-full h-full object-contain" />
              </div>
            ))}
          </Slider>

          {/* Tabs */}
          <div className="border-b border-neutral-800 mb-6 flex gap-8">
            {['description', 'comments', 'devlog'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-sm font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-invert max-w-none text-neutral-300">
                <p className="whitespace-pre-line leading-relaxed">{product.description}</p>
                
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-neutral-800 p-4 rounded-lg">
                    <span className="text-neutral-500 block mb-1">Genre</span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="bg-neutral-700 px-2 py-1 rounded text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-neutral-800 p-4 rounded-lg">
                     <span className="text-neutral-500 block mb-1">Release Date</span>
                     <span className="text-white">{product.releaseDate}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'comments' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-neutral-800 p-4 rounded-lg flex gap-4">
                  <div className="w-10 h-10 bg-neutral-700 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <textarea 
                      placeholder="Write a comment..." 
                      className="w-full bg-transparent border-b border-neutral-600 focus:border-purple-500 focus:outline-none py-2 text-white min-h-[80px]"
                    />
                    <button className="mt-2 px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded hover:bg-purple-700">Post Comment</button>
                  </div>
                </div>
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-4 border-b border-neutral-800 pb-6">
                     <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex-shrink-0" />
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-white">{comment.user}</span>
                         <span className="text-xs text-neutral-500">{comment.date}</span>
                       </div>
                       <p className="text-neutral-300 text-sm">{comment.text}</p>
                     </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'devlog' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                 {[1, 2].map((log) => (
                   <div key={log} className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-800">
                      <h3 className="text-xl font-bold text-white mb-2">Update v1.{log}.0 - Major Performance Fixes</h3>
                      <p className="text-neutral-400 text-sm mb-4">Posted on Oct {log + 10}, 2025</p>
                      <p className="text-neutral-300">We've been hard at work optimizing the rendering pipeline for lower-end machines. This update brings a 20% FPS boost across the board.</p>
                      <button className="mt-4 text-purple-400 text-sm hover:text-purple-300 font-medium">Read full log</button>
                   </div>
                 ))}
               </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Checkout & Meta */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 sticky top-24 shadow-2xl shadow-purple-900/10">
            {/* Title Desktop */}
            <div className="hidden lg:block mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">{product.title}</h1>
                <Link to="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium">{product.creator}</Link>
            </div>

            <div className="bg-neutral-900 rounded-lg p-4 mb-6 border border-neutral-800">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-neutral-400">Price</span>
                 <span className="text-2xl font-bold text-white">${product.price}</span>
               </div>
               <div className="text-xs text-neutral-500">Includes VAT where applicable</div>
            </div>

            <button 
              onClick={() => addToCart(product)}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 mb-3 shadow-lg shadow-purple-600/20"
            >
              <ShoppingCart size={20} /> Buy Now
            </button>
            
            <button className="w-full py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
              <Download size={18} /> Download Demo
            </button>

            <div className="mt-6 pt-6 border-t border-neutral-700 space-y-3 text-sm text-neutral-400">
               <div className="flex items-center gap-2">
                 <Calendar size={16} /> Released: {product.releaseDate}
               </div>
               <div className="flex items-center gap-2">
                 <Layers size={16} /> Version: {product.version}
               </div>
               <div className="flex items-center gap-2">
                 <ExternalLink size={16} /> Website: <a href="#" className="text-purple-400 hover:underline">pixel-forge.com</a>
               </div>
            </div>
            
            <div className="mt-6 flex gap-2 justify-center">
              <button className="p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-full">
                <Share2 size={18} />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-full">
                <Flag size={18} />
              </button>
            </div>
          </div>

          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800">
            <h3 className="font-bold text-white mb-4">More by {product.creator}</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3 group cursor-pointer">
                  <div className="w-16 h-12 bg-neutral-800 rounded overflow-hidden">
                    <img src={`https://source.unsplash.com/random/100x100?sig=${i}`} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" alt="" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-200 group-hover:text-purple-400 transition-colors">Project {i}</h4>
                    <span className="text-xs text-neutral-500">$4.99</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
