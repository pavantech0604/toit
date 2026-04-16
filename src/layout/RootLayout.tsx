import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileActionBar from './MobileActionBar';
import { motion, AnimatePresence } from 'framer-motion';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-stout flex flex-col selection:bg-brand-amber selection:text-brand-stout overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <MobileActionBar />

      {/* Persistent Decorative Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[9999] bg-grain" />
    </div>
  );
};

export default RootLayout;
