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
          <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide flex-1">
            {['Brews', 'Eat', 'Pizza', 'Sides', 'Cocktails'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                  cat === activeTab 
                    ? 'bg-brand-maroon text-brand-ivory border-brand-maroon shadow-xl' 
                    : 'bg-white/40 text-brand-maroon border-brand-maroon/20 hover:border-brand-maroon hover:bg-brand-maroon/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group ml-4">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-maroon/40 group-focus-within:text-brand-maroon transition-colors" size={18} />
             <input type="text" placeholder="Search Inventory..." className="bg-white/40 border-2 border-brand-maroon/10 rounded-sm pl-12 pr-4 py-4 text-sm font-black uppercase tracking-widest focus:border-brand-maroon outline-none w-72 placeholder:text-brand-maroon/20" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-10">
          {ITEMS.filter(i => activeTab === 'All' || i.category === activeTab).map(item => (
            <motion.button 
              key={item.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(item)}
              className="bg-white/60 backdrop-blur-sm border border-brand-maroon/10 p-8 rounded-sm text-center hover:border-brand-gold/50 transition-all relative group overflow-hidden shadow-sm"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-brand-maroon/5 border border-brand-maroon/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/50 group-hover:text-brand-gold transition-all duration-500 relative z-10">
                {item.category === 'Brews' ? <Beer size={32} /> : item.category === 'Pizza' ? <Pizza size={32} /> : <Flame size={32} />}
              </div>
              <h4 className="font-heading font-black text-xl text-brand-maroon leading-none mb-3 relative z-10 tracking-tighter uppercase italic">{item.name}</h4>
              <p className="text-brand-gold font-mono font-black text-2xl relative z-10">₹{item.price}</p>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                <Plus size={16} className="text-brand-gold" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Cart Section: The Parchment Ledger */}
      <div className="w-[450px] bg-[#fdfcf9] border-l-4 border-double border-brand-maroon/20 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
        {/* Parchment Texture */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        
        <div className="p-10 border-b border-brand-maroon/10 flex justify-between items-center relative z-10 bg-white/40">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-maroon/5 border-2 border-brand-maroon/20 flex items-center justify-center text-brand-maroon shadow-sm">
              <Hash size={24} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-heading font-black text-2xl text-brand-maroon tracking-tighter leading-none mb-1 italic">TABLE {table}</h4>
              <p className="text-[9px] text-brand-maroon/40 uppercase tracking-[0.4em] font-black">STATION #01 • LEDGER-042</p>
            </div>
          </div>
          <button className="w-12 h-12 rounded-full border border-brand-maroon/10 flex items-center justify-center text-brand-maroon/40 hover:text-brand-maroon transition-colors"><User size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar relative z-10">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="h-full flex flex-col items-center justify-center text-brand-maroon/20 space-y-4"
              >
                <div className="w-24 h-24 rounded-full border-2 border-brand-maroon/10 flex items-center justify-center">
                   <Receipt size={40} strokeWidth={1} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] italic">Open Check Ledger</p>
              </motion.div>
            ) : (
              cart.map(item => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex justify-between items-start group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-brand-maroon/5 border border-brand-maroon/10 flex items-center justify-center text-brand-maroon font-black font-mono text-xs">
                      {item.qty}
                    </div>
                    <div>
                      <h5 className="font-brand font-black text-sm text-brand-maroon tracking-tight mb-1 uppercase leading-none">{item.name}</h5>
                      <p className="text-[9px] text-brand-maroon/40 font-black tracking-widest uppercase italic">₹{item.price} EA</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-0.5">
                    <span className="font-mono font-black text-brand-maroon text-sm">₹{item.price * item.qty}</span>
                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 text-brand-maroon hover:text-brand-gold transition-colors"><Plus size={14} strokeWidth={3} /></button>
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 text-brand-maroon/40 hover:text-brand-maroon transition-colors"><Minus size={14} strokeWidth={3} /></button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-10 border-t border-brand-maroon/10 bg-white/60 relative z-10">
          <div className="space-y-4 mb-10">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-brand-maroon/40">
              <span>Sub-Total</span>
              <span className="font-mono text-brand-maroon">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-brand-maroon/40">
              <span>Station VAT (18%)</span>
              <span className="font-mono text-brand-maroon">₹{tax.toFixed(2)}</span>
            </div>
            <div className="h-[1px] bg-brand-maroon/10 my-6" />
            <div className="flex justify-between items-end">
              <span className="font-heading font-black text-2xl text-brand-maroon uppercase tracking-tighter italic">Total Due</span>
              <span className="text-brand-maroon font-mono font-black text-4xl">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-5 rounded-sm bg-brand-ivory border-2 border-brand-maroon/20 text-[11px] font-black uppercase tracking-[0.3em] text-brand-maroon flex items-center justify-center gap-3 hover:bg-brand-maroon hover:text-brand-ivory hover:border-brand-maroon transition-all"
            >
              <Send size={18} strokeWidth={3} />
              DISPATCH
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-5 rounded-sm bg-brand-maroon text-brand-ivory text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg shadow-brand-maroon/20 transition-all border-2 border-brand-maroon"
            >
              SETTLE
              <ChevronRight size={18} strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
