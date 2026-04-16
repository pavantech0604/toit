import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import Button from '../components/ui/Button';

const locations = [
  {
    city: 'Indiranagar',
    name: 'Toit Bangalore',
    address: '298, 100 Feet Road, Near KFC Restaurant, Indiranagar II Stage, Bengaluru, Karnataka 560038',
    hours: '12:00 PM - 01:00 AM',
    phone: '+91 90197 13388',
    tag: 'BREWPUB',
  },
  {
    city: 'Pune',
    name: 'Toit Pune',
    address: 'Kalyani Nagar, Final Plot No 88, Near Trump Towers, Pune, Maharashtra 411006',
    hours: '12:00 PM - 01:30 AM',
    phone: '+91 77769 49789',
    tag: 'BREWPUB',
  },
  {
    city: 'Mumbai',
    name: 'Toit Mumbai',
    address: 'Mathuradas Mill Compound, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013',
    hours: '12:00 PM - 01:00 AM',
    phone: '+91 93245 55223',
    tag: 'TAPROOM',
  }
];

const BeerFinder: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-ivory pt-24 md:pt-[100px] flex flex-col md:flex-row">
      {/* Left Column: Location List */}
      <div className="w-full md:w-[45%] lg:w-[40%] h-auto md:h-[calc(100vh-100px)] overflow-y-auto px-6 py-12 md:pl-12 lg:pl-20 border-r border-brand-maroon/10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-black text-brand-maroon uppercase tracking-tighter shadow-sm drop-shadow-sm leading-tight">
            Find Our Beer.
          </h1>
          <p className="mt-4 text-brand-stout/60 font-brand">Select a location to view directions or book a table.</p>
        </motion.div>

        <div className="space-y-8">
          {locations.map((loc, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              key={loc.city} 
              className="bg-white/40 border border-brand-maroon/10 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              {/* Highlight bar */}
              <div className="absolute left-0 top-0 w-1 h-full bg-brand-maroon opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-brand-maroon/50">{loc.city}</span>
                <div className="w-8 h-[1px] bg-brand-maroon/20" />
                <span className="text-[10px] font-black tracking-wider text-brand-gold bg-brand-maroon px-2 py-1 rounded-sm shadow-sm">{loc.tag}</span>
              </div>
              
              <h3 className="text-3xl font-heading font-black text-brand-maroon mb-4 group-hover:text-brand-amber transition-colors">
                {loc.name}
              </h3>
              
              <div className="space-y-3 mb-8 text-sm md:text-base text-brand-stout/80 font-brand font-medium">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-brand-maroon mt-1 shrink-0" />
                  <p className="leading-relaxed">{loc.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock size={18} className="text-brand-maroon shrink-0" />
                  <p>{loc.hours}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={18} className="text-brand-maroon shrink-0" />
                  <p>{loc.phone}</p>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row gap-4 border-t border-brand-maroon/10 pt-6">
                <Button variant="outline" className="flex-1 justify-center border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-brand-ivory text-xs px-2 rounded-full h-12 uppercase tracking-widest">
                  <Navigation size={14} className="mr-2" /> Directions
                </Button>
                <Button variant="maroon" className="flex-1 justify-center bg-brand-maroon text-brand-ivory hover:bg-black text-xs px-2 rounded-full h-12 uppercase tracking-widest">
                  <Phone size={14} className="mr-2" /> Call Us
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column: Stylized Map Placeholder */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-[50vh] md:h-[calc(100vh-100px)] relative bg-brand-ivory overflow-hidden flex items-center justify-center">
        {/* Background Grid Pattern for Map Vibe */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#A7240E 1px, transparent 1px), linear-gradient(90deg, #A7240E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 text-center space-y-6">
          <div className="w-20 h-20 bg-brand-maroon/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto animate-pulse">
            <MapPin size={40} className="text-brand-maroon" />
          </div>
          <div className="bg-white/80 p-4 rounded-md shadow-lg border border-brand-maroon/20">
            <p className="font-heading text-brand-maroon font-black uppercase tracking-widest text-sm">Location Directory</p>
            <p className="text-xs text-brand-stout mt-1 font-brand">Interactive map loading seamlessly...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerFinder;
