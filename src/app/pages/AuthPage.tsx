import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github, Disc } from 'lucide-react';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans text-white">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden relative z-10"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-zinc-400 text-sm">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Join the community of digital creators'}
            </p>
          </div>

          {/* Social Buttons */}
          <div className="px-8 pb-6 flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors border border-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.536-6.033-5.696  c0-3.159,2.702-5.696,6.033-5.696c1.482,0,2.831,0.499,3.899,1.326l2.863-2.863C17.478,3.582,15.163,2.5,12.545,2.5  C7.295,2.5,3.018,6.883,3.018,12.266c0,5.382,4.277,9.766,9.527,9.766c5.212,0,8.918-3.483,8.918-9.033  c0-0.672-0.081-1.319-0.207-1.928H12.545z"/>
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors border border-zinc-700">
              <Disc className="w-5 h-5 text-indigo-400" />
              Discord
            </button>
          </div>

          <div className="px-8 flex items-center gap-4 mb-6">
            <div className="h-px bg-zinc-800 flex-1" />
            <span className="text-xs text-zinc-500 font-medium uppercase">Or continue with</span>
            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          {/* Form Fields */}
          <div className="px-8 pb-8 space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1.5 mb-4">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Username</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Choose a username"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-medium text-zinc-400">Password</label>
                {isLogin && (
                  <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 mt-2 group">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Footer / Toggle */}
          <div className="bg-zinc-950/50 border-t border-zinc-800 p-4 text-center">
            <p className="text-sm text-zinc-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
