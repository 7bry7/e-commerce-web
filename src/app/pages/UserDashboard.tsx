import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PRODUCTS } from '../data/products';
import { useStore } from '../store';
import { 
  LayoutGrid, 
  Settings, 
  CreditCard, 
  Heart, 
  Download, 
  Search, 
  LogOut, 
  User as UserIcon,
  Bell,
  MoreVertical,
  Clock,
  Store,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

// Mock purchased items
const PURCHASED_ITEMS = [
  { ...PRODUCTS[0], purchaseDate: '2023-11-15', size: '1.2 GB', version: '2.1' },
  { ...PRODUCTS[1], purchaseDate: '2023-10-02', size: '450 MB', version: '1.0' },
  { ...PRODUCTS[3], purchaseDate: '2023-09-20', size: '2.8 GB', version: '5.0' },
  { ...PRODUCTS[5], purchaseDate: '2023-08-10', size: '150 MB', version: '1.2' },
];

// Mock wishlist items
const WISHLIST_ITEMS = [
  PRODUCTS[2],
  PRODUCTS[4],
  PRODUCTS[6]
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('library');
  const [searchQuery, setSearchQuery] = useState('');
  const user = useStore((state) => state.user);
  const hasSellerRole = user?.roles.includes('seller');

  const filteredLibrary = PURCHASED_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { id: 'library', label: 'My Library', icon: LayoutGrid },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-300 font-sans selection:bg-[#00D28A]/30 selection:text-[#00D28A]">
      <Navbar />

      {/* Role Switcher Banner - Only show if user has seller role */}
      {hasSellerRole && (
        <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border-b border-emerald-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">You have seller access</p>
                  <p className="text-xs text-slate-400">Manage your products and sales</p>
                </div>
              </div>
              <Link 
                to="/creator"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Go to Seller Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            {/* User Profile Summary */}
            <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D28A] to-cyan-600 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-[#00D28A]/20">
                JD
              </div>
              <div className="overflow-hidden">
                <h3 className="text-white font-bold truncate">John Doe</h3>
                <p className="text-xs text-slate-500 truncate">john.doe@example.com</p>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                    activeTab === item.id 
                      ? 'text-white bg-[#00D28A]/10 border border-[#00D28A]/20 shadow-[0_0_15px_rgba(0,210,138,0.1)]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D28A]" 
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-[#00D28A]' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              <div className="pt-6 mt-6 border-t border-slate-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'library' && (
                <motion.div
                  key="library"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">My Library</h1>
                        <p className="text-sm text-slate-500">Manage and download your purchased assets</p>
                    </div>
                    
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Search your library..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64 bg-[#0f1420] border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00D28A] focus:ring-1 focus:ring-[#00D28A] transition-all placeholder-slate-600"
                      />
                    </div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLibrary.map((item) => (
                      <div key={item.id} className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-300 group flex flex-col">
                        <div className="relative aspect-video bg-black overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420] to-transparent opacity-60" />
                          <div className="absolute top-2 right-2">
                             <span className="px-2 py-1 bg-black/60 backdrop-blur text-[10px] font-mono text-slate-300 rounded border border-slate-700">
                                v{item.version}
                             </span>
                          </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-white font-bold text-lg mb-1 truncate" title={item.title}>{item.title}</h3>
                          <p className="text-slate-500 text-xs mb-4">Purchased on {item.purchaseDate}</p>
                          
                          <div className="mt-auto space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/50 p-2 rounded">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" /> Recent Update
                                </span>
                                <span>{item.size}</span>
                            </div>
                            
                            <button className="w-full bg-[#00D28A] hover:bg-[#00b074] text-black font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_10px_rgba(0,210,138,0.1)] hover:shadow-[0_0_20px_rgba(0,210,138,0.3)] group/btn">
                              <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredLibrary.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl">
                        <p className="text-slate-500">No assets found matching "{searchQuery}"</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h1 className="text-2xl font-bold text-white mb-8">My Wishlist</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {WISHLIST_ITEMS.map((item) => (
                       <Link to={`/product/${item.id}`} key={item.id} className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden hover:border-[#00D28A]/50 transition-all group">
                         <div className="aspect-video bg-black overflow-hidden relative">
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur rounded-full">
                             <Heart className="w-4 h-4 text-[#00D28A] fill-[#00D28A]" />
                           </div>
                         </div>
                         <div className="p-4">
                           <h3 className="text-white font-medium truncate">{item.title}</h3>
                           <p className="text-[#00D28A] font-bold mt-1">${item.price}</p>
                         </div>
                       </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl"
                >
                  <h1 className="text-2xl font-bold text-white mb-8">Payment Methods</h1>
                  
                  <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6 mb-6 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                     <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Primary Card</p>
                            <h3 className="text-white text-lg font-bold flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-[#00D28A]" /> Visa ending in 4242
                            </h3>
                        </div>
                        <span className="px-2 py-1 bg-[#00D28A]/10 text-[#00D28A] text-xs font-bold rounded border border-[#00D28A]/20">DEFAULT</span>
                     </div>
                     <div className="flex justify-between items-end relative z-10">
                        <p className="text-slate-500 text-sm">Expires 12/25</p>
                        <button className="text-slate-400 hover:text-white text-sm hover:underline">Edit</button>
                     </div>
                  </div>

                  <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6 mb-6 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center text-blue-400">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                        </div>
                        <div>
                            <h3 className="text-white font-medium">GCash</h3>
                            <p className="text-slate-500 text-xs">0917 ••• ••••</p>
                        </div>
                     </div>
                     <button className="text-red-400 hover:text-red-300 text-sm hover:underline">Remove</button>
                  </div>

                  <button className="w-full py-4 border-2 border-dashed border-slate-800 rounded-xl text-slate-500 hover:text-white hover:border-slate-600 hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                    <span className="text-2xl leading-none mb-1">+</span> Add Payment Method
                  </button>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl"
                >
                    <h1 className="text-2xl font-bold text-white mb-8">Account Settings</h1>
                    
                    <div className="space-y-6">
                        <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4">Profile Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">Display Name</label>
                                    <input type="text" defaultValue="John Doe" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-[#00D28A] focus:outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">Email Address</label>
                                    <input type="email" defaultValue="john.doe@example.com" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-[#00D28A] focus:outline-none transition-colors" />
                                </div>
                                <div className="col-span-full space-y-2">
                                    <label className="text-xs text-slate-400">Bio</label>
                                    <textarea rows={3} defaultValue="Digital artist and game developer enthusiast." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-[#00D28A] focus:outline-none transition-colors resize-none" />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button className="bg-[#00D28A] text-black font-bold py-2 px-4 rounded hover:bg-[#00b074] transition-colors text-sm">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4">Notifications</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-white text-sm font-medium">Product Updates</p>
                                            <p className="text-slate-500 text-xs">Get notified when assets you purchased are updated</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-5 bg-[#00D28A] rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                                <div className="h-px bg-slate-800" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Heart className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-white text-sm font-medium">Wishlist Alerts</p>
                                            <p className="text-slate-500 text-xs">Get notified when items on your wishlist go on sale</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
