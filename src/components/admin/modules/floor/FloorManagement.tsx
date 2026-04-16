import { useState } from 'react';
import { Trash2, Users, Clock, 
   
   
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
      case 'available': return 'bg-brand-maroon/5 text-brand-maroon/40 border-brand-maroon/10';
      case 'occupied': return 'bg-brand-maroon text-brand-ivory border-brand-maroon shadow-lg';
      case 'reserved': return 'bg-brand-gold text-brand-maroon border-brand-gold shadow-md';
      case 'dirty': return 'bg-brand-maroon/5 text-brand-maroon/20 border-brand-maroon/5 border-dashed';
    }
  };

  return (
    <div className="h-full flex gap-8 overflow-hidden">
      <div className="flex-1 flex flex-col gap-10">
        <div className="flex justify-between items-end bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
          {/* Parchment Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

          <div className="relative z-10">
            <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic leading-none">Bureau Map</h3>
            <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
              <div className="w-4 h-[1px] bg-brand-maroon/20" />
              Spatial Hub & Station Persistence
            </p>
          </div>
          <div className="flex gap-6 relative z-10">
            <div className="flex bg-brand-maroon/5 border-2 border-brand-maroon/10 p-1 rounded-sm backdrop-blur-sm">
              {['Ground Floor', 'The Deck', 'VIP Lounge'].map(floor => (
                <button 
                  key={floor}
                  onClick={() => setActiveFloor(floor)}
                  className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all italic ${
                    activeFloor === floor ? 'bg-brand-maroon text-brand-ivory shadow-xl' : 'text-brand-maroon/40 hover:bg-brand-maroon/5'
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-10 items-center px-10 py-6 bg-white/40 border border-brand-maroon/10 rounded-sm italic">
          {[
            { label: 'OPEN PERSISTENCE', color: 'bg-brand-maroon/10' },
            { label: 'ACTIVE STATION', color: 'bg-brand-maroon' },
            { label: 'RESERVED NODE', color: 'bg-brand-gold' },
            { label: 'ARCHIVE / DIRTY', color: 'bg-brand-maroon/5 border-2 border-brand-maroon/10' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-maroon/40">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Map Area */}
        <div className="flex-1 bg-white/20 border-2 border-brand-maroon/5 rounded-sm p-16 relative overflow-hidden group/map shadow-inner">
           {/* Blueprint Grid */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                style={{backgroundImage: 'radial-gradient(var(--brand-maroon) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />

          <div className="grid grid-cols-4 gap-12 relative z-10">
            {TABLES.map(table => (
              <motion.button
                key={table.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 1 }}
                onClick={() => setSelectedTable(table)}
                className={`aspect-square rounded-sm p-8 border-4 flex flex-col items-center justify-center gap-4 transition-all relative shadow-xl ${
                  selectedTable?.id === table.id 
                    ? 'border-brand-gold bg-brand-maroon shadow-brand-maroon/20 ring-8 ring-brand-gold/10' 
                    : `${getStatusColor(table.status)} hover:brightness-110`
                }`}
              >
                <div className={`absolute top-4 left-4 text-[10px] font-black uppercase italic ${selectedTable?.id === table.id ? 'text-brand-gold' : 'opacity-40'}`}>{table.name}</div>
                <div className={`w-16 h-16 rounded-sm flex items-center justify-center border-2 transition-all duration-500 italic ${
                   table.status === 'occupied' ? 'bg-brand-ivory/10 border-brand-ivory/20' : 
                   table.status === 'reserved' ? 'bg-brand-maroon/10 border-brand-maroon/20' :
                   'bg-white/20 border-brand-maroon/5'
                }`}>
                  {table.status === 'occupied' ? <Users size={32} strokeWidth={selectedTable?.id === table.id ? 4 : 2} className={selectedTable?.id === table.id ? 'text-brand-gold' : ''} /> : 
                   table.status === 'reserved' ? <Calendar size={32} strokeWidth={selectedTable?.id === table.id ? 4 : 2} className={selectedTable?.id === table.id ? 'text-brand-gold' : ''} /> : 
                   <Beer size={32} className="opacity-10" />}
                </div>
                <div className={`text-[9px] font-black uppercase tracking-[0.3em] italic ${selectedTable?.id === table.id ? 'text-brand-gold/40' : 'opacity-40'}`}>{table.seats} UNITS</div>
                {table.guest && (
                  <div className={`mt-4 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm border italic ${selectedTable?.id === table.id ? 'bg-brand-gold text-brand-maroon border-brand-gold' : 'bg-brand-maroon/5 border-brand-maroon/5'}`}>{table.guest}</div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Sidebar */}
      <div className="w-[420px] flex flex-col gap-8">
        <AnimatePresence mode="wait">
          {selectedTable ? (
            <motion.div 
              key={selectedTable.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white/80 backdrop-blur-md border border-brand-maroon/10 rounded-sm p-12 flex-1 flex flex-col shadow-sm relative overflow-hidden"
            >
              {/* Ledger texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

              <div className="absolute top-0 right-0 p-10 relative z-10">
                 <button onClick={() => setSelectedTable(null)} className="text-brand-maroon/20 hover:text-brand-maroon transition-all"><MoreVertical size={28} strokeWidth={3} /></button>
              </div>

              <div className="mb-12 relative z-10">
                <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] border-2 mb-8 italic shadow-sm ${getStatusColor(selectedTable.status)}`}>
                   {selectedTable.status} PERSISTENCE
                </div>
                <h4 className="text-6xl font-heading font-black text-brand-maroon tracking-tighter uppercase italic leading-none mb-2">{selectedTable.name}</h4>
                <p className="text-brand-maroon/40 text-[11px] font-black uppercase tracking-[0.4em] italic flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-brand-maroon/20" />
                  STATION COMMAND 01
                </p>
              </div>

              <div className="space-y-10 flex-1 relative z-10">
                {selectedTable.guest ? (
                  <div className="space-y-8">
                    <div className="p-8 bg-brand-maroon text-brand-ivory border-2 border-brand-maroon rounded-sm relative overflow-hidden group shadow-xl italic">
                       {/* Texture */}
                       <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
                      
                      <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.4em] mb-6 italic opacity-60">REGISTRY GUEST</p>
                      <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-sm bg-brand-gold text-brand-maroon flex items-center justify-center font-heading font-black text-3xl border-4 border-white shadow-xl italic">{selectedTable.guest.charAt(0)}</div>
                        <div>
                          <p className="font-heading font-black text-3xl tracking-tighter uppercase italic leading-none mb-1">{selectedTable.guest}</p>
                          <p className="text-[10px] text-brand-ivory/40 uppercase font-black tracking-[0.3em] italic">LOYALTY RANK: ELITE VIP</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 text-brand-gold/20 group-hover:text-brand-gold transition-colors duration-500"><Info size={20} strokeWidth={3} /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-8 bg-brand-maroon/5 border-2 border-brand-maroon/5 rounded-sm italic hover:border-brand-maroon/20 transition-all">
                         <Clock size={24} className="text-brand-gold mb-4" strokeWidth={3} />
                         <p className="text-[9px] font-black text-brand-maroon/40 uppercase tracking-[0.4em] italic leading-none mb-2">Duration</p>
                         <p className="text-2xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic">{selectedTable.time}</p>
                      </div>
                      <div className="p-8 bg-brand-maroon/5 border-2 border-brand-maroon/5 rounded-sm italic hover:border-brand-maroon/20 transition-all">
                         <Users size={24} className="text-brand-maroon/60 mb-4" strokeWidth={3} />
                         <p className="text-[9px] font-black text-brand-maroon/40 uppercase tracking-[0.4em] italic leading-none mb-2">Units</p>
                         <p className="text-2xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic">{selectedTable.seats} Seats</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 opacity-40 py-24 italic">
                     <div className="w-24 h-24 rounded-full border-4 border-dashed border-brand-maroon/10 flex items-center justify-center"><Users size={40} className="text-brand-maroon" /></div>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] max-w-[200px] leading-loose text-brand-maroon">Awaiting Guest Allocation or Registry Entry</p>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-10 mt-auto border-t border-brand-maroon/10 relative z-10 italic">
                {selectedTable.status === 'dirty' ? (
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 rounded-sm bg-emerald-700 text-brand-ivory text-[11px] font-black uppercase tracking-[0.4em] shadow-xl border-2 border-emerald-800"
                  >
                    FORGE STATION OPEN
                  </motion.button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button whileTap={{ scale: 0.98 }} className="py-5 rounded-sm bg-brand-maroon/5 border-2 border-brand-maroon/5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-maroon/40 flex items-center justify-center gap-3 hover:text-brand-maroon hover:border-brand-maroon transition-all italic">
                      <Trash2 size={18} strokeWidth={3} /> VOID
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.98 }} className="py-5 rounded-sm bg-brand-maroon text-brand-ivory text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl border-2 border-brand-maroon italic hover:bg-brand-gold transition-all">
                      <CheckCircle2 size={18} strokeWidth={4} /> HUB ACTIONS
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
             <div className="bg-white/40 border-4 border-brand-maroon/5 border-dashed rounded-sm p-12 flex-1 flex flex-col items-center justify-center text-center space-y-10 opacity-50 italic">
                <div className="w-36 h-36 rounded-full bg-white border-2 border-brand-maroon/10 flex items-center justify-center text-brand-maroon/10 shadow-inner"><Info size={64} strokeWidth={1} /></div>
                <div>
                  <h5 className="font-heading font-black text-3xl text-brand-maroon uppercase tracking-tighter mb-3 leading-none italic">Station Selector</h5>
                  <p className="text-[10px] font-black text-brand-maroon/40 uppercase tracking-[0.3em] max-w-[240px] leading-loose">Interact with the persistent hub nodes to manage spatial velocity.</p>
                </div>
             </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
