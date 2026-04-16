import { 
  FileCheck, 
  ArrowRight, 
  AlertCircle, 
  BarChart, 
  Download,
  Lock,
  Wallet,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EODSummary() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col gap-10 max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-end bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="relative z-10">
          <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic leading-none">Day's End Reconciliation</h3>
          <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
            <div className="w-4 h-[1px] bg-brand-maroon/20" />
            Final Registry Audit & Account Closure • 16 April 2026
          </p>
        </div>
        <div className="flex items-center gap-3 text-brand-maroon font-black text-[10px] uppercase tracking-[0.3em] bg-brand-maroon/5 px-8 py-4 rounded-sm border-2 border-brand-maroon/10 shadow-sm italic relative z-10">
          <AlertCircle size={18} strokeWidth={3} className="text-brand-gold animate-pulse" /> 2 Open Station Entries
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/60 backdrop-blur-sm border border-brand-maroon/10 rounded-sm p-10 space-y-8 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-4 text-brand-maroon mb-2 group-hover:scale-105 transition-transform duration-500">
            <Wallet size={28} strokeWidth={3} className="text-brand-gold" />
            <h4 className="font-heading font-black text-2xl uppercase tracking-tighter italic">Ledger: Financials</h4>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-maroon/40">Vault Currency</span>
              <span className="font-mono text-brand-maroon">₹24,500</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-maroon/40">Terminal Archive</span>
              <span className="font-mono text-brand-maroon">₹82,400</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-maroon/40">Digital Registry</span>
              <span className="font-mono text-brand-maroon">₹42,100</span>
            </div>
            <div className="pt-8 border-t-2 border-brand-maroon/10 flex justify-between items-end">
              <span className="font-heading font-black text-xl text-brand-maroon/40 italic">GROSS YIELD</span>
              <span className="font-mono font-black text-4xl text-brand-maroon tracking-tighter italic drop-shadow-sm">₹1,49,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-brand-maroon/10 rounded-sm p-10 space-y-8 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-4 text-brand-maroon mb-2 group-hover:scale-105 transition-transform duration-500">
            <AlertCircle size={28} strokeWidth={3} className="text-brand-gold" />
            <h4 className="font-heading font-black text-2xl uppercase tracking-tighter italic">Ledger: Adjust</h4>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-maroon/40">Station Voids</span>
              <span className="font-mono text-brand-maroon">₹1,200</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-maroon/40">Guest Courtesy</span>
              <span className="font-mono text-brand-maroon">₹3,450</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-maroon/40">Promotion Yield</span>
              <span className="font-mono text-brand-maroon">₹12,800</span>
            </div>
            <div className="pt-8 border-t-2 border-brand-maroon/10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold italic">96% PRECISION RATE</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-maroon text-brand-ivory border-2 border-brand-maroon rounded-sm p-10 space-y-8 shadow-xl relative overflow-hidden group">
           {/* Texture */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

          <div className="flex items-center gap-4 text-brand-gold mb-2 relative z-10 group-hover:scale-105 transition-transform duration-500">
            <BarChart size={28} strokeWidth={3} />
            <h4 className="font-heading font-black text-2xl uppercase tracking-tighter italic">Ledger: Ops</h4>
          </div>
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-ivory/40">Kitchen Tokens</span>
              <span className="font-black text-brand-ivory">142</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-ivory/40">Brewery Tokens</span>
              <span className="font-black text-brand-ivory">284</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-brand-ivory/40">Avg Serve Velocity</span>
              <span className="font-black text-brand-ivory">12m 45s</span>
            </div>
            <div className="pt-8 border-t-2 border-white/10 flex justify-between items-center text-brand-gold">
               <span className="text-[9px] font-black uppercase tracking-[0.4em] italic leading-none">Service Velocity Peak</span>
               <span className="text-xl font-heading font-black leading-none uppercase italic">20:30 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white/80 backdrop-blur-md border border-brand-maroon/10 rounded-sm p-14 flex flex-col justify-between shadow-sm relative overflow-hidden group/main">
        {/* Ledger texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
        
        <div className="space-y-12 relative z-10">
          <div className="flex items-center gap-8 p-10 bg-brand-maroon/5 rounded-sm border-2 border-brand-maroon/5 shadow-inner">
            <div className="w-20 h-20 bg-brand-maroon text-brand-ivory rounded-sm flex items-center justify-center border-4 border-white shadow-xl relative group">
               <Clock size={40} strokeWidth={3} className="group-hover:rotate-12 transition-transform duration-700" />
               <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-gold rounded-full border-4 border-white animate-pulse shadow-lg" />
            </div>
            <div>
              <p className="text-[10px] text-brand-maroon/40 uppercase font-black tracking-[0.5em] mb-2 italic">STATION PERSISTENCE SIGNAL</p>
              <p className="text-3xl font-heading font-black text-brand-maroon tracking-tighter uppercase italic leading-none">All 14 operational nodes have successfully logged off.</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="font-heading font-black text-2xl text-brand-maroon uppercase tracking-tighter italic ml-2">System Integrity Registry</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'Inventory Delta Reconciliation',
                'Payment Gateway Terminal Audit',
                'E-Manifest Generation Archive',
                'Cloud Persistence Encryption'
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-6 p-8 bg-white border-2 border-brand-maroon/5 rounded-sm group/item hover:border-brand-maroon/20 hover:bg-brand-maroon/5 transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-brand-maroon text-brand-ivory flex items-center justify-center shadow-lg border-2 border-white">
                    <FileCheck size={20} strokeWidth={4} />
                  </div>
                  <span className="text-[11px] font-black text-brand-maroon uppercase tracking-widest italic">{task}</span>
                  <div className="ml-auto opacity-10 group-hover/item:opacity-100 transition-opacity text-emerald-700"><CheckCircle2 size={24} strokeWidth={3} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-16 flex gap-8 relative z-10 mt-10">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 px-12 py-6 rounded-sm bg-white border-2 border-brand-maroon/10 font-black uppercase tracking-[0.3em] text-[11px] text-brand-maroon/60 hover:text-brand-maroon hover:border-brand-maroon transition-all shadow-sm italic"
          >
            <Download size={24} strokeWidth={3} /> EXPORT SHIFT ARCHIVE
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-6 px-12 py-6 rounded-sm bg-brand-maroon text-brand-ivory font-black uppercase tracking-[0.4em] text-[12px] shadow-2xl border-2 border-brand-maroon transition-all active:scale-[0.98] group/close italic"
          >
            <Lock size={24} strokeWidth={4} className="group-hover:rotate-12 transition-transform duration-500" /> 
            CLOSE STATION & FINALIZE DAY 
            <ArrowRight size={24} strokeWidth={4} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
