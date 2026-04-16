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
      className="h-full flex flex-col gap-10"
    >
      <div className="flex justify-between items-end bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-brand-maroon text-brand-ivory rounded-sm flex items-center justify-center shadow-xl border-4 border-white">
             <Split size={32} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic leading-none">Bill Dissection</h3>
            <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
               <div className="w-4 h-[1px] bg-brand-maroon/20" />
               TABLE 12 • REGISTRY TOTAL ₹1,810
            </p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
          <button className="bg-brand-maroon/5 border-2 border-brand-maroon/10 px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-brand-maroon/60 hover:text-brand-maroon hover:border-brand-maroon transition-all flex items-center gap-3 italic">
            <Merge size={16} strokeWidth={3} />
            CONSOLIDATE ALL
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addBill}
            className="bg-brand-maroon text-brand-ivory px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-brand-maroon/20 border-2 border-brand-maroon transition-all"
          >
            <Plus size={20} strokeWidth={3} />
            FORGE SUB-BILL
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-[450px] flex flex-col bg-white/60 backdrop-blur-md border border-brand-maroon/10 rounded-sm overflow-hidden shrink-0 shadow-sm relative group"
              >
                 {/* Ledger texture */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

                <div className="p-10 bg-brand-maroon/5 border-b border-brand-maroon/10 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-brand-maroon/5 border-2 border-brand-maroon/5 flex items-center justify-center text-brand-maroon/20 group-hover:bg-brand-maroon group-hover:text-brand-ivory transition-all duration-500">
                      <User size={24} strokeWidth={3} />
                    </div>
                    <div>
                      <span className="font-heading font-black text-2xl text-brand-maroon tracking-tighter uppercase italic leading-none">Guest {bill.id}</span>
                      <p className="text-[9px] text-brand-maroon/40 uppercase font-black tracking-[0.3em] mt-2 italic">Active Entry</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-brand-gold font-mono font-black text-3xl tracking-tighter italic shadow-sm">₹{total}</span>
                  </div>
                </div>

                <div className="flex-1 p-10 space-y-6 overflow-y-auto custom-scrollbar relative z-10">
                  {bill.items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-brand-maroon/20 space-y-8 opacity-40 italic">
                      <div className="w-24 h-24 rounded-full border-4 border-dashed border-brand-maroon/10 flex items-center justify-center">
                        <Receipt size={36} strokeWidth={3} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sub-Ledger Empty</p>
                    </div>
                  ) : (
                    bill.items.map((item) => (
                      <motion.div 
                        key={item.id} 
                        layoutId={item.id}
                        className="group/item p-6 bg-white/40 border-2 border-brand-maroon/5 rounded-sm flex justify-between items-center transition-all hover:border-brand-maroon/20 hover:bg-brand-maroon/5"
                      >
                        <div>
                          <h5 className="text-[11px] font-black text-brand-maroon uppercase tracking-widest italic group-hover:text-brand-gold transition-colors">{item.name}</h5>
                          <p className="text-[13px] text-brand-maroon/40 font-mono font-black mt-1 italic group-hover:text-brand-maroon transition-colors">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 opacity-0 group-hover/item:opacity-100 transition-all translate-x-4 group-hover/item:translate-x-0">
                          {bills.filter(b => b.id !== bill.id).map(target => (
                            <button 
                              key={target.id}
                              onClick={() => moveItem(bill.id, target.id, item.id)}
                              className="w-12 h-12 rounded-full bg-brand-maroon text-brand-ivory flex items-center justify-center hover:bg-brand-gold hover:scale-110 active:scale-90 transition-all shadow-lg border-4 border-white"
                              title={`Transfer to Guest ${target.id}`}
                            >
                              <ChevronRight size={20} strokeWidth={4} />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="p-10 bg-brand-maroon/5 border-t border-brand-maroon/10 relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 rounded-sm bg-brand-maroon text-brand-ivory text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-gold transition-all border-2 border-brand-maroon shadow-lg"
                  >
                    FINALIZE GUEST {bill.id}
                  </motion.button>
                </div>

                {/* Aesthetic Backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.04] transition-all duration-1000">
                   <Users size={350} strokeWidth={1} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
