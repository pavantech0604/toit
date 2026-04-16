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
    <div className="h-full flex flex-col gap-10">
      <div className="flex justify-between items-end bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-brand-maroon text-brand-ivory rounded-sm flex items-center justify-center shadow-xl border-4 border-white">
            <ChefHat size={36} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic leading-none">Kitchen Operations</h3>
            <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
               <div className="w-4 h-[1px] bg-brand-maroon/20" />
               BOH COMMAND • GALLEY-01
            </p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="flex bg-brand-maroon/5 border-2 border-brand-maroon/10 p-1.5 rounded-sm">
              {['All Stations', 'Starters', 'Mains', 'Taps'].map(station => (
                <button 
                  key={station}
                  className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    station === 'All Stations' ? 'bg-brand-maroon text-brand-ivory shadow-lg' : 'text-brand-maroon/40 hover:text-brand-maroon'
                  }`}
                >
                  {station}
                </button>
              ))}
           </div>
           <button className="w-14 h-14 bg-white/40 border-2 border-brand-maroon/10 rounded-sm flex items-center justify-center text-brand-maroon/40 hover:text-brand-maroon hover:border-brand-maroon transition-all">
              <Timer size={24} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-10 overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence>
          {MOCK_TICKETS.map((ticket) => (
            <motion.div 
              key={ticket.id} 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white/80 backdrop-blur-md border-4 rounded-sm flex flex-col overflow-hidden shadow-sm relative ${
                ticket.priority ? 'border-brand-gold ring-8 ring-brand-gold/5' : 'border-brand-maroon/10'
              }`}
            >
              {/* Ticket Header */}
              <div className={`p-10 border-b border-brand-maroon/10 flex justify-between items-center ${
                ticket.status === 'ready' ? 'bg-emerald-50' : 
                ticket.status === 'preparing' ? 'bg-brand-gold/10' : 'bg-brand-maroon/5'
              }`}>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-sm bg-brand-maroon text-brand-ivory border-4 border-white flex items-center justify-center font-heading font-black text-4xl shadow-xl">
                    {ticket.table}
                  </div>
                  <div>
                    <h5 className="font-heading font-black text-2xl text-brand-maroon tracking-tighter uppercase italic leading-none mb-2">Order #{ticket.id}</h5>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-maroon/40">
                      <Clock size={12} className={ticket.priority ? 'text-brand-gold' : 'text-brand-gold/60'} /> 
                      <span className={ticket.priority ? 'text-brand-gold font-mono text-base' : 'font-mono'}>{ticket.time} ELAPSED</span>
                    </div>
                  </div>
                </div>
                <button className="p-3 hover:bg-brand-maroon/5 rounded-full text-brand-maroon/20 hover:text-brand-maroon transition-all"><MoreVertical size={20} /></button>
              </div>

              {/* Items List */}
              <div className="flex-1 p-10 space-y-8">
                {ticket.items.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-sm bg-brand-maroon/5 border-2 border-brand-maroon/10 flex items-center justify-center font-black text-brand-maroon text-xl group-hover:bg-brand-maroon transition-all">
                          {item.qty}
                        </div>
                        <span className="font-heading font-black text-2xl text-brand-maroon tracking-tighter uppercase italic">{item.name}</span>
                      </div>
                      <div className="opacity-[0.05]"><Flame size={32} strokeWidth={3} /></div>
                    </div>
                    {item.notes && (
                      <div className="ml-18 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold bg-brand-gold/5 px-4 py-2 rounded-sm border border-brand-gold/10 w-fit italic">
                        <AlertCircle size={14} /> COMMAND: {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="p-10 border-t border-brand-maroon/10 bg-brand-maroon/5">
                <div className="flex gap-4">
                  {ticket.status === 'ready' ? (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-6 rounded-sm bg-brand-gold text-brand-maroon text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-brand-gold/20 border-2 border-brand-gold"
                    >
                      BUMP LEDGER
                    </motion.button>
                  ) : (
                    <div className="flex flex-1 gap-4">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-6 rounded-sm bg-brand-ivory border-2 border-brand-maroon/10 text-brand-maroon/40 hover:text-brand-maroon hover:border-brand-maroon transition-all"
                      >
                         <AlertCircle size={24} strokeWidth={3} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 flex items-center justify-center gap-4 py-6 rounded-sm text-[11px] font-black uppercase tracking-[0.3em] transition-all border-2 shadow-lg ${
                          ticket.status === 'preparing' 
                            ? 'bg-brand-maroon text-brand-ivory border-brand-maroon' 
                            : 'bg-brand-gold text-brand-maroon border-brand-gold'
                        }`}
                      >
                         {ticket.status === 'preparing' ? <CheckCircle2 size={18} strokeWidth={3} /> : null}
                         {ticket.status === 'preparing' ? 'DISPATCH READY' : 'INITIATE ORDER'}
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
