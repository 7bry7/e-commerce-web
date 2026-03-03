import { useState } from 'react';
import { Search, Filter, Edit2, MoreHorizontal, Eye, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { motion } from 'motion/react';

const MY_PRODUCTS = [
  { ...PRODUCTS[0], sales: 1250, revenue: 12487.50, status: 'active' },
  { ...PRODUCTS[2], sales: 843, revenue: 21075.00, status: 'active' },
  { ...PRODUCTS[4], sales: 42, revenue: 840.00, status: 'draft' },
  { ...PRODUCTS[1], sales: 310, revenue: 4650.00, status: 'active' },
  { ...PRODUCTS[6], sales: 0, revenue: 0, status: 'draft' },
];

export default function MyProductsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const filteredProducts = MY_PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Toggle the options dropdown
  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">My Products</h1>
          <p className="text-sm text-slate-500">Manage your digital assets and view performance.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 bg-[#0f1420] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00D28A] focus:ring-1 focus:ring-[#00D28A] transition-all placeholder-slate-600"
            />
          </div>
          
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-[#0f1420] border border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-[#00D28A] focus:ring-1 focus:ring-[#00D28A] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#161B28] border border-slate-800 rounded-xl overflow-visible group hover:border-slate-600 transition-all duration-300 flex flex-col relative"
          >
            {/* Thumbnail Area */}
            <div className="relative aspect-video bg-black overflow-hidden rounded-t-xl">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border backdrop-blur-md ${
                  product.status === 'active' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2 relative">
                <h3 className="text-white font-bold text-lg truncate pr-4" title={product.title}>
                  {product.title}
                </h3>
                
                {/* Options Dropdown Trigger */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown(product.id)}
                    className="text-slate-500 hover:text-white transition-colors p-1"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {openDropdownId === product.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#0f1420] border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                        <Edit2 className="w-4 h-4" /> Edit Product
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                        <Eye className="w-4 h-4" /> View Public Page
                      </button>
                      <div className="h-px bg-slate-700 my-1"></div>
                      <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 hover:text-red-300 flex items-center gap-2">
                        <Trash2 className="w-4 h-4" /> Delete Asset
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-slate-500 text-xs mb-4 line-clamp-2">{product.category}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0A0E17] rounded p-2 border border-slate-800/50">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Price</p>
                  <p className="text-white font-medium">${product.price}</p>
                </div>
                <div className="bg-[#0A0E17] rounded p-2 border border-slate-800/50">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Total Sales</p>
                  <p className="text-[#00D28A] font-medium">{product.sales}</p>
                </div>
              </div>

              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl bg-[#0f1420]/50">
          <p className="text-slate-500 mb-4">No products found matching "{searchQuery}"</p>
          <button 
            onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
            className="text-[#00D28A] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}