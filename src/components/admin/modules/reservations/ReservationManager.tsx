import { Search } from 'lucide-react';
import  { useState } from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  User,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Reservation {
  id: string;
  name: string;
  phone: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'active' | 'waitlist' | 'cancelled';
  tablePreference?: string;
}

const MOCK_RESERVATIONS: Reservation[] = [
  { id: '1', name: 'Rahul Sharma', phone: '+91 98765 43210', time: '19:30', guests: 4, status: 'confirmed', tablePreference: 'Deck' },
  { id: '2', name: 'Anita Desai', phone: '+91 98888 77777', time: '20:00', guests: 2, status: 'active', tablePreference: 'Bar' },
  { id: '3', name: 'Siddharth V.', phone: '+91 91234 56789', time: '20:15', guests: 8, status: 'confirmed', tablePreference: 'VIP Lounge' },
  { id: '4', name: 'Maya Kapoor', phone: '+91 99999 88888', time: '19:00', guests: 4, status: 'waitlist' },
  { id: '5', name: 'John Doe', phone: '+1 202 555 0123', time: '21:00', guests: 3, status: 'confirmed' },
];

export default function ReservationManager() {
  const [filter, setFilter] = useState('all');

  const filteredReservations = MOCK_RESERVATIONS.filter(res => 
    filter === 'all' ? true : res.status === filter
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-ivory">Table Reservations</h3>
          <p className="text-smoke text-sm">Managing the evening's guest list and floor capacity</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke group-focus-within:text-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search guests..." 
              className="bg-surface border border-iron/30 rounded-xl pl-10 pr-4 py-2 text-sm text-ivory focus:border-gold outline-none transition-all w-64 shadow-inner"
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gold text-base px-6 py-2 rounded-xl text-sm font-black flex items-center gap-2 gold-glow uppercase tracking-widest transition-all"
          >
            <Plus size={18} strokeWidth={3} />
            New Booking
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Calendar Card */}
        <div className="xl:col-span-1 bg-surface border border-iron/30 rounded-3xl p-6 flex flex-col shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <span className="font-serif font-bold text-ivory">April 2026</span>
            <div className="flex gap-1">
              <button className="p-2 hover:bg-base rounded-lg text-smoke hover:text-gold transition-colors"><ChevronLeft size={16} /></button>
              <button className="p-2 hover:bg-base rounded-lg text-smoke hover:text-gold transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-[10px] text-smoke mb-4 uppercase tracking-widest font-black">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm flex-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const IsToday = day === 16;
              const HasBookings = day % 4 === 0;
              return (
                <button 
                  key={i} 
                  className={`aspect-square flex items-center justify-center rounded-xl transition-all relative group ${
                    IsToday ? 'bg-gold text-base font-black gold-glow' : 'hover:bg-ivory/5 text-smoke hover:text-ivory'
                  }`}
                >
                  <span className="relative z-10">{day}</span>
                  {HasBookings && !IsToday && (
                    <div className="absolute bottom-1.5 w-1 h-1 bg-gold rounded-full shadow-[0_0_5px_rgba(212,155,53,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-iron/30 space-y-4">
            <h4 className="text-[10px] font-black text-smoke uppercase tracking-[0.2em]">Floor Capacity</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-ivory">
                  <span className="uppercase tracking-tight">Main Floor</span>
                  <span className="text-gold">85%</span>
                </div>
                <div className="h-1.5 bg-base rounded-full overflow-hidden border border-iron/30">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-copper to-gold shadow-[0_0_10px_rgba(212,155,53,0.3)]" 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-ivory">
                  <span className="uppercase tracking-tight">The Deck</span>
                  <span className="text-smoke">40%</span>
                </div>
                <div className="h-1.5 bg-base rounded-full overflow-hidden border border-iron/30">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '40%' }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-ivory/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation List */}
        <div className="xl:col-span-3 bg-surface border border-iron/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="p-6 border-b border-iron/30 flex gap-4 bg-base/30">
            {['all', 'confirmed', 'waitlist'].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filter === t 
                    ? 'bg-gold text-base border-gold shadow-lg shadow-gold/20' 
                    : 'text-smoke border-iron/50 hover:border-gold hover:text-ivory'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-smoke uppercase tracking-[0.2em] font-black bg-base/50 sticky top-0 z-10">
                  <th className="px-8 py-4 border-b border-iron/30">Guest</th>
                  <th className="px-4 py-4 border-b border-iron/30">Time / Seats</th>
                  <th className="px-4 py-4 border-b border-iron/30">Status</th>
                  <th className="px-4 py-4 border-b border-iron/30">Placement</th>
                  <th className="px-8 py-4 text-right border-b border-iron/30">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-iron/20">
                <AnimatePresence mode="popLayout">
                  {filteredReservations.map((res) => (
                    <motion.tr 
                      key={res.id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-ivory/5 flex items-center justify-center text-gold border border-iron/30 group-hover:bg-gold/10 group-hover:border-gold/30 transition-all">
                            <User size={20} />
                          </div>
                          <div>
                            <div className="font-serif font-bold text-ivory text-base tracking-tight">{res.name}</div>
                            <div className="text-[10px] text-smoke flex items-center gap-1.5 font-sans mt-0.5">
                              <Phone size={10} className="text-gold/50" /> {res.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-col">
                          <span className="font-mono text-gold font-bold text-sm tracking-tighter">{res.time}</span>
                          <span className="text-[10px] text-smoke uppercase font-black tracking-widest mt-0.5">{res.guests} PPL</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          res.status === 'confirmed' ? 'bg-status-success/10 text-emerald-500 border border-emerald-500/20' :
                          res.status === 'active' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          res.status === 'waitlist' ? 'bg-gold/10 text-gold border border-gold/20' :
                          'bg-smoke/10 text-smoke border border-smoke/20'
                        }`}>
                          {res.status === 'confirmed' && <CheckCircle2 size={12} />}
                          {res.status === 'waitlist' && <AlertCircle size={12} />}
                          {res.status}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-[10px] font-bold text-smoke uppercase tracking-wider">{res.tablePreference || 'Main Floor'}</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button className="px-4 py-1.5 rounded-lg bg-emerald-500/80 hover:bg-emerald-500 text-base text-[10px] font-black uppercase tracking-widest transition-all">
                            Check-in
                          </button>
                          <button className="p-2 rounded-lg bg-ivory/5 text-smoke hover:text-ivory hover:bg-ivory/10 transition-all">
                            <Plus size={14} className="rotate-45" /> 
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
