import { useState } from 'react';
import { Trash2, Users, Clock, 
   
   
  Map as MapIcon, 
  Layers, 
  Info,
  Calendar,
  Beer,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TableStatus = 'available' | 'occupied' | 'reserved' | 'dirty';

interface Table {
  id: string;
  name: string;
  seats: number;
  status: TableStatus;
  guest?: string;
  time?: string;
}

const TABLES: Table[] = [
  { id: '101', name: 'T-101', seats: 4, status: 'occupied', guest: 'Arjun Reddy', time: '1h 12m' },
  { id: '102', name: 'T-102', seats: 2, status: 'available' },
  { id: '103', name: 'T-103', seats: 6, status: 'reserved', guest: 'Maya K.', time: '19:30' },
  { id: '201', name: 'B-01', seats: 2, status: 'occupied', guest: 'Self', time: '45m' },
  { id: '202', name: 'B-02', seats: 2, status: 'dirty' },
  { id: '301', name: 'D-01', seats: 8, status: 'occupied', guest: 'Corporate Group', time: '2h 05m' },
];

export default function FloorManagement() {
  const [activeFloor, setActiveFloor] = useState('Ground Floor');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case 'available': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'occupied': return 'bg-copper/10 text-copper border-copper/20';
      case 'reserved': return 'bg-gold/10 text-gold border-gold/20';
      case 'dirty': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    }
  };

  return (
    <div className="h-full flex gap-8 overflow-hidden">
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-serif font-bold text-ivory">Floor Blueprint</h3>
            <p className="text-smoke text-sm font-sans tracking-tight">Real-time spatial distribution and table velocity</p>
          </div>
          <div className="flex gap-4">
            <div className="flex bg-base border border-iron/30 p-1 rounded-2xl">
              {['Ground Floor', 'The Deck', 'VIP Lounge'].map(floor => (
                <button 
                  key={floor}
                  onClick={() => setActiveFloor(floor)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeFloor === floor ? 'bg-gold text-base gold-glow shadow-lg shadow-gold/10' : 'text-smoke hover:bg-white/5'
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>
            <button className="p-3 bg-surface border border-iron/30 rounded-2xl text-smoke hover:text-gold transition-colors">
               <Layers size={20} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-8 items-center px-6 py-4 bg-surface/50 border border-iron/10 rounded-3xl">
          {[
            { label: 'Available', color: 'bg-emerald-500' },
            { label: 'Occupied', color: 'bg-copper' },
            { label: 'Reserved', color: 'bg-gold' },
            { label: 'Dirty', color: 'bg-rose-500' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-smoke">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Map Area */}
        <div className="flex-1 bg-base/50 border border-iron/30 rounded-[3rem] p-12 relative overflow-hidden group/map shadow-inner">
          <div className="grid grid-cols-4 gap-12 relative z-10">
            {TABLES.map(table => (
              <motion.button
                key={table.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTable(table)}
                className={`aspect-square rounded-[2.5rem] p-6 border-2 flex flex-col items-center justify-center gap-3 transition-all relative ${
                  selectedTable?.id === table.id 
                    ? 'ring-4 ring-gold/20 border-gold bg-gold/5' 
                    : `${getStatusColor(table.status)} hover:bg-white/5`
                }`}
              >
                <div className="absolute top-4 left-4 text-[10px] font-black opacity-50">{table.name}</div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all ${
                   table.status === 'occupied' ? 'bg-copper/20 border-copper/30' : 
                   table.status === 'reserved' ? 'bg-gold/20 border-gold/30 gold-glow' :
                   'bg-base/30 border-iron/30'
                }`}>
                  {table.status === 'occupied' ? <Users size={28} /> : table.status === 'reserved' ? <Calendar size={28} /> : <Beer size={28} className="opacity-40" />}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest">{table.seats} Seats</div>
                {table.guest && (
                  <div className="mt-2 text-[8px] font-black uppercase tracking-[0.2em] bg-black/20 px-3 py-1 rounded-full border border-white/5">{table.guest}</div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Map Decorative Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
             <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
             <div className="absolute bottom-10 right-10 scale-150 rotate-12"><MapIcon size={400} /></div>
          </div>
        </div>
      </div>

      {/* Detail Sidebar */}
      <div className="w-[380px] flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {selectedTable ? (
            <motion.div 
              key={selectedTable.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-surface border border-iron/30 rounded-[3rem] p-10 flex-1 flex flex-col shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => setSelectedTable(null)} className="text-smoke hover:text-ivory transition-colors"><MoreVertical size={24} /></button>
              </div>

              <div className="mb-10">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border mb-6 ${getStatusColor(selectedTable.status)}`}>
                   {selectedTable.status}
                </div>
                <h4 className="text-5xl font-serif font-black text-ivory tracking-tighter mb-1">{selectedTable.name}</h4>
                <p className="text-smoke text-sm font-sans underline decoration-gold/30 underline-offset-8 decoration-2">Premium Seating • Station 01</p>
              </div>

              <div className="space-y-8 flex-1">
                {selectedTable.guest ? (
                  <div className="space-y-6">
                    <div className="p-6 bg-base/50 border border-iron/30 rounded-3xl relative overflow-hidden group">
                      <p className="text-[10px] font-black text-smoke uppercase tracking-[0.2em] mb-4">Current Occupant</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif font-bold text-xl">{selectedTable.guest.charAt(0)}</div>
                        <div>
                          <p className="font-serif font-bold text-lg text-ivory">{selectedTable.guest}</p>
                          <p className="text-[10px] text-smoke uppercase font-black tracking-widest">LOYALTY TIER: VIP</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity"><Info size={16} /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-base/30 border border-iron/10 rounded-2xl">
                         <Clock size={20} className="text-gold mb-3" />
                         <p className="text-[9px] font-black text-smoke uppercase tracking-widest leading-none">Elapsed Time</p>
                         <p className="text-xl font-serif font-bold text-ivory mt-1">{selectedTable.time}</p>
                      </div>
                      <div className="p-5 bg-base/30 border border-iron/10 rounded-2xl">
                         <Users size={20} className="text-copper mb-3" />
                         <p className="text-[9px] font-black text-smoke uppercase tracking-widest leading-none">Party Size</p>
                         <p className="text-xl font-serif font-bold text-ivory mt-1">{selectedTable.seats} Seats</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-40 py-20">
                     <div className="w-20 h-20 rounded-full border-2 border-dashed border-iron/50 flex items-center justify-center"><Users size={32} /></div>
                     <p className="text-xs font-black uppercase tracking-[0.2em] max-w-[200px] leading-loose">Select a guest or reserve this station</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-10 mt-auto border-t border-iron/10">
                {selectedTable.status === 'dirty' ? (
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-5 rounded-2xl bg-emerald-500 text-base text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20"
                  >
                    CLEAN & OPEN
                  </motion.button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button whileTap={{ scale: 0.95 }} className="py-4 rounded-2xl bg-base border border-iron/50 text-[9px] font-black uppercase tracking-[0.2em] text-smoke flex items-center justify-center gap-2 hover:text-ivory">
                      <Trash2 size={16} /> VOID
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} className="py-4 rounded-2xl bg-gold text-base text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 gold-glow shadow-lg shadow-gold/20">
                      <CheckCircle2 size={16} strokeWidth={3} /> ACTIONS
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
             <div className="bg-surface/30 border border-iron/10 border-dashed rounded-[3rem] p-10 flex-1 flex flex-col items-center justify-center text-center space-y-8 opacity-50">
                <div className="w-32 h-32 rounded-full bg-base border border-iron/30 flex items-center justify-center text-smoke"><Info size={48} strokeWidth={1} /></div>
                <div>
                  <h5 className="font-serif font-bold text-2xl text-ivory mb-2">Station Selector</h5>
                  <p className="text-xs font-sans text-smoke max-w-[240px] leading-relaxed">Select a table on the map to manage status or view guest intelligence.</p>
                </div>
             </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
