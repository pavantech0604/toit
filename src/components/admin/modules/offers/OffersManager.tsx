import { 
  Tag, 
  Calendar, 
  Percent, 
  Zap, 
  MoreVertical,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Offer {
  id: string;
  title: string;
  type: 'Happy Hour' | 'BOGO' | 'Loyalty' | 'Event';
  status: 'active' | 'scheduled' | 'expired';
  discount: string;
  validity: string;
}

const MOCK_OFFERS: Offer[] = [
  { id: '1', title: 'Sunset Happy Hour', type: 'Happy Hour', status: 'active', discount: '20% off all Taps', validity: 'Daily 4-7 PM' },
  { id: '2', title: 'Weekend Brew Brunch', type: 'Event', status: 'scheduled', discount: 'Flat ₹999 unlimited', validity: 'Sundays' },
  { id: '3', title: 'BOGO: Basmati Blonde', type: 'BOGO', status: 'active', discount: 'Buy 1 Get 1', validity: 'Mon-Wed' },
  { id: '4', title: 'VIP Early Access', type: 'Loyalty', status: 'active', discount: '10% Extra Points', validity: 'Permanent' },
];

export default function OffersManager() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-serif font-bold text-ivory">Promotion Engine</h3>
          <p className="text-smoke text-sm font-sans">Crafting secondary revenue streams through curated offers</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gold text-base px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 gold-glow shadow-lg shadow-gold/20 active:scale-95 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          Create Campaign
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Now', value: '03', icon: Zap, color: 'text-gold' },
          { label: 'Scheduled', value: '12', icon: Calendar, color: 'text-smoke' },
          { label: 'Collections', value: '₹42.5k', icon: Tag, color: 'text-smoke' },
          { label: 'Conversion', value: '18%', icon: Percent, color: 'text-emerald-500', trend: '+2.4%' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-iron/30 p-6 rounded-[2rem] hover:border-gold/30 transition-all gold-glow relative overflow-hidden group">
            <stat.icon className={`${stat.color} mb-4 group-hover:scale-110 transition-transform`} size={32} />
            <h4 className="text-[10px] font-black font-sans text-smoke uppercase tracking-widest">{stat.label}</h4>
            <p className="text-3xl font-serif font-bold text-ivory mt-1">{stat.value}</p>
            {stat.trend && (
              <div className="mt-2 text-[10px] font-black text-emerald-500 flex items-center gap-1">
                <ArrowUpRight size={12} /> {stat.trend}
              </div>
            )}
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-10 rounded-full transition-all group-hover:opacity-20 ${stat.color.replace('text-', 'bg-')}`} />
          </div>
        ))}
      </div>

      <div className="bg-surface border border-iron/30 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-iron/10 bg-base/30 flex justify-between items-center">
          <h4 className="font-serif font-bold text-lg text-ivory uppercase tracking-tight">Campaign Intelligence</h4>
          <div className="flex gap-2">
            {['All', 'Active', 'Scheduled'].map(tab => (
              <button key={tab} className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-smoke hover:text-ivory hover:bg-white/5 transition-all">
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-iron/10">
          {MOCK_OFFERS.map((offer) => (
            <motion.div 
              key={offer.id} 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              className="p-8 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${
                  offer.type === 'Happy Hour' ? 'bg-gold/10 text-gold border-gold/20' :
                  offer.type === 'BOGO' ? 'bg-copper/10 text-copper border-copper/20' :
                  offer.type === 'Loyalty' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                  'bg-smoke/10 text-smoke border-smoke/20'
                }`}>
                  <Zap size={28} />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-xl text-ivory mb-1 tracking-tight">{offer.title}</h5>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-smoke uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} className="text-gold/50" /> {offer.validity}
                    </span>
                    <span className="text-xs font-mono text-gold font-bold px-3 py-1 bg-gold/5 rounded-full border border-gold/10">
                      {offer.discount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                  offer.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                  offer.status === 'scheduled' ? 'bg-smoke/10 text-smoke border-smoke/30' :
                  'bg-rose-500/10 text-rose-500 border-rose-500/30'
                }`}>
                  {offer.status}
                </div>
                <button className="p-3 hover:bg-white/5 rounded-2xl transition-all text-smoke hover:text-ivory border border-transparent hover:border-iron/30">
                  <MoreVertical size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
