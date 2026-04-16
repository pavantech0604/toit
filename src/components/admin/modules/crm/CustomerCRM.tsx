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
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-ivory">Guest Intelligence</h3>
          <p className="text-smoke text-sm font-sans">Curating personalized hospitality for Toit regulars</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke group-focus-within:text-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by profile, phone..." 
              className="bg-surface border border-iron/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ivory outline-none focus:border-gold shadow-inner transition-all w-72 placeholder:text-zinc-600 font-sans"
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gold text-base px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 gold-glow shadow-lg shadow-gold/10 transition-all"
          >
            <UserPlus size={18} strokeWidth={3} />
            Add Guest
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* CRM Stats Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface border border-iron/30 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <h4 className="text-[10px] font-black text-smoke uppercase tracking-[0.2em] mb-6 border-b border-iron/10 pb-4">Membership Stats</h4>
            <div className="space-y-8">
              <div className="flex items-center justify-between group/stat">
                <span className="text-xs font-bold text-smoke group-hover/stat:text-ivory transition-colors">Total Members</span>
                <span className="font-serif font-bold text-xl text-ivory">1,240</span>
              </div>
              <div className="flex items-center justify-between group/stat">
                <span className="text-xs font-bold text-gold">VIP Tier</span>
                <span className="font-serif font-bold text-2xl text-gold drop-shadow-[0_0_10px_rgba(212,155,53,0.3)]">84</span>
              </div>
              <div className="flex items-center justify-between group/stat">
                <span className="text-xs font-bold text-smoke">Monthly Gain</span>
                <span className="font-serif font-bold text-xl text-status-success">+12%</span>
              </div>
            </div>
            <button className="w-full mt-10 py-3.5 rounded-2xl bg-base border border-iron/50 text-[10px] font-black uppercase tracking-widest text-smoke hover:text-gold hover:border-gold/30 transition-all">
              Configure Tier Perks
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-copper/20 to-base border border-copper/30 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <Star className="text-copper mb-4 group-hover:rotate-12 transition-transform" size={28} />
            <h4 className="font-serif font-bold text-lg text-ivory uppercase tracking-tighter mb-1">Elite Campaign</h4>
            <p className="text-[10px] text-smoke leading-relaxed mb-6 font-sans">Re-engaging 50 VIPs for the "Toit Night" Stout launch.</p>
            <div className="space-y-2">
               <div className="h-1.5 bg-base rounded-full overflow-hidden border border-iron/30">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-full bg-copper shadow-lg shadow-copper/20" 
                />
              </div>
              <p className="text-[9px] font-black text-copper uppercase tracking-widest text-right">65% Dispatched</p>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/5 blur-3xl rounded-full" />
          </div>
        </div>

        {/* Customer List */}
        <div className="lg:col-span-3 bg-surface border border-iron/30 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative">
          <div className="p-6 border-b border-iron/10 flex gap-3 bg-base/20 items-center overflow-x-auto scrollbar-hide">
            <button className="p-3 bg-base border border-iron/30 rounded-xl text-smoke hover:text-gold transition-colors"><Filter size={18} /></button>
            <div className="h-8 w-[1px] bg-iron/30 mx-2" />
            {['All Guests', 'Elite (VIP)', 'Frequent', 'Regular'].map(t => (
              <button key={t} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                t === 'All Guests' ? 'bg-gold text-base border-gold' : 'text-smoke border-iron/50 hover:border-gold hover:text-ivory'
              }`}>
                {t}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto grow custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-smoke uppercase tracking-[0.2em] font-black bg-base/50 sticky top-0 z-10">
                  <th className="px-8 py-5 border-b border-iron/30">Guest Profile</th>
                  <th className="px-8 py-5 border-b border-iron/30">Tier & Engagement</th>
                  <th className="px-8 py-5 border-b border-iron/30">Palate Preference</th>
                  <th className="px-8 py-5 text-right border-b border-iron/30">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-iron/20">
                {MOCK_CUSTOMERS.map((cus) => (
                  <tr key={cus.id} className="hover:bg-ivory/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif font-black text-xl border shadow-inner transition-all group-hover:scale-105 ${
                          cus.tier === 'VIP' ? 'bg-gold text-base border-gold' : 'bg-base text-smoke border-iron/50'
                        }`}>
                          {cus.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-serif font-bold text-lg text-ivory tracking-tight group-hover:text-gold transition-colors">{cus.name}</div>
                          <div className="text-[10px] text-smoke font-sans mt-0.5 tracking-tight">{cus.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                            cus.tier === 'VIP' ? 'bg-gold/10 text-gold border-gold/30 gold-glow' :
                            cus.tier === 'Frequent' ? 'bg-copper/10 text-copper border-copper/30' :
                            'bg-smoke/10 text-smoke border-smoke/30'
                          }`}>
                            {cus.tier}
                          </span>
                          <span className="font-mono text-xs font-black text-ivory">{cus.totalSpend}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-smoke font-black uppercase tracking-widest pl-0.5">
                          <History size={10} className="text-gold/50" /> {cus.visits} Total Visits
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3 group/brew">
                        <div className="p-2 bg-base rounded-lg border border-iron/30 group-hover/brew:border-gold/30 transition-all">
                          <Beer size={16} className="text-gold" />
                        </div>
                        <span className="text-sm font-bold text-ivory font-sans tracking-tight">{cus.favoriteBrew}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button className="p-3 rounded-xl bg-base border border-iron/30 text-smoke hover:text-gold hover:border-gold/30 transition-all"><Mail size={16} /></button>
                        <button className="p-3 rounded-xl bg-base border border-iron/30 text-smoke hover:text-ivory hover:border-ivory/30 transition-all"><Phone size={16} /></button>
                        <button className="p-3 rounded-xl bg-gold text-base gold-glow hover:brightness-110 transition-all">
                          <ChevronRight size={18} strokeWidth={3} />
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
