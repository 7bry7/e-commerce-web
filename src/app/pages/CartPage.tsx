import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PRODUCTS } from '../data/products';
import { Trash2, CreditCard, Smartphone, Banknote, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

export default function CartPage() {
  // Mock initial cart state with some products
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[0], quantity: 1 },
    { ...PRODUCTS[2], quantity: 1 },
    { ...PRODUCTS[5], quantity: 1 },
  ]);

  const [paymentMethod, setPaymentMethod] = useState('ewallet');
  const [ewalletProvider, setEwalletProvider] = useState('gcash');

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12; // 12% VAT example
  const total = subtotal + tax;

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-300 font-sans selection:bg-[#00D28A]/30 selection:text-[#00D28A]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
          Shopping Cart <span className="text-slate-500 text-lg font-normal ml-2">({cartItems.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-[#0f1420] border border-slate-800 rounded-lg p-4 flex gap-4 md:gap-6 items-center group hover:border-slate-700 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-slate-900 rounded-md overflow-hidden border border-slate-800">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <Link to={`/product/${item.id}`} className="text-white font-medium hover:text-[#00D28A] truncate transition-colors">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#00D28A] whitespace-nowrap ml-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">by {item.creator}</p>
                      <p className="text-xs text-slate-500 mb-3">{item.category}</p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls - Note: For digital items quantity is usually 1, but added for completeness */}
                        <div className="flex items-center bg-slate-900 rounded border border-slate-800">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-white disabled:opacity-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center text-xs text-slate-500 hover:text-red-400 transition-colors gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 border border-dashed border-slate-800 rounded-lg">
                  <p className="text-slate-500 mb-4">Your cart is empty.</p>
                  <Link to="/" className="text-[#00D28A] hover:underline">Continue Shopping</Link>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-[#0f1420] border border-slate-800 rounded-lg p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (12%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-slate-800 my-4" />
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#00D28A]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6 space-y-3">
                  <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Payment Method</h3>
                  
                  {/* Option: eWallet */}
                  <div 
                    onClick={() => setPaymentMethod('ewallet')}
                    className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-all ${
                      paymentMethod === 'ewallet' 
                        ? 'border-[#00D28A] bg-[#00D28A]/5' 
                        : 'border-slate-800 hover:border-slate-600 bg-slate-900'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'ewallet' ? 'border-[#00D28A]' : 'border-slate-600'
                    }`}>
                      {paymentMethod === 'ewallet' && <div className="w-2 h-2 rounded-full bg-[#00D28A]" />}
                    </div>
                    <Smartphone className={`w-5 h-5 ${paymentMethod === 'ewallet' ? 'text-[#00D28A]' : 'text-slate-500'}`} />
                    <span className={paymentMethod === 'ewallet' ? 'text-white' : 'text-slate-400'}>eWallet</span>
                  </div>

                  {/* Option: Card */}
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-[#00D28A] bg-[#00D28A]/5' 
                        : 'border-slate-800 hover:border-slate-600 bg-slate-900'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-[#00D28A]' : 'border-slate-600'
                    }`}>
                      {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#00D28A]" />}
                    </div>
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-[#00D28A]' : 'text-slate-500'}`} />
                    <span className={paymentMethod === 'card' ? 'text-white' : 'text-slate-400'}>Credit/Debit Card</span>
                  </div>

                  {/* Option: COD */}
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-[#00D28A] bg-[#00D28A]/5' 
                        : 'border-slate-800 hover:border-slate-600 bg-slate-900'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'cod' ? 'border-[#00D28A]' : 'border-slate-600'
                    }`}>
                      {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-[#00D28A]" />}
                    </div>
                    <Banknote className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-[#00D28A]' : 'text-slate-500'}`} />
                    <span className={paymentMethod === 'cod' ? 'text-white' : 'text-slate-400'}>Cash on Delivery</span>
                  </div>
                </div>

                {/* Dynamic Payment Fields */}
                <div className="mb-8">
                  <AnimatePresence mode="wait">
                    {paymentMethod === 'ewallet' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex gap-2 mb-2">
                          <button 
                            onClick={() => setEwalletProvider('gcash')}
                            className={`flex-1 py-2 text-xs font-bold rounded border ${
                              ewalletProvider === 'gcash' 
                                ? 'bg-blue-600 border-blue-500 text-white' 
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            GCash
                          </button>
                          <button 
                            onClick={() => setEwalletProvider('paymaya')}
                            className={`flex-1 py-2 text-xs font-bold rounded border ${
                              ewalletProvider === 'paymaya' 
                                ? 'bg-green-600 border-green-500 text-white' 
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            PayMaya
                          </button>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400">Mobile Number</label>
                            <input 
                                type="text" 
                                placeholder="09XX XXX XXXX" 
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-white focus:border-[#00D28A] focus:outline-none transition-colors"
                            />
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === 'card' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400">Card Number</label>
                            <input 
                                type="text" 
                                placeholder="0000 0000 0000 0000" 
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-white focus:border-[#00D28A] focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex gap-3">
                            <div className="space-y-1 flex-1">
                                <label className="text-xs text-slate-400">Expiry</label>
                                <input 
                                    type="text" 
                                    placeholder="MM/YY" 
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-white focus:border-[#00D28A] focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-1 flex-1">
                                <label className="text-xs text-slate-400">CVC</label>
                                <input 
                                    type="text" 
                                    placeholder="123" 
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-white focus:border-[#00D28A] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === 'cod' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-900/50 p-3 rounded border border-slate-800 text-xs text-slate-400 leading-relaxed"
                      >
                        <p>You will pay for this order upon delivery or at a designated payment center. Please ensure your contact details are up to date.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-[#00D28A] hover:bg-[#00b074] text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-[0_0_20px_rgba(0,210,138,0.2)]">
                  Proceed to Payment <ArrowRight className="w-5 h-5" />
                </button>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Encrypted Transaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
