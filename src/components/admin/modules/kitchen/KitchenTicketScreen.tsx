import { Clock } from 'lucide-react';
import { 
   
  CheckCircle2, 
  AlertCircle, 
  ChefHat, 
  Flame, 
  MoreVertical,
  Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TicketItem {
  id: string;
  name: string;
  qty: number;
  notes?: string;
}

interface Ticket {
  id: string;
  table: string;
  time: string;
  items: TicketItem[];
  status: 'new' | 'preparing' | 'ready';
  priority: boolean;
}

const MOCK_TICKETS: Ticket[] = [
  { id: '8921', table: '12', time: '8m', status: 'preparing', priority: true, items: [
    { id: '1', name: 'Toit Weiss', qty: 2 },
    { id: '2', name: 'Spicy Wings', qty: 1, notes: 'Extra Spicy' }
  ]},
  { id: '8922', table: '04', time: '12m', status: 'new', priority: false, items: [
    { id: '3', name: 'Farmhouse Pizza', qty: 1 },
    { id: '4', name: 'Basmati Blonde', qty: 4 }
  ]},
  { id: '8923', table: '08', time: '3m', status: 'ready', priority: false, items: [
    { id: '5', name: 'Dark Knight', qty: 1 }
  ]},
];

export default function KitchenTicketScreen() {
  return (
    <div className="h-full flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center text-gold shadow-lg shadow-gold/10">
            <ChefHat size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-ivory">Kitchen Display System</h3>
            <p className="text-smoke text-sm font-sans tracking-tight uppercase">Back-of-House Station: Main Galley</p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="flex bg-base border border-iron/30 p-1.5 rounded-2xl">
              {['All Stations', 'Starters', 'Mains', 'Taps'].map(station => (
                <button 
                  key={station}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    station === 'All Stations' ? 'bg-gold text-base gold-glow' : 'text-smoke hover:text-ivory'
                  }`}
                >
                  {station}
                </button>
              ))}
           </div>
           <button className="p-3 bg-surface border border-iron/30 rounded-2xl text-smoke hover:text-gold transition-colors">
              <Timer size={22} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-10 overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence>
          {MOCK_TICKETS.map((ticket) => (
            <motion.div 
              key={ticket.id} 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-surface border-2 rounded-[3.5rem] flex flex-col overflow-hidden shadow-2xl relative ${
                ticket.priority ? 'border-copper/40 ring-4 ring-copper/5' : 'border-iron/30'
              }`}
            >
              {/* Ticket Header */}
              <div className={`p-8 border-b border-iron/10 flex justify-between items-center ${
                ticket.status === 'ready' ? 'bg-emerald-500/5' : 
                ticket.status === 'preparing' ? 'bg-gold/5' : 'bg-base/40'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-base border border-iron/30 flex items-center justify-center font-serif font-black text-3xl text-gold shadow-inner">
                    {ticket.table}
                  </div>
                  <div>
                    <h5 className="font-serif font-black text-xl text-ivory tracking-tighter uppercase mb-0.5">Order #{ticket.id}</h5>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-smoke">
                      <Clock size={12} className={ticket.priority ? 'text-copper' : 'text-gold'} /> 
                      <span className={ticket.priority ? 'text-copper font-mono text-base' : ''}>{ticket.time}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-xl text-smoke"><MoreVertical size={20} /></button>
              </div>

              {/* Items List */}
              <div className="flex-1 p-8 space-y-6">
                {ticket.items.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-ivory/5 border border-iron/30 flex items-center justify-center font-black text-gold text-lg group-hover:bg-gold transition-all">
                          {item.qty}
                        </div>
                        <span className="font-serif font-bold text-xl text-ivory tracking-tight">{item.name}</span>
                      </div>
                      <div className="opacity-10"><Flame size={24} strokeWidth={3} /></div>
                    </div>
                    {item.notes && (
                      <div className="ml-14 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-copper bg-copper/5 px-3 py-1.5 rounded-lg border border-copper/10 w-fit">
                        <AlertCircle size={12} /> {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="p-8 border-t border-iron/10 bg-base/20">
                <div className="flex gap-4">
                  {ticket.status === 'ready' ? (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-5 rounded-3xl bg-emerald-500 text-base text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20"
                    >
                      BUMP ORDER
                    </motion.button>
                  ) : (
                    <div className="flex flex-1 gap-4">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-5 rounded-3xl bg-base border border-iron/30 text-smoke hover:text-ivory transition-all"
                      >
                         <AlertCircle size={24} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 flex items-center justify-center gap-4 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                          ticket.status === 'preparing' 
                            ? 'bg-status-success text-ivory shadow-lg shadow-status-success/20' 
                            : 'bg-gold text-base gold-glow'
                        }`}
                      >
                         {ticket.status === 'preparing' ? <CheckCircle2 size={18} /> : null}
                         {ticket.status === 'preparing' ? 'READY TO SERVE' : 'START PREPARING'}
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              {/* Priority Animation flourish */}
              {ticket.priority && (
                <div className="absolute top-0 right-0 p-4">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     className="text-copper opacity-20"
                   >
                     <Flame size={64} strokeWidth={1} />
                   </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
