import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Utensils, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileActionBar: React.FC = () => {
  const location = useLocation();

  const actions = [
    { name: 'Menu', icon: Utensils, path: '/menu' },
    { name: 'Book', icon: Calendar, path: '/reservations', primary: true },
    { name: 'Order', icon: ShoppingBag, path: '/order' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="container mx-auto max-w-sm pointer-events-auto">
        <div className="bg-brand-charcoal/90 backdrop-blur-2xl border border-brand-iron/30 rounded-full px-2 py-2 flex items-center justify-between shadow-2xl">
          {actions.map((action) => {
            const Icon = action.icon;
            const isActive = location.pathname === action.path;

            if (action.primary) {
              return (
                <Link key={action.name} to={action.path} className="relative z-10 -mt-10">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-brand-amber rounded-full flex items-center justify-center text-brand-stout shadow-[0_10px_40px_rgba(212,155,53,0.5)] border-4 border-brand-stout amber-glow"
                  >
                    <Icon size={28} strokeWidth={3} />
                  </motion.button>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-amber whitespace-nowrap">
                    {action.name}
                  </span>
                </Link>
              );
            }

            return (
              <Link 
                key={action.name} 
                to={action.path} 
                className={`flex flex-col items-center gap-1 px-8 py-2 rounded-full transition-all ${
                  isActive ? 'text-brand-amber' : 'text-brand-smoke'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">{action.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileActionBar;
