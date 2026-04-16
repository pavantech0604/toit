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
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-4xl font-serif font-black text-ivory tracking-tighter">Day's End Reconciliation</h3>
          <p className="text-smoke text-sm font-sans tracking-tight mt-1">Final audit and account closure for Business Date: 16 April 2026</p>
        </div>
        <div className="flex items-center gap-3 text-copper font-black text-[10px] uppercase tracking-[0.2em] bg-copper/10 px-6 py-3 rounded-2xl border border-copper/30 shadow-lg shadow-copper/10">
          <AlertCircle size={16} /> 2 Open Tables Remaining
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface border border-iron/30 rounded-[2.5rem] p-10 space-y-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-4 text-gold mb-4 group-hover:scale-110 transition-transform">
            <Wallet size={24} strokeWidth={2.5} />
            <h4 className="font-serif font-black text-lg uppercase tracking-tight">Financials</h4>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">Cash in Drawer</span>
              <span className="font-mono text-ivory">₹24,500</span>
            </div>
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">Card Terminal</span>
              <span className="font-mono text-ivory">₹82,400</span>
            </div>
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">UPI / Digital</span>
              <span className="font-mono text-ivory">₹42,100</span>
            </div>
            <div className="pt-6 border-t border-iron/20 flex justify-between items-end">
              <span className="font-serif font-bold text-lg text-smoke">GROSS TOTAL</span>
              <span className="font-mono font-black text-3xl text-gold drop-shadow-[0_0_10px_rgba(212,155,53,0.3)]">₹1,49,000</span>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-iron/30 rounded-[2.5rem] p-10 space-y-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-4 text-copper mb-4 group-hover:scale-110 transition-transform">
            <AlertCircle size={24} strokeWidth={2.5} />
            <h4 className="font-serif font-black text-lg uppercase tracking-tight">Adjustments</h4>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">Voided Items</span>
              <span className="font-mono text-ivory">₹1,200</span>
            </div>
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">Complimentary</span>
              <span className="font-mono text-ivory">₹3,450</span>
            </div>
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">Net Discounts</span>
              <span className="font-mono text-ivory">₹12,800</span>
            </div>
            <div className="pt-6 border-t border-iron/20 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-copper/60 italic">96% Accuracy Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-iron/30 rounded-[2.5rem] p-10 space-y-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-4 text-ivory mb-4 group-hover:scale-110 transition-transform">
            <BarChart size={24} strokeWidth={2.5} />
            <h4 className="font-serif font-black text-lg uppercase tracking-tight">Operations</h4>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">Kitchen Tickets</span>
              <span className="font-bold text-ivory">142</span>
            </div>
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">Bar Tickets</span>
              <span className="font-bold text-ivory">284</span>
            </div>
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-smoke">Avg Serve Time</span>
              <span className="font-bold text-ivory">12m 45s</span>
            </div>
            <div className="pt-6 border-t border-iron/20 flex justify-between items-center text-status-success">
               <span className="text-[10px] font-black uppercase tracking-widest">Service Peak</span>
               <span className="text-sm font-serif font-black leading-none uppercase">20:30 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-surface border border-iron/30 rounded-[4rem] p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group/main">
        <div className="absolute inset-0 bg-base/20 pointer-events-none" />
        
        <div className="space-y-12 relative z-10">
          <div className="flex items-center gap-6 p-8 bg-base/40 rounded-[2rem] border border-iron/30">
            <div className="w-16 h-16 bg-gold/10 text-gold rounded-2xl flex items-center justify-center border border-gold/30 shadow-lg shadow-gold/10">
               <Clock size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] text-smoke uppercase font-black tracking-[0.3em] mb-1">STATION SIGNAL</p>
              <p className="text-2xl font-serif font-bold text-ivory italic">All 14 Staff members have successfully clocked out.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-serif font-black text-2xl text-ivory uppercase tracking-tighter ml-2">System Integrity Audit</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Inventory Sync Success',
                'Payment Gateway Reconciled',
                'E-Invoice Generation Complete',
                'Cloud Backup Secured'
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-base/30 rounded-2xl border border-iron/10 group/item hover:border-emerald-500/30 transition-all">
                  <div className="w-8 h-8 rounded-full bg-status-success/10 border border-status-success/30 flex items-center justify-center text-status-success">
                    <FileCheck size={16} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-ivory font-sans tracking-tight">{task}</span>
                  <div className="ml-auto opacity-20 group-hover/item:opacity-100 transition-opacity"><CheckCircle2 size={16} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 flex gap-6 relative z-10 mt-8">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-10 py-6 rounded-[2rem] bg-base border-2 border-iron/30 font-black uppercase tracking-widest text-[11px] text-smoke hover:text-ivory hover:border-ivory/50 transition-all"
          >
            <Download size={22} strokeWidth={2.5} /> EXPORT SHIFT ARCHIVE
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-4 px-10 py-6 rounded-[2rem] bg-copper text-base font-black uppercase tracking-[0.3em] text-[11px] hover:brightness-110 shadow-2xl shadow-copper/30 transition-all active:scale-[0.98] group/close"
          >
            <Lock size={22} strokeWidth={3} className="group-hover:rotate-12 transition-transform" /> 
            CLOSE STATION & FINALIZE DAY 
            <ArrowRight size={22} strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
