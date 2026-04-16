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
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-serif font-bold text-ivory">Menu Repository</h3>
          <p className="text-smoke text-sm">Managing live tap lists and kitchen inventory</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-base border border-iron/30 text-smoke px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-ivory hover:border-ivory/30 transition-all">
            <Settings2 size={16} />
            Bulk Actions
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gold text-base px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 gold-glow shadow-lg shadow-gold/10"
          >
            <Plus size={16} strokeWidth={3} />
            Add To Menu
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-black text-smoke uppercase tracking-[0.2em] mb-4 ml-2">Categories</h4>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all relative overflow-hidden group border ${
                activeCategory === cat.id 
                  ? 'bg-gold text-base border-gold shadow-xl shadow-gold/10' 
                  : 'bg-surface text-smoke border-iron/30 hover:border-gold/30 hover:text-ivory'
              }`}
            >
              <cat.icon size={18} strokeWidth={activeCategory === cat.id ? 2.5 : 2} />
              <span className="font-bold text-xs uppercase tracking-tight">{cat.label}</span>
              <span className={`ml-auto font-mono text-[10px] ${activeCategory === cat.id ? 'opacity-80' : 'text-zinc-600'}`}>
                {items.filter(i => cat.id === 'all' || i.category === cat.id).length.toString().padStart(2, '0')}
              </span>
              {activeCategory === cat.id && (
                <motion.div 
                  layoutId="cat-active"
                  className="absolute inset-0 bg-gold -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`bg-surface border p-6 rounded-[2rem] transition-all relative overflow-hidden group ${
                    item.inStock ? 'border-iron/30' : 'border-copper/30 bg-copper/[0.02]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-smoke group-hover:text-gold transition-colors">{item.category}</span>
                        {!item.inStock && (
                          <span className="flex items-center gap-1 text-[8px] font-black uppercase bg-copper/10 text-copper px-2 py-0.5 rounded border border-copper/20">
                            <AlertTriangle size={8} /> Sold Out
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-xl mt-1 text-ivory tracking-tight">{item.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-gold font-mono font-black text-lg">₹{item.price}</div>
                      <button 
                        onClick={() => toggleStock(item.id)}
                        className={`mt-3 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest transition-all px-2 py-1 rounded-full border ${
                          item.inStock 
                            ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' 
                            : 'text-copper border-copper/20 bg-copper/5'
                        }`}
                      >
                        {item.inStock ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                        {item.inStock ? 'Live' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-smoke font-sans leading-relaxed line-clamp-2 pr-8">{item.description}</p>
                  
                  <div className="mt-6 pt-5 border-t border-iron/10 flex gap-3 relative z-10">
                    <button className="flex-1 py-2.5 rounded-xl bg-base border border-iron/30 text-[10px] font-black uppercase tracking-widest text-smoke hover:text-ivory hover:border-ivory/20 transition-all">Edit Specs</button>
                    <button className="px-3 rounded-xl bg-base border border-iron/30 text-smoke hover:text-copper transition-all">
                      <Plus size={14} className="rotate-45" />
                    </button>
                  </div>

                  {/* Aesthetic Background flourish */}
                  <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                     {item.category === 'Brews' ? <Beer size={120} /> : item.category === 'Pizzas' ? <Pizza size={120} /> : <Flame size={120} />}
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
