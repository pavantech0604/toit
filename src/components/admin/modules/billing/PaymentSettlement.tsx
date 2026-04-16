import { useState } from 'react';
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Gift, 
  CheckCircle2, 
  Printer, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Beer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PaymentMethod = 'upi' | 'card' | 'cash' | 'loyalty';

export default function PaymentSettlement() {
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [isSettled, setIsSettled] = useState(false);

  const totalAmount = 1810;

  if (isSettled) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-40 h-40 bg-status-success/10 border-4 border-status-success/30 rounded-full flex items-center justify-center text-status-success mb-10 shadow-[0_0_50px_rgba(74,93,35,0.2)]"
        >
          <CheckCircle2 size={80} strokeWidth={2.5} className="animate-pulse" />
        </motion.div>
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-serif font-black text-ivory mb-4 tracking-tight"
        >
          Transaction Secured
        </motion.h3>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-smoke text-sm font-black uppercase tracking-[0.3em] mb-12 opacity-60"
        >
          AUTH CODE: #A829-X102
        </motion.p>
        
        <div className="flex gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-[2rem] bg-base border-2 border-iron/30 font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:text-ivory hover:border-ivory/50 transition-all text-smoke"
          >
            <Printer size={22} /> PRINT RECEIPT
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSettled(false)}
            className="px-10 py-5 rounded-[2rem] bg-gold text-base font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:brightness-110 active:scale-95 transition-all gold-glow shadow-xl shadow-gold/20"
          >
            NEW ORDER <ChevronRight size={22} strokeWidth={3} />
          </motion.button>
        </div>

        {/* Backdrop Decorative */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center">
           <Beer size={800} strokeWidth={0.5} />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full max-w-6xl mx-auto flex flex-col gap-12 py-6 overflow-hidden"
    >
      <div className="text-center space-y-4">
        <h3 className="text-[10px] font-black text-smoke uppercase tracking-[0.4em] opacity-60">Settlement in progress • Station 01</h3>
        <motion.p 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl font-serif font-black text-gold drop-shadow-[0_0_30px_rgba(212,155,53,0.2)] tracking-tighter"
        >
          ₹{totalAmount.toLocaleString()}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10">
        {[
          { id: 'upi', label: 'UPI / Static QR', icon: Smartphone, color: 'text-indigo-400' },
          { id: 'card', label: 'Credit / Debit', icon: CreditCard, color: 'text-emerald-400' },
          { id: 'cash', label: 'Cash Tender', icon: Banknote, color: 'text-gold' },
          { id: 'loyalty', label: 'Points / Gift', icon: Gift, color: 'text-copper' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id as PaymentMethod)}
            className={`flex flex-col items-center gap-6 p-10 rounded-[3rem] border-2 transition-all relative overflow-hidden group ${
              method === m.id 
                ? 'bg-surface border-gold text-ivory ring-8 ring-gold/5' 
                : 'bg-surface/50 border-iron/20 text-smoke hover:border-gold/30 hover:bg-surface'
            }`}
          >
            <m.icon size={48} strokeWidth={1.5} className={`${method === m.id ? m.color : 'opacity-30 group-hover:opacity-60'} transition-all duration-500`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{m.label}</span>
            {method === m.id && (
               <motion.div layoutId="active-method" className="absolute top-0 right-0 p-4"><div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,155,53,1)]" /></motion.div>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-surface border-t-2 border-iron/30 rounded-t-[5rem] p-12 flex flex-col items-center justify-between shadow-2xl mt-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-base/20 pointer-events-none" />
        
        <div className="flex-1 w-full flex flex-col items-center justify-center space-y-10 relative z-10">
          <AnimatePresence mode="wait">
            {method === 'upi' ? (
              <motion.div 
                key="upi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <div className="w-64 h-64 bg-white p-6 rounded-[3rem] mx-auto shadow-[0_0_100px_rgba(255,255,255,0.05)] border-8 border-gold/10">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=brewpub@ybl&pn=Toit&am=1810" alt="QR Code" className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div>
                  <p className="text-xl font-serif font-bold text-ivory tracking-tight mb-2">Scan & Pay</p>
                  <p className="text-[10px] text-smoke uppercase tracking-widest font-black opacity-60">UPI ID: TOIT@STATION1</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="terminal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <div className="w-32 h-32 rounded-full border-2 border-stone-800 flex items-center justify-center mx-auto bg-base/50">
                   <ShieldCheck size={64} className="text-zinc-800 animate-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-ivory tracking-tight mb-3">Syncing with Terminal...</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                     <span className="w-1 h-1 rounded-full bg-gold animate-bounce" />
                     <span className="w-1 h-1 rounded-full bg-gold animate-bounce delay-100" />
                     <span className="w-1 h-1 rounded-full bg-gold animate-bounce delay-200" />
                  </div>
                  <p className="text-[10px] text-smoke uppercase font-black tracking-widest opacity-50">Swipe, Tap or Insert Card on PIN Pad #2</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full max-w-2xl px-10 pb-4 flex gap-6 relative z-10 transition-all">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 rounded-3xl bg-base border border-iron/50 text-smoke hover:text-ivory hover:border-gold/30 transition-all"
          >
            <ArrowLeft size={32} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSettled(true)}
            className="flex-1 py-6 rounded-3xl bg-gold text-base font-black uppercase tracking-[0.3em] text-[12px] hover:brightness-110 shadow-2xl shadow-gold/20 active:scale-[0.98] transition-all gold-glow"
          >
            CONFIRM SETTLEMENT
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
