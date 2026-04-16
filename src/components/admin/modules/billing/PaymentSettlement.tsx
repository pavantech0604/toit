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
      <div className="h-full flex flex-col items-center justify-center p-10 relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-48 h-48 bg-brand-maroon text-brand-ivory rounded-sm flex items-center justify-center shadow-2xl border-8 border-white mb-12 relative z-10"
        >
          <CheckCircle2 size={96} strokeWidth={3} className="drop-shadow-lg" />
        </motion.div>
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-heading font-black text-brand-maroon mb-4 tracking-tighter uppercase italic leading-none relative z-10"
        >
          Transaction Secured
        </motion.h3>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-brand-maroon/40 text-[11px] font-black uppercase tracking-[0.5em] mb-16 italic relative z-10 flex items-center gap-4"
        >
           <div className="w-8 h-[1px] bg-brand-maroon/20" />
           AUTH CODE: G-882-XQ102
           <div className="w-8 h-[1px] bg-brand-maroon/20" />
        </motion.p>
        
        <div className="flex gap-8 relative z-10">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 rounded-sm bg-white/40 border-2 border-brand-maroon/10 font-black uppercase tracking-[0.3em] text-[11px] text-brand-maroon/60 flex items-center gap-4 hover:text-brand-maroon hover:border-brand-maroon transition-all italic shadow-sm"
          >
            <Printer size={24} strokeWidth={3} /> PRINT REGISTRY RECEIPT
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSettled(false)}
            className="px-12 py-6 rounded-sm bg-brand-maroon text-brand-ivory font-black uppercase tracking-[0.3em] text-[11px] flex items-center gap-4 shadow-2xl border-2 border-brand-maroon transition-all"
          >
            NEW ENTRY <ChevronRight size={24} strokeWidth={4} />
          </motion.button>
        </div>

        {/* Backdrop Decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-all duration-1000">
           <Beer size={800} strokeWidth={1} />
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
      <div className="text-center space-y-6">
        <h3 className="text-[11px] font-black text-brand-maroon/30 uppercase tracking-[0.5em] italic">Settlement in progress • Command Station 01</h3>
        <motion.p 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-9xl font-heading font-black text-brand-maroon tracking-tighter uppercase italic drop-shadow-sm leading-none"
        >
          ₹{totalAmount.toLocaleString()}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-10">
        {[
          { id: 'upi', label: 'UPI / SCAN', icon: Smartphone, color: 'text-brand-gold' },
          { id: 'card', label: 'CREDIT / CHIP', icon: CreditCard, color: 'text-brand-gold' },
          { id: 'cash', label: 'CURRENCY', icon: Banknote, color: 'text-brand-gold' },
          { id: 'loyalty', label: 'ELITE POINTS', icon: Gift, color: 'text-brand-gold' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id as PaymentMethod)}
            className={`flex flex-col items-center gap-8 p-12 rounded-sm border-2 transition-all relative overflow-hidden group shadow-sm ${
              method === m.id 
                ? 'bg-brand-maroon border-brand-maroon text-brand-ivory shadow-xl translate-y-[-4px]' 
                : 'bg-white/40 border-brand-maroon/5 text-brand-maroon/40 hover:border-brand-maroon/20 hover:bg-brand-maroon/5'
            }`}
          >
            <m.icon size={56} strokeWidth={method === m.id ? 2 : 1} className={`${method === m.id ? 'text-brand-gold scale-110' : 'opacity-20'} transition-all duration-500`} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">{m.label}</span>
            {method === m.id && (
               <motion.div layoutId="active-method" className="absolute top-4 right-4"><div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_15px_rgba(253,185,19,1)]" /></motion.div>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white/60 backdrop-blur-md border border-brand-maroon/10 rounded-sm p-14 flex flex-col items-center justify-between shadow-sm mt-8 relative overflow-hidden">
        {/* Ledger texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
        
        <div className="flex-1 w-full flex flex-col items-center justify-center space-y-12 relative z-10">
          <AnimatePresence mode="wait">
            {method === 'upi' ? (
              <motion.div 
                key="upi"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-10"
              >
                <div className="w-72 h-72 bg-white p-8 rounded-sm mx-auto shadow-2xl border-4 border-brand-maroon/5 flex items-center justify-center relative">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=brewpub@ybl&pn=Toit&am=1810" alt="QR Code" className="w-full h-full opacity-80 hover:opacity-100 transition-opacity" />
                  <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-4 border-l-4 border-brand-gold rounded-tl-sm" />
                  <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-4 border-r-4 border-brand-gold rounded-tr-sm" />
                  <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-4 border-l-4 border-brand-gold rounded-bl-sm" />
                  <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-4 border-r-4 border-brand-gold rounded-br-sm" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-black text-brand-maroon tracking-tighter uppercase italic mb-2 leading-none">Scan Registry QR</p>
                  <p className="text-[10px] text-brand-maroon/40 uppercase tracking-[0.4em] font-black italic">TARGET ID: TOIT-GLLRY-01</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="terminal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-10"
              >
                <div className="w-36 h-36 rounded-full border-4 border-brand-maroon/10 flex items-center justify-center mx-auto bg-brand-maroon/5 group shadow-inner">
                   <ShieldCheck size={72} className="text-brand-maroon/40 animate-pulse" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-3xl font-heading font-black text-brand-maroon tracking-tighter uppercase italic mb-3 leading-none">Syncing Node Terminal...</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                     <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" />
                     <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce delay-100" />
                     <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce delay-200" />
                  </div>
                  <p className="text-[10px] text-brand-maroon/40 uppercase font-black tracking-[0.3em] italic">INSERT OR TAP CREDENTIALS ON PIN PAD #2</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full max-w-2xl px-12 pb-6 flex gap-8 relative z-10 transition-all">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-sm bg-white/40 border-2 border-brand-maroon/10 text-brand-maroon/40 hover:text-brand-maroon hover:border-brand-maroon transition-all flex items-center justify-center shadow-sm"
          >
            <ArrowLeft size={36} strokeWidth={4} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSettled(true)}
            className="flex-1 py-6 rounded-sm bg-brand-maroon text-brand-ivory font-black uppercase tracking-[0.4em] text-[12px] shadow-2xl border-2 border-brand-maroon italic"
          >
            FORGE FINAL SETTLEMENT
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
