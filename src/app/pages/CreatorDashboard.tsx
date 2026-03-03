import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import UploadProductForm from '../components/creator/UploadProductForm';
import MyProductsList from '../components/creator/MyProductsList';
import { 
  LayoutDashboard, 
  Package, 
  Upload, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Activity, 
  MoreVertical,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart 
} from 'recharts';

// Mock Data for Chart
const SALES_DATA = [
  { date: 'Oct 01', sales: 120 },
  { date: 'Oct 05', sales: 150 },
  { date: 'Oct 10', sales: 180 },
  { date: 'Oct 15', sales: 250 },
  { date: 'Oct 20', sales: 210 },
  { date: 'Oct 25', sales: 300 },
  { date: 'Oct 30', sales: 280 },
  { date: 'Nov 01', sales: 320 },
  { date: 'Nov 05', sales: 380 },
  { date: 'Nov 10', sales: 450 },
  { date: 'Nov 15', sales: 410 },
  { date: 'Nov 20', sales: 520 },
  { date: 'Nov 25', sales: 580 },
  { date: 'Nov 30', sales: 600 },
];

// Mock Data for Recent Activity
const RECENT_ACTIVITY = [
  { id: 1, asset: 'Neon City Asset Pack', buyer: 'AlexK', price: 24.99, date: '2 mins ago' },
  { id: 2, asset: 'Cyberpunk UI Kit', buyer: 'StudioX', price: 49.99, date: '15 mins ago' },
  { id: 3, asset: 'Sci-Fi Sound Effects', buyer: 'IndieDev99', price: 15.00, date: '1 hour ago' },
  { id: 4, asset: 'Neon City Asset Pack', buyer: 'GamerPro', price: 24.99, date: '3 hours ago' },
  { id: 5, asset: 'Holo-Interface 3D', buyer: 'VR_Master', price: 35.50, date: '5 hours ago' },
];

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'upload', label: 'Upload New', icon: Upload },
    { id: 'payouts', label: 'Payouts', icon: DollarSign },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f1420] border border-slate-700 p-3 rounded shadow-lg">
          <p className="text-slate-400 text-xs mb-1">{label}</p>
          <p className="text-[#00D28A] font-bold text-sm">
            ${payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-300 font-sans selection:bg-[#00D28A]/30 selection:text-[#00D28A]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            {/* Creator Profile Summary */}
            <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20">
                NP
              </div>
              <div className="overflow-hidden">
                <h3 className="text-white font-bold truncate">NeonPixels</h3>
                <p className="text-xs text-slate-500 truncate">Level 5 Seller</p>
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
                      layoutId="activeCreatorTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#00D28A]" 
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-[#00D28A]' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="mt-8 bg-[#0f1420] border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Seller Level</h4>
                <div className="flex justify-between text-sm text-white mb-2">
                    <span>Pro Creator</span>
                    <span className="text-[#00D28A]">92%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00D28A] w-[92%] rounded-full" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Maintain 4.8★ rating to keep Pro status</p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <div className="flex items-center gap-2 bg-[#0f1420] border border-slate-800 rounded-lg p-1">
                        <button className="px-3 py-1 bg-slate-800 text-white text-xs font-medium rounded shadow">30 Days</button>
                        <button className="px-3 py-1 text-slate-500 hover:text-white text-xs font-medium rounded transition-colors">90 Days</button>
                        <button className="px-3 py-1 text-slate-500 hover:text-white text-xs font-medium rounded transition-colors">Year</button>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Earnings */}
                    <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-slate-600 transition-colors">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-24 h-24 text-[#00D28A]" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-slate-400 text-sm font-medium mb-1">Total Earnings</p>
                        <h2 className="text-3xl font-bold text-white mb-2">$12,450.00</h2>
                        <div className="flex items-center gap-1 text-[#00D28A] text-xs font-medium bg-[#00D28A]/10 w-fit px-2 py-1 rounded">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+15% from last month</span>
                        </div>
                      </div>
                    </div>

                    {/* Active Assets */}
                    <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-slate-600 transition-colors">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Package className="w-24 h-24 text-blue-500" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-slate-400 text-sm font-medium mb-1">Active Assets</p>
                        <h2 className="text-3xl font-bold text-white mb-2">24</h2>
                        <div className="flex items-center gap-1 text-blue-400 text-xs font-medium bg-blue-400/10 w-fit px-2 py-1 rounded">
                          <Upload className="w-3 h-3" />
                          <span>2 new this month</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Sales */}
                    <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-slate-600 transition-colors">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-24 h-24 text-purple-500" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-slate-400 text-sm font-medium mb-1">Recent Sales</p>
                        <h2 className="text-3xl font-bold text-white mb-2">142</h2>
                        <div className="flex items-center gap-1 text-[#00D28A] text-xs font-medium bg-[#00D28A]/10 w-fit px-2 py-1 rounded">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+8% conversion rate</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sales Graph */}
                  <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Sales Analytics</h3>
                        <button className="text-slate-500 hover:text-white text-sm flex items-center gap-1 transition-colors">
                            Detailed Report <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={SALES_DATA}>
                          <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00D28A" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#00D28A" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            stroke="#64748b" 
                            tick={{fontSize: 12}} 
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                          />
                          <YAxis 
                            stroke="#64748b" 
                            tick={{fontSize: 12}} 
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#00D28A', strokeWidth: 1, strokeDasharray: '4 4' }} />
                          <Area 
                            type="monotone" 
                            dataKey="sales" 
                            stroke="#00D28A" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorSales)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Recent Activity Table */}
                  <div className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                        <button className="text-[#00D28A] hover:text-[#00b074] text-sm font-medium transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Asset</th>
                            <th className="px-6 py-4 font-medium">Buyer</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium text-right">Earnings</th>
                            <th className="px-6 py-4 font-medium text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {RECENT_ACTIVITY.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="px-6 py-4">
                                <span className="text-white font-medium block">{item.asset}</span>
                              </td>
                              <td className="px-6 py-4 text-slate-400 text-sm">{item.buyer}</td>
                              <td className="px-6 py-4 text-slate-500 text-sm">{item.date}</td>
                              <td className="px-6 py-4 text-right">
                                <span className="text-[#00D28A] font-bold text-sm">+${(item.price * 0.9).toFixed(2)}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/30 text-green-400 border border-green-900/50">
                                  Completed
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </motion.div>
              )}
              
              {activeTab === 'upload' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <UploadProductForm />
                </motion.div>
              )}

              {/* ADD THIS NEW BLOCK FOR MY PRODUCTS */}
              {activeTab === 'products' && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <MyProductsList />
                </motion.div>
              )}

              {/* UPDATE THIS CONDITION to exclude 'products' */}
              {activeTab !== 'overview' && activeTab !== 'upload' && activeTab !== 'products' && (
                <motion.div
                  key="other"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center h-96 border border-dashed border-slate-800 rounded-xl bg-[#0f1420]/50"
                >
                    <Package className="w-16 h-16 text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                    <p className="text-slate-500">This section is currently under development.</p>
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
