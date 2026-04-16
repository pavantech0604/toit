import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toitLogo from '../assets/toit-logo.png';

// --- Sub-Component: Reservations Modal (1:1 Heritage Design) ---
const ReservationsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const taprooms = [
    { name: 'Toit Bangalore', loc: 'Indiranagar', email: 'toitblr@toit.in' },
    { name: 'Toit Bangalore', loc: 'Mahadevapura', email: 'toitblr.east@toit.in' },
    { name: 'Toit Pune', loc: 'Kalyani Nagar', email: 'toitpune@toit.in' },
    { name: 'Toit Mumbai', loc: 'Lower Parel', email: 'toitmumbai@toit.in' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-maroon/90 backdrop-blur-md cursor-pointer" 
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-5xl bg-[#fdfcf9] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row min-h-[500px]"
          >
            {/* Textured Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />

            {/* Left Image / Branding Column */}
            <div className="w-full md:w-1/3 bg-brand-maroon p-12 flex flex-col justify-between relative">
               <div className="space-y-4">
                 <img src={toitLogo} alt="Toit" className="w-20 brightness-0 invert opacity-40" />
                 <h2 className="text-4xl font-heading font-black text-brand-ivory italic leading-tight pt-10">Make a <br/> Reservation</h2>
                 <p className="text-[10px] text-brand-ivory/40 uppercase tracking-[0.4em] font-black">Sending it since 2010</p>
               </div>
               <div className="pt-12">
                  <div className="w-12 h-1 bg-brand-gold/30" />
                  <p className="pt-4 text-xs text-brand-ivory/60 leading-relaxed font-brand font-bold uppercase tracking-widest">Select your preferred neighborhood brewpub to begin.</p>
               </div>
            </div>

            {/* Right Taproom Grid Column */}
            <div className="w-full md:w-2/3 p-8 md:p-16 relative z-10 flex flex-col justify-center">
               <button 
                  onClick={onClose} 
                  className="absolute top-6 right-6 text-brand-maroon/20 hover:text-brand-maroon transition-colors group"
                >
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <span className="absolute text-5xl font-serif rotate-12 group-hover:rotate-45 transition-transform duration-500">✕</span>
                    <span className="absolute text-4xl font-serif -rotate-12 group-hover:-rotate-45 transition-transform duration-500 opacity-40">✕</span>
                  </div>
               </button>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {taprooms.map((tap, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group cursor-pointer p-6 border border-brand-maroon/5 bg-white shadow-sm hover:shadow-xl hover:border-brand-maroon/20 transition-all duration-500"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-brand-maroon/40 font-black uppercase tracking-[0.3em] group-hover:text-brand-gold transition-colors">{tap.loc}</span>
                        <h3 className="text-xl font-heading font-black text-brand-maroon uppercase tracking-tight">{tap.name}</h3>
                        <div className="w-8 h-[1.5px] bg-brand-maroon/10 my-3 group-hover:w-full transition-all duration-700" />
                        <Link to="/reservations" className="text-[11px] font-black uppercase tracking-widest text-brand-maroon group-hover:text-brand-gold flex items-center gap-2">
                           Book Now <span>→</span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
               </div>
               
               <p className="mt-12 text-[10px] text-center text-brand-maroon/30 font-black uppercase tracking-[0.3em]">Reservations are subject to availability and house rules.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReservationsModalOpen, setIsReservationsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navSpring: any = {
    type: "spring",
    stiffness: 100,
    damping: 30,
    mass: 1
  };

  return (
    <>
      <motion.nav 
        initial={false}
        animate={{
          height: isScrolled ? 90 : 100,
          backgroundColor: isScrolled ? 'rgba(253, 252, 249, 0.4)' : 'rgba(253, 252, 249, 0)',
          backdropFilter: isScrolled ? 'blur(24px)' : 'blur(0px)',
          borderBottomColor: isScrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : '0 0px 0px rgba(0, 0, 0, 0)'
        }}
        transition={navSpring}
        className="fixed top-0 left-0 right-0 z-50 flex items-center border-b"
      >
        <div className="w-full px-6 lg:px-[110px] grid grid-cols-3 items-center">
          
          <div className="flex justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/beer-finder">
                <motion.button 
                  animate={{
                    borderColor: isScrolled ? '#6B0E0E' : '#6B0E0E',
                    color: isScrolled ? '#6B0E0E' : '#6B0E0E',
                    backgroundColor: isScrolled ? 'rgba(253, 252, 249, 0)' : 'rgba(253, 252, 249, 1)'
                  }}
                  className={`px-6 py-2 rounded-full text-[11px] md:text-[13px] font-brand font-black uppercase tracking-[0.1em] transition-all shadow-sm border-2 hover:bg-[#6B0E0E] hover:text-[#f9f8f4]`}
                >
                  Beer Finder
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <div className="flex justify-center flex-1">
            <Link to="/" className="group relative flex items-center justify-center">
              <motion.div 
                animate={{
                  y: isScrolled ? 4 : 8,
                  scale: isScrolled ? 0.55 : 1
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative"
              >
                 <div className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                   isScrolled ? 'bg-brand-maroon/10' : 'bg-brand-amber/20'
                 }`} />
                 <img 
                  src={toitLogo} 
                  alt="Toit" 
                  className={`w-auto relative z-10 origin-top h-24 md:h-[90px]`} 
                />
              </motion.div>
            </Link>
          </div>

          <div className="flex justify-end items-center gap-6 md:gap-10">
            <motion.button 
              onClick={() => setIsReservationsModalOpen(true)}
              animate={{
                color: isScrolled ? '#6B0E0E' : '#f9f8f4'
              }}
              className={`hidden md:block text-[12px] md:text-[13px] font-brand uppercase tracking-[0.2em] font-black drop-shadow-md hover:text-brand-amber cursor-pointer transition-colors`}
            >
              Reservations
            </motion.button>
            
            <motion.button 
              onClick={() => setIsDrawerOpen(true)}
              animate={{
                color: isScrolled ? '#6B0E0E' : '#f9f8f4'
              }}
              className={`transition-opacity flex flex-col gap-[5px] hover:opacity-70`}
            >
               <div className="w-8 h-[2px] bg-current" />
               <div className="w-8 h-[2px] bg-current" />
               <div className="w-8 h-[2px] bg-current" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Reservations Modal Component */}
      <ReservationsModal 
        isOpen={isReservationsModalOpen} 
        onClose={() => setIsReservationsModalOpen(false)} 
      />

      {/* 1:1 Side Navigation Drawer Restoration */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end"
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="w-full max-w-[420px] h-full bg-[#fdfcf9] shadow-[-20px_0_50px_rgba(0,0,0,0.2)] relative flex flex-col pt-24 pb-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Parchment Texture Overlay (Matching Screenshot) */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

              {/* Simple Thin X Close Button (Matching Screenshot) */}
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-8 right-8 text-black/40 hover:text-black transition-colors"
                aria-label="Close menu"
              >
                <span className="text-[32px] leading-none font-thin">✕</span>
              </button>

              <div className="flex flex-col h-full relative z-10 pl-12 pr-6">
                <nav className="flex flex-col gap-y-6">
                  {[
                    { name: 'About', hasDropdown: false },
                    { name: 'Beer', hasDropdown: true },
                    { name: 'Cider', hasDropdown: false },
                    { name: 'Brewpubs & Taprooms', hasDropdown: true },
                    { name: 'Partnerships', hasDropdown: false },
                    { name: 'Blog', hasDropdown: false },
                    { name: 'Frequently Asked Questions', hasDropdown: false },
                    { name: 'Contact', hasDropdown: false },
                    { name: 'Admin Access', hasDropdown: false, to: '/admin' },
                  ].map((item) => (
                    <Link 
                      key={item.name}
                      to={item.to || "#"} 
                      className="text-[24px] font-black tracking-tighter leading-tight text-[#6B0E0E] hover:text-[#D49B35] transition-colors inline-flex items-center gap-3 group"
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <span className="text-[12px] opacity-80">▼</span>
                      )}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-10 border-t border-brand-maroon/10">
                   <div className="flex flex-col gap-8">


                      <div className="flex flex-col gap-4">
                        <p className="text-[10px] font-brand uppercase tracking-[0.4em] font-black text-brand-maroon/40">Connect with us</p>
                        <div className="flex gap-4">
                          {['FB', 'IG', 'TW', 'YT'].map(social => (
                            <div key={social} className="w-8 h-8 rounded-full border border-brand-maroon/20 flex items-center justify-center text-[10px] font-black text-brand-maroon hover:bg-brand-maroon hover:text-[#fdfcf9] transition-all cursor-pointer">
                              {social}
                            </div>
                          ))}
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
