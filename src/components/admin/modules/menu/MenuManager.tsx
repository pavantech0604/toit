import { Search } from 'lucide-react';
import  { useState } from 'react';
import { 
  Beer, 
  Pizza, 
  Flame, 
  Filter, 
  Plus, 
  Settings2,
  AlertTriangle,
  ToggleRight,
  ToggleLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  description: string;
}

const MOCK_MENU: MenuItem[] = [
  { id: '1', name: 'Toit Weiss', category: 'Brews', price: 325, inStock: true, description: 'Classic Hefeweizen' },
  { id: '2', name: 'Basmati Blonde', category: 'Brews', price: 325, inStock: true, description: 'Light & Floral' },
  { id: '3', name: 'Dark Knight', category: 'Brews', price: 350, inStock: false, description: 'Nitro Stout' },
  { id: '4', name: 'Sourdough Pizza (Margherita)', category: 'Pizzas', price: 495, inStock: true, description: 'Fresh Mozzarella, Basil' },
  { id: '5', name: 'Spicy Wings', category: 'Starters', price: 385, inStock: true, description: 'Habanero Glaze' },
  { id: '6', name: 'Macho Nachos', category: 'Starters', price: 425, inStock: true, description: 'Loaded with Cheese & Jalapeños' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: Filter },
  { id: 'Brews', label: 'Brews', icon: Beer },
  { id: 'Starters', label: 'Starters', icon: Flame },
  { id: 'Pizzas', label: 'Pizzas', icon: Pizza },
];

export default function MenuManager() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState(MOCK_MENU);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStock = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      <div className="flex justify-between items-end bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="relative z-10">
          <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic">Menu Repository</h3>
          <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
            <div className="w-4 h-[1px] bg-brand-maroon/20" />
            Live Tap List & Industrial Inventory
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <button className="bg-brand-maroon/5 border-2 border-brand-maroon/10 text-brand-maroon/60 px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-brand-maroon hover:border-brand-maroon transition-all">
            <Settings2 size={16} strokeWidth={3} />
            Bulk Actions
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-brand-maroon text-brand-ivory px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-brand-maroon/20 border-2 border-brand-maroon"
          >
            <Plus size={18} strokeWidth={3} />
            New Entry
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6 ml-2">
            <div className="h-[2px] w-4 bg-brand-gold" />
            <h4 className="text-[10px] font-black text-brand-maroon/40 uppercase tracking-[0.3em]">Sections</h4>
          </div>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-sm transition-all relative overflow-hidden group border-2 ${
                activeCategory === cat.id 
                  ? 'bg-brand-maroon text-brand-ivory border-brand-maroon shadow-lg translate-x-1' 
                  : 'bg-white/40 text-brand-maroon/60 border-brand-maroon/5 hover:border-brand-maroon/20 hover:text-brand-maroon'
              }`}
            >
              <cat.icon size={18} strokeWidth={3} />
              <span className="font-black text-[11px] uppercase tracking-[0.2em]">{cat.label}</span>
              <span className={`ml-auto font-mono text-[10px] font-black ${activeCategory === cat.id ? 'text-brand-gold' : 'text-brand-maroon/20'}`}>
                {items.filter(i => cat.id === 'all' || i.category === cat.id).length.toString().padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        {/* Items Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke group-focus-within:text-gold transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Filter by dish, brew, or profile..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-iron/30 rounded-2xl pl-12 pr-4 py-4 text-sm text-ivory outline-none focus:border-gold/50 shadow-inner transition-all placeholder:text-zinc-600 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`bg-white/80 backdrop-blur-md border-2 p-8 rounded-sm transition-all relative overflow-hidden group shadow-sm hover:shadow-md ${
                    item.inStock ? 'border-brand-maroon/5' : 'border-brand-gold/30 bg-brand-gold/5'
                  }`}
                >
                   {/* Ledger texture */}
                   <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-maroon/30 group-hover:text-brand-gold transition-colors">{item.category}</span>
                        {!item.inStock && (
                          <span className="flex items-center gap-2 text-[8px] font-black uppercase bg-brand-gold text-brand-maroon px-2 py-1 rounded-sm shadow-sm">
                            <AlertTriangle size={10} strokeWidth={3} /> Depleted
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-black text-2xl mt-2 text-brand-maroon tracking-tighter uppercase italic leading-none">{item.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-brand-maroon font-mono font-black text-xl tracking-tighter italic">₹{item.price}</div>
                      <button 
                        onClick={() => toggleStock(item.id)}
                        className={`mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] transition-all px-3 py-1.5 rounded-sm border-2 ${
                          item.inStock 
                            ? 'text-emerald-700 border-emerald-700/20 bg-emerald-50' 
                            : 'text-brand-maroon border-brand-maroon/20 bg-brand-maroon/5'
                        }`}
                      >
                        {item.inStock ? <ToggleRight size={18} strokeWidth={3} /> : <ToggleLeft size={18} strokeWidth={3} />}
                        {item.inStock ? 'AVAILABLE' : 'OFF MENU'}
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-maroon/60 font-black uppercase tracking-wider leading-relaxed line-clamp-2 pr-12 italic">"{item.description}"</p>
                  
                  <div className="mt-8 pt-6 border-t border-brand-maroon/10 flex gap-4 relative z-10">
                    <button className="flex-1 py-3 rounded-sm bg-brand-maroon/5 border border-brand-maroon/10 text-[10px] font-black uppercase tracking-[0.3em] text-brand-maroon/40 hover:text-brand-maroon hover:border-brand-maroon transition-all italic">Edit Registry</button>
                    <button className="w-10 h-10 rounded-full bg-brand-maroon/5 border border-brand-maroon/10 flex items-center justify-center text-brand-maroon/20 hover:text-brand-maroon hover:border-brand-maroon transition-all">
                      <Plus size={14} className="rotate-45" />
                    </button>
                  </div>

                  <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none group-hover:scale-110">
                     {item.category === 'Brews' ? <Beer size={140} /> : item.category === 'Pizzas' ? <Pizza size={140} /> : <Flame size={140} />}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
