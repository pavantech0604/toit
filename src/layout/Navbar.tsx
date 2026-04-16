import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import toitLogo from '../assets/toit-logo.png';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'About Toit', path: '/about' },
    { 
      name: 'Beer', 
      submenu: [
        'Basmati Blonde', 'Tint-In-Wit', 'Nitro Stout', 'The Dark Knight Stout', 'India Pale Ale', 'Banger Lager', 'Red Ale', 'Hefeweizen'
      ] 
    },
    { name: 'Brewery Tour', path: '/brewery-tour' },
    { name: 'Partner Bars', path: '/partner-bars' },
    { 
      name: 'Brewpubs & Taprooms', 
      submenu: [
        'Toit Bangalore', 'Toit Pune', 'Toit Mumbai'
      ] 
    },
    { name: 'Toit Merchandise', path: '/merchandise' },
    { name: 'Careers', path: '/careers' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 h-[100px] flex items-center ${
        isScrolled ? 'bg-brand-ivory shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="w-full px-6 lg:px-[110px] grid grid-cols-3 items-center">
          
          {/* Left: BEER FINDER - 1:1 Official Match */}
          <div className="flex justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/beer-finder">
                <button className={`px-8 py-3 rounded-full text-[10px] font-brand font-black uppercase tracking-[0.2em] border transition-all ${
                  isScrolled 
                  ? 'bg-brand-maroon text-brand-ivory border-brand-maroon hover:bg-brand-gold hover:border-brand-gold' 
                  : 'bg-brand-ivory text-brand-maroon border-transparent hover:bg-white'
                }`}>
                  Beer Finder
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Center: Official Logo Legend */}
          <div className="flex justify-center flex-1">
            <Link to="/" className="group relative flex items-center gap-6">
              <span className={`hidden lg:block text-[9px] font-brand font-black uppercase tracking-[0.6em] mt-2 transition-colors duration-700 ${
                isScrolled ? 'text-brand-maroon opacity-40' : 'text-brand-gold'
              }`}>
                Sending
              </span>
              <div className="relative">
                 {/* Glow Effect */}
                 <div className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                   isScrolled ? 'bg-brand-maroon/10' : 'bg-brand-amber/20'
                 }`} />
                 <img 
                  src={toitLogo} 
                  alt="Toit" 
                  className={`h-16 md:h-20 w-auto transition-all duration-700 group-hover:scale-110 relative z-10 ${
                    isScrolled ? 'brightness-0 contrast-200' : ''
                  }`} 
                />
              </div>
              <span className={`hidden lg:block text-[9px] font-brand font-black uppercase tracking-[0.6em] mt-2 transition-colors duration-700 ${
                isScrolled ? 'text-brand-maroon opacity-40' : 'text-brand-gold'
              }`}>
                Since 2010
              </span>
            </Link>
          </div>

          {/* Right: Reservations & Hamburger - 1:1 Style */}
          <div className="flex justify-end items-center gap-12">
            <Link 
              to="/reservations" 
              className={`hidden md:block text-[13px] font-brand uppercase tracking-[0.3em] font-black transition-colors duration-700 ${
                isScrolled ? 'text-brand-maroon hover:text-brand-gold' : 'text-brand-ivory hover:text-brand-gold'
              }`}
            >
              Reservations
            </Link>
            
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className={`transition-opacity flex flex-col gap-1.5 hover:opacity-70 ${
                isScrolled ? 'text-brand-maroon' : 'text-brand-ivory'
              }`}
            >
               <div className="w-8 h-[2px] bg-current" />
               <div className="w-8 h-[2px] bg-current" />
            </button>
          </div>
        </div>
      </nav>

      {/* Official Parchment Sidebar Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-parchment z-[70] shadow-[-20px_0_60px_rgba(0,0,0,0.3)] overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-10 flex justify-end items-center">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-brand-maroon hover:rotate-180 transition-transform duration-500"
                >
                  <X size={32} strokeWidth={1} />
                </button>
              </div>

              {/* Drawer Links - 1:1 Title Case Parchment Experience */}
              <div className="px-16 pb-20 space-y-12">
                {menuItems.map((item) => (
                  <div key={item.name} className="space-y-6">
                    <div className="flex items-center justify-between group">
                      {item.path ? (
                        <Link
                          to={item.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className="text-4xl font-brand font-black text-brand-maroon hover:opacity-60 transition-all leading-tight"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                          className="text-4xl font-brand font-black text-brand-maroon hover:opacity-60 transition-all text-left flex items-center justify-between w-full leading-tight"
                        >
                          {item.name}
                          <ChevronDown size={28} className={`transition-transform duration-500 text-brand-maroon/30 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {item.submenu && activeSubmenu === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, x: 20 }}
                          animate={{ height: 'auto', opacity: 1, x: 0 }}
                          exit={{ height: 0, opacity: 0, x: 20 }}
                          className="pl-4 space-y-4 overflow-hidden border-l border-brand-maroon/10"
                        >
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub}
                              to={`/explore/${sub.toLowerCase().replace(/ /g, '-')}`}
                              onClick={() => setIsDrawerOpen(false)}
                              className="block text-[15px] text-brand-maroon/60 hover:text-brand-maroon transition-all font-brand font-bold"
                            >
                              {sub}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Drawer Foot */}
              <div className="px-16 py-12 border-t border-brand-maroon/5 mt-auto">
                 <div className="flex gap-4 text-brand-maroon/40 text-[10px] uppercase font-black tracking-widest">
                    <span>Follow Us</span>
                    <div className="w-12 h-[1px] bg-brand-maroon/10 self-center" />
                    <span>@toitbrewpub</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
