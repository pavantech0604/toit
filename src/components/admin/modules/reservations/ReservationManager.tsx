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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="relative z-10">
          <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic">Table Reservations</h3>
          <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic flex items-center gap-2">
            <div className="w-4 h-[1px] bg-brand-maroon/20" />
            Guest Log & Floor Command
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-maroon/40 group-focus-within:text-brand-maroon transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Filter Ledger..." 
              className="bg-white/40 border-2 border-brand-maroon/5 rounded-sm pl-12 pr-6 py-4 text-[11px] font-black uppercase tracking-widest text-brand-maroon focus:border-brand-maroon/40 outline-none transition-all w-72 placeholder:text-brand-maroon/10"
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-brand-maroon text-brand-ivory px-8 py-4 rounded-sm text-[11px] font-black flex items-center gap-3 uppercase tracking-[0.2em] shadow-xl shadow-brand-maroon/20 transition-all border-2 border-brand-maroon"
          >
            <Plus size={18} strokeWidth={3} />
            New Booking
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Calendar Card: The Heritage Planner */}
        <div className="xl:col-span-1 bg-white/60 backdrop-blur-sm border border-brand-maroon/10 rounded-sm p-8 flex flex-col shadow-sm relative overflow-hidden">
           {/* Ledger Texture */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

          <div className="flex justify-between items-center mb-10 relative z-10 border-b border-brand-maroon/10 pb-6">
            <span className="font-heading font-black text-2xl text-brand-maroon uppercase tracking-tighter italic">April 2026</span>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-brand-maroon/5 rounded-full text-brand-maroon/40 hover:text-brand-maroon transition-all border border-brand-maroon/10"><ChevronLeft size={16} /></button>
              <button className="p-2 hover:bg-brand-maroon/5 rounded-full text-brand-maroon/40 hover:text-brand-maroon transition-all border border-brand-maroon/10"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-[9px] text-brand-maroon/30 mb-6 uppercase tracking-[0.3em] font-black relative z-10">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-[11px] font-black relative z-10">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const IsToday = day === 16;
              const HasBookings = day % 4 === 0;
              return (
                <button 
                  key={i} 
                  className={`aspect-square flex items-center justify-center rounded-sm transition-all relative group uppercase ${
                    IsToday ? 'bg-brand-maroon text-brand-ivory shadow-lg' : 'hover:bg-brand-maroon/5 text-brand-maroon/60 hover:text-brand-maroon'
                  }`}
                >
                  <span className="relative z-10 font-mono tracking-tighter">{day}</span>
                  {HasBookings && !IsToday && (
                    <div className="absolute bottom-1 w-1 h-1 bg-brand-gold rounded-full shadow-[0_0_5px_rgba(253,185,19,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-12 pt-8 border-t border-brand-maroon/10 space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-4 bg-brand-gold" />
              <h4 className="text-[10px] font-black text-brand-maroon/40 uppercase tracking-[0.3em]">Operational Metrics</h4>
            </div>
            <div className="space-y-6">
              <div className="space-y-2.5">
                <div className="flex justify-between text-[10px] font-black text-brand-maroon uppercase tracking-widest">
                  <span className="">Main Floor</span>
                  <span className="text-brand-gold">85% LOAD</span>
                </div>
                <div className="h-1 bg-brand-maroon/5 rounded-full overflow-hidden border border-brand-maroon/10 p-[0.5px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-brand-gold shadow-[0_0_15px_rgba(253,185,19,0.4)]" 
                  />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between text-[10px] font-black text-brand-maroon/40 uppercase tracking-widest">
                  <span className="">The Deck</span>
                  <span className="">40% LOAD</span>
                </div>
                <div className="h-1 bg-brand-maroon/5 rounded-full overflow-hidden border border-brand-maroon/10 p-[0.5px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '40%' }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-brand-maroon/20" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation List: The Guest Archive */}
        <div className="xl:col-span-3 bg-white/80 border border-brand-maroon/10 rounded-sm overflow-hidden flex flex-col shadow-sm relative">
           {/* Ledger Background */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

          <div className="p-8 border-b border-brand-maroon/10 flex gap-6 bg-brand-maroon/5 relative z-10 backdrop-blur-sm">
            {['all', 'confirmed', 'waitlist'].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
                  filter === t 
                    ? 'bg-brand-maroon text-brand-ivory border-brand-maroon shadow-md' 
                    : 'text-brand-maroon/60 border-brand-maroon/10 hover:border-brand-maroon/30 hover:bg-brand-maroon/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-brand-maroon/40 uppercase tracking-[0.4em] font-black bg-brand-maroon/5 sticky top-0 z-10 backdrop-blur-md">
                  <th className="px-10 py-5 border-b border-brand-maroon/10">Guest Entry</th>
                  <th className="px-6 py-5 border-b border-brand-maroon/10">Schedule / Seat</th>
                  <th className="px-6 py-5 border-b border-brand-maroon/10">Status</th>
                  <th className="px-6 py-5 border-b border-brand-maroon/10">Station</th>
                  <th className="px-10 py-5 text-right border-b border-brand-maroon/10">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-maroon/10">
                <AnimatePresence mode="popLayout">
                  {filteredReservations.map((res) => (
                    <motion.tr 
                      key={res.id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-brand-maroon/5 transition-colors group"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-full bg-brand-maroon text-brand-ivory flex items-center justify-center border-4 border-white shadow-xl group-hover:bg-brand-gold transition-colors duration-500">
                            <User size={20} />
                          </div>
                          <div>
                            <div className="font-heading font-black text-brand-maroon text-xl tracking-tighter italic uppercase">{res.name}</div>
                            <div className="text-[10px] text-brand-maroon/40 flex items-center gap-2 font-black tracking-widest mt-1">
                              <Phone size={10} className="text-brand-gold" /> {res.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-black">
                        <div className="flex flex-col">
                          <span className="font-mono text-brand-maroon text-base tracking-tighter">{res.time}</span>
                          <span className="text-[9px] text-brand-maroon/40 uppercase tracking-[0.4em] mt-1 italic">{res.guests} GUESTS</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-[0.3em] border-2 shadow-sm ${
                          res.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-700/20' :
                          res.status === 'active' ? 'bg-blue-50 text-blue-700 border-blue-700/20' :
                          res.status === 'waitlist' ? 'bg-brand-gold/5 text-brand-gold border-brand-gold/20' :
                          'bg-brand-maroon/5 text-brand-maroon/40 border-brand-maroon/10'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            res.status === 'confirmed' ? 'bg-emerald-500' :
                            res.status === 'active' ? 'bg-blue-500' :
                            res.status === 'waitlist' ? 'bg-brand-gold' :
                            'bg-brand-maroon/20'
                          }`} />
                          {res.status}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-[10px] font-black text-brand-maroon/60 uppercase tracking-[0.2em] italic underline decoration-brand-gold/40 underline-offset-4">{res.tablePreference || 'Main Hall'}</span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end gap-3 transition-all duration-500">
                          <button className="px-6 py-2 rounded-sm bg-brand-maroon text-brand-ivory text-[9px] font-black uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors shadow-lg shadow-brand-maroon/10 border-2 border-brand-maroon">
                            Arrive
                          </button>
                          <button className="w-10 h-10 rounded-full bg-brand-maroon/5 border border-brand-maroon/10 flex items-center justify-center text-brand-maroon/40 hover:text-brand-maroon hover:border-brand-maroon transition-all">
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
