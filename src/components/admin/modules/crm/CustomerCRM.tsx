import { Search } from 'lucide-react';
import { 
   
   
  UserPlus, 
  Beer, 
  Star, 
  History, 
  Mail, 
  Phone,
  Filter,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  totalSpend: string;
  favoriteBrew: string;
  tier: 'VIP' | 'Regular' | 'Frequent';
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Arjun Reddy', email: 'arjun@example.com', phone: '+91 9988776655', visits: 42, totalSpend: '₹84,200', favoriteBrew: 'Toit Weiss', tier: 'VIP' },
  { id: '2', name: 'Sophia Chen', email: 'sophia@example.com', phone: '+91 8877665544', visits: 15, totalSpend: '₹22,400', favoriteBrew: 'Dark Knight', tier: 'Frequent' },
  { id: '3', name: 'Michael Scott', email: 'mike@dundermifflin.com', phone: '+91 7766554433', visits: 3, totalSpend: '₹4,500', favoriteBrew: 'Basmati Blonde', tier: 'Regular' },
  { id: '4', name: 'Priya Mani', email: 'priya@example.com', phone: '+91 6655443322', visits: 28, totalSpend: '₹56,100', favoriteBrew: 'Toit Weiss', tier: 'VIP' },
];

export default function CustomerCRM() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex justify-between items-end bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="relative z-10">
          <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic leading-none">Guest Intelligence</h3>
          <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
            <div className="w-4 h-[1px] bg-brand-maroon/20" />
            Registry of Toit Regulars & Elite Profiles
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-maroon/40 group-focus-within:text-brand-maroon transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search Profiles..." 
              className="bg-white/40 border-2 border-brand-maroon/5 rounded-sm pl-12 pr-6 py-4 text-[11px] font-black uppercase tracking-widest text-brand-maroon focus:border-brand-maroon/40 outline-none transition-all w-72 placeholder:text-brand-maroon/10"
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-brand-maroon text-brand-ivory px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-brand-maroon/20 border-2 border-brand-maroon"
          >
            <UserPlus size={18} strokeWidth={3} />
            New Entry
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* CRM Stats Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-sm border border-brand-maroon/10 p-10 rounded-sm shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8 border-b border-brand-maroon/10 pb-6">
              <div className="h-[2px] w-4 bg-brand-gold" />
              <h4 className="text-[10px] font-black text-brand-maroon/40 uppercase tracking-[0.3em]">Audits</h4>
            </div>
            <div className="space-y-10">
              <div className="flex items-center justify-between group/stat">
                <span className="text-[10px] font-black text-brand-maroon/60 uppercase tracking-widest">Active Members</span>
                <span className="font-heading font-black text-3xl text-brand-maroon uppercase italic tracking-tighter leading-none">1,240</span>
              </div>
              <div className="flex items-center justify-between group/stat">
                <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">VIP Elite</span>
                <span className="font-heading font-black text-4xl text-brand-gold uppercase italic tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(253,185,19,0.3)]">84</span>
              </div>
              <div className="flex items-center justify-between group/stat">
                <span className="text-[10px] font-black text-brand-maroon/40 uppercase tracking-widest italic">Growth</span>
                <span className="font-mono font-black text-xl text-emerald-700 italic">+12%</span>
              </div>
            </div>
            <button className="w-full mt-12 py-4 rounded-sm bg-brand-maroon/5 border-2 border-brand-maroon/10 text-[10px] font-black uppercase tracking-[0.4em] text-brand-maroon/40 hover:text-brand-maroon hover:border-brand-maroon transition-all italic">
              Configure Tiers
            </button>
          </div>
          
          <div className="bg-brand-maroon text-brand-ivory border-2 border-brand-maroon p-10 rounded-sm relative overflow-hidden group shadow-xl">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

            <Star className="text-brand-gold mb-6 group-hover:rotate-12 transition-transform duration-700 relative z-10" size={32} />
            <h4 className="font-heading font-black text-2xl text-brand-gold uppercase tracking-tighter mb-2 italic relative z-10 leading-none">Elite Campaign</h4>
            <p className="text-[11px] text-brand-ivory/60 leading-relaxed mb-8 font-black uppercase tracking-wider italic relative z-10">Dispatching VIP invitations for the "Toit Night" Stout launch.</p>
            <div className="space-y-3 relative z-10">
               <div className="h-1 bg-white/10 rounded-full overflow-hidden p-[1px]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-full bg-brand-gold shadow-[0_0_15px_rgba(253,185,19,0.5)]" 
                />
              </div>
              <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.3em] text-right italic">65% Reached</p>
            </div>
          </div>
        </div>

        {/* Customer List: The Guest Archive */}
        <div className="lg:col-span-3 bg-white/80 backdrop-blur-md border border-brand-maroon/10 rounded-sm overflow-hidden flex flex-col shadow-sm relative">
           {/* Ledger texture */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

          <div className="p-8 border-b border-brand-maroon/10 flex gap-4 bg-brand-maroon/5 items-center overflow-x-auto scrollbar-hide relative z-10">
            <button className="p-3 bg-white border border-brand-maroon/10 rounded-sm text-brand-maroon/20 hover:text-brand-maroon transition-all"><Filter size={18} strokeWidth={3} /></button>
            <div className="h-8 w-[1px] bg-brand-maroon/10 mx-2" />
            {['All Guests', 'Elite (VIP)', 'Frequent', 'Regular'].map(t => (
              <button key={t} className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
                t === 'All Guests' ? 'bg-brand-maroon text-brand-ivory border-brand-maroon shadow-md' : 'text-brand-maroon/40 border-brand-maroon/10 hover:border-brand-maroon hover:bg-brand-maroon/5'
              }`}>
                {t}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto grow custom-scrollbar relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-brand-maroon/40 uppercase tracking-[0.4em] font-black bg-brand-maroon/5 sticky top-0 z-10 backdrop-blur-md">
                  <th className="px-10 py-5 border-b border-brand-maroon/10">Archive Profile</th>
                  <th className="px-10 py-5 border-b border-brand-maroon/10">Registry Rank</th>
                  <th className="px-10 py-5 border-b border-brand-maroon/10">Palate Log</th>
                  <th className="px-10 py-5 text-right border-b border-brand-maroon/10">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-maroon/10">
                {MOCK_CUSTOMERS.map((cus) => (
                  <tr key={cus.id} className="hover:bg-brand-maroon/5 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-sm flex items-center justify-center font-heading font-black text-2xl border-4 border-white shadow-xl transition-all group-hover:bg-brand-gold duration-500 italic ${
                          cus.tier === 'VIP' ? 'bg-brand-maroon text-brand-ivory' : 'bg-brand-maroon/5 text-brand-maroon/20'
                        }`}>
                          {cus.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-heading font-black text-2xl text-brand-maroon tracking-tighter uppercase italic group-hover:text-brand-gold transition-colors leading-none mb-1">{cus.name}</div>
                          <div className="text-[10px] text-brand-maroon/40 font-black tracking-widest uppercase italic">{cus.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                          <span className={`px-4 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-[0.3em] border-2 shadow-sm ${
                            cus.tier === 'VIP' ? 'bg-brand-gold text-brand-maroon border-brand-gold' :
                            cus.tier === 'Frequent' ? 'bg-brand-maroon/10 text-brand-maroon border-brand-maroon/20' :
                            'bg-brand-maroon/5 text-brand-maroon/40 border-brand-maroon/10'
                          }`}>
                            {cus.tier}
                          </span>
                          <span className="font-mono text-base font-black text-brand-maroon italic">{cus.totalSpend}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] text-brand-maroon/40 font-black uppercase tracking-[0.4em] italic pl-0.5">
                          <History size={10} className="text-brand-gold" /> {cus.visits} ENTRIES
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4 group/brew">
                        <div className="w-10 h-10 rounded-full bg-brand-maroon/5 border border-brand-maroon/10 flex items-center justify-center group-hover/brew:border-brand-gold/50 transition-all">
                          <Beer size={18} className="text-brand-gold" />
                        </div>
                        <span className="text-[11px] font-black text-brand-maroon uppercase tracking-widest italic">{cus.favoriteBrew}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-3 transition-all duration-500">
                        <button className="w-12 h-12 rounded-sm bg-brand-maroon/5 border-2 border-brand-maroon/5 text-brand-maroon/40 hover:text-brand-maroon hover:border-brand-maroon transition-all flex items-center justify-center"><Mail size={18} strokeWidth={3} /></button>
                        <button className="w-12 h-12 rounded-sm bg-brand-maroon/5 border-2 border-brand-maroon/5 text-brand-maroon/40 hover:text-brand-maroon hover:border-brand-maroon transition-all flex items-center justify-center"><Phone size={18} strokeWidth={3} /></button>
                        <button className="w-12 h-12 rounded-sm bg-brand-maroon text-brand-ivory shadow-lg shadow-brand-maroon/20 hover:bg-brand-gold border-2 border-brand-maroon transition-all flex items-center justify-center">
                          <ChevronRight size={20} strokeWidth={4} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
