import  { useState } from 'react';
import { Search,  
  Beer, 
  Pizza, 
  Flame, 
  ChevronRight, 
  Send, 
  Receipt,
  User,
  Hash,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const ITEMS = [
  { id: '1', name: 'Toit Weiss', category: 'Brews', price: 325 },
  { id: '2', name: 'Basmati Blonde', category: 'Brews', price: 325 },
  { id: '3', name: 'Dark Knight', category: 'Brews', price: 350 },
  { id: '4', name: 'Tintin Toit', category: 'Brews', price: 350 },
  { id: '5', name: 'Spicy Wings', category: 'Eat', price: 385 },
  { id: '6', name: 'Macho Nachos', category: 'Eat', price: 425 },
  { id: '7', name: 'BBQ Burger', category: 'Eat', price: 545 },
  { id: '8', name: 'Farmhouse Pizza', category: 'Pizza', price: 595 },
];

export default function POSBilling() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [table] = useState('12');
  const [activeTab, setActiveTab] = useState('Brews');

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.qty + delta);
        return { ...i, qty: newQty };
      }
      return i;
    }).filter(i => i.qty > 0));
  };

  

  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const tax = subtotal * 0.18; // 18% GST mock
  const total = subtotal + tax;

  return (
    <div className="h-full flex gap-8 overflow-hidden">
      {/* Items Section */}
      <div className="flex-1 flex flex-col gap-8 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide flex-1">
            {['Brews', 'Eat', 'Pizza', 'Sides', 'Cocktails'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  cat === activeTab 
                    ? 'bg-gold text-base border-gold gold-glow shadow-xl shadow-gold/10' 
                    : 'bg-surface text-smoke border-iron/30 hover:border-ivory/20 hover:text-ivory'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group ml-4">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke group-focus-within:text-gold transition-colors" size={18} />
             <input type="text" placeholder="Quick search..." className="bg-surface border border-iron/30 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:border-gold outline-none w-64 shadow-inner" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-10">
          {ITEMS.filter(i => activeTab === 'All' || i.category === activeTab).map(item => (
            <motion.button 
              key={item.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(item)}
              className="bg-surface border border-iron/30 p-8 rounded-[2.5rem] text-left hover:border-gold/30 gold-glow transition-all relative group overflow-hidden"
            >
              <div className="w-16 h-16 rounded-[1.25rem] bg-base border border-iron/30 flex items-center justify-center mb-6 group-hover:bg-gold/10 group-hover:border-gold/50 group-hover:text-gold transition-all duration-500 relative z-10">
                {item.category === 'Brews' ? <Beer size={28} /> : item.category === 'Pizza' ? <Pizza size={28} /> : <Flame size={28} />}
              </div>
              <h4 className="font-serif font-bold text-lg text-ivory leading-tight mb-2 relative z-10 tracking-tight group-hover:text-gold transition-colors">{item.name}</h4>
              <p className="text-gold font-mono font-black text-xl relative z-10">₹{item.price}</p>
              <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none group-hover:scale-110 duration-700">
                {item.category === 'Brews' ? <Beer size={180} /> : item.category === 'Pizza' ? <Pizza size={180} /> : <Flame size={180} />}
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Plus size={20} strokeWidth={3} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-[420px] bg-surface border border-iron/30 rounded-[3rem] flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-base/10 pointer-events-none" />
        
        <div className="p-10 border-b border-iron/30 flex justify-between items-center relative z-10 bg-base/20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(212,155,53,0.1)]">
              <Hash size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-serif font-black text-xl text-ivory tracking-tight leading-none mb-1">Table {table}</h4>
              <p className="text-[10px] text-smoke uppercase tracking-[0.25em] font-black opacity-80">STATION #01 • ORDER #8921</p>
            </div>
          </div>
          <button className="p-4 bg-base/50 hover:bg-white/5 border border-iron/30 rounded-2xl text-smoke hover:text-gold transition-all"><User size={22} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar relative z-10">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="h-full flex flex-col items-center justify-center text-smoke space-y-6"
              >
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-iron/50 flex items-center justify-center">
                   <Receipt size={48} strokeWidth={1} />
                </div>
                <p className="text-sm font-black uppercase tracking-[0.2em] italic">Awaiting order...</p>
              </motion.div>
            ) : (
              cart.map(item => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex justify-between items-center group"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gold/5 border border-gold/20 flex items-center justify-center text-gold font-black font-mono text-sm group-hover:bg-gold group-hover:text-base transition-all duration-300">
                        {item.qty}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-base text-ivory tracking-tight mb-0.5">{item.name}</h5>
                      <p className="text-[9px] text-smoke font-black uppercase tracking-widest">₹{item.price} UNIT COST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-black text-ivory text-sm">₹{item.price * item.qty}</span>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-gold transition-colors"><Plus size={14} strokeWidth={3} /></button>
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-copper transition-colors"><Minus size={14} strokeWidth={3} /></button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-10 border-t border-iron/30 bg-base/40 relative z-10 backdrop-blur-sm">
          <div className="space-y-3 mb-10">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-smoke">
              <span>Subtotal</span>
              <span className="font-mono text-ivory">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-smoke">
              <span>Station GST (18%)</span>
              <span className="font-mono text-ivory">₹{tax.toFixed(2)}</span>
            </div>
            <div className="h-[1px] bg-iron/20 my-4" />
            <div className="flex justify-between items-end">
              <span className="font-serif font-bold text-xl text-smoke uppercase tracking-tight">Net Bill</span>
              <span className="text-gold font-mono font-black text-4xl drop-shadow-[0_0_15px_rgba(212,155,53,0.3)]">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-5 rounded-2xl bg-base border border-iron/50 text-[10px] font-black uppercase tracking-[0.2em] text-smoke flex items-center justify-center gap-3 hover:text-ivory hover:border-gold/30 transition-all"
            >
              <Send size={18} strokeWidth={2.5} />
              KDS
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-5 rounded-2xl bg-gold text-base text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 gold-glow shadow-xl shadow-gold/20 active:scale-95 transition-all"
            >
              PAYMENT
              <ChevronRight size={18} strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
