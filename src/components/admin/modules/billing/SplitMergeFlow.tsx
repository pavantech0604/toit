import { useState } from 'react';
import { 
  Split, 
  Merge, 
  User, 
  Users,
  ChevronRight, 
  Plus,
  Receipt
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BillItem {
  id: string;
  name: string;
  price: number;
}

interface SplitBill {
  id: number;
  items: BillItem[];
}

const ORIGINAL_ITEMS: BillItem[] = [
  { id: '1', name: 'Toit Weiss', price: 325 },
  { id: '2', name: 'Toit Weiss', price: 325 },
  { id: '3', name: 'Macho Nachos', price: 425 },
  { id: '4', name: 'Spicy Wings', price: 385 },
  { id: '5', name: 'Dark Knight', price: 350 },
];

export default function SplitMergeFlow() {
  const [bills, setBills] = useState<SplitBill[]>([{ id: 1, items: ORIGINAL_ITEMS }, { id: 2, items: [] }]);

  const moveItem = (fromBillId: number, toBillId: number, itemId: string) => {
    setBills(prev => {
      const fromBill = prev.find(b => b.id === fromBillId);
      const toBill = prev.find(b => b.id === toBillId);
      if (!fromBill || !toBill) return prev;

      const itemIndex = fromBill.items.findIndex(i => i.id === itemId);
      if (itemIndex === -1) return prev;

      const item = fromBill.items[itemIndex];
      const newFromItems = [...fromBill.items];
      newFromItems.splice(itemIndex, 1);

      return prev.map(b => {
        if (b.id === fromBillId) return { ...b, items: newFromItems };
        if (b.id === toBillId) return { ...b, items: [...b.items, item] };
        return b;
      });
    });
  };

  const addBill = () => {
    setBills(prev => [...prev, { id: prev.length + 1, items: [] }]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col gap-8"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center text-gold shadow-lg shadow-gold/10">
             <Split size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-ivory tracking-tight">Bill Dissection</h3>
            <p className="text-smoke text-sm font-sans underline decoration-gold/30 underline-offset-4 decoration-2">Table 12 • Total ₹1,810</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-base border border-iron/30 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-smoke hover:text-ivory hover:border-ivory/30 transition-all flex items-center gap-3">
            <Merge size={16} />
            CONSOLIDATE ALL
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addBill}
            className="bg-gold text-base px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 gold-glow shadow-lg shadow-gold/20"
          >
            <Plus size={20} strokeWidth={3} />
            NEW SUB-BILL
          </motion.button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-x-auto pb-8 custom-scrollbar relative">
        <AnimatePresence>
          {bills.map((bill) => {
            const total = bill.items.reduce((sum, item) => sum + item.price, 0);
            
            return (
              <motion.div 
                key={bill.id} 
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-[420px] flex flex-col bg-surface border border-iron/30 rounded-[3rem] overflow-hidden shrink-0 shadow-2xl relative group"
              >
                <div className="p-8 bg-base/30 border-b border-iron/10 flex justify-between items-center backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold/5 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-base transition-all duration-300">
                      <User size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-serif font-black text-xl text-ivory tracking-tight">Guest {bill.id}</span>
                      <p className="text-[10px] text-smoke uppercase font-black tracking-widest opacity-60">ACTIVE SUB-BILL</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-gold font-mono font-black text-2xl drop-shadow-[0_0_10px_rgba(212,155,53,0.3)]">₹{total}</span>
                  </div>
                </div>

                <div className="flex-1 p-8 space-y-4 overflow-y-auto custom-scrollbar bg-base/10 relative">
                  {bill.items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-smoke space-y-6 opacity-40 italic">
                      <div className="w-24 h-24 rounded-full border-2 border-dashed border-iron/50 flex items-center justify-center">
                        <Receipt size={32} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em]">Empty Ledger</p>
                    </div>
                  ) : (
                    bill.items.map((item) => (
                      <motion.div 
                        key={item.id} 
                        layoutId={item.id}
                        className="group/item p-5 bg-base/50 border border-iron/30 rounded-2xl flex justify-between items-center transition-all hover:border-gold/30 hover:bg-gold/[0.02]"
                      >
                        <div>
                          <h5 className="text-sm font-bold text-ivory tracking-tight">{item.name}</h5>
                          <p className="text-[10px] text-zinc-500 font-mono">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-all translate-x-2 group-hover/item:translate-x-0">
                          {bills.filter(b => b.id !== bill.id).map(target => (
                            <button 
                              key={target.id}
                              onClick={() => moveItem(bill.id, target.id, item.id)}
                              className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center hover:bg-gold hover:text-base hover:scale-110 active:scale-90 transition-all border border-gold/20"
                              title={`Move to Guest ${target.id}`}
                            >
                              <ChevronRight size={18} strokeWidth={3} />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="p-8 bg-base/30 border-t border-iron/10">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-[1.5rem] bg-gold text-base text-[10px] font-black uppercase tracking-[0.2em] hover:brightness-110 shadow-xl shadow-gold/20 transition-all gold-glow"
                  >
                    FINALIZE GUEST {bill.id}
                  </motion.button>
                </div>

                {/* Aesthetic Backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.04] transition-all duration-1000">
                   <Users size={300} strokeWidth={1} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
