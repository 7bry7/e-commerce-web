import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Root = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f12] text-zinc-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};
