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
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10"
    >
      <div className="flex justify-between items-end bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="relative z-10">
          <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic leading-none">Campaign Engine</h3>
          <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
            <div className="w-4 h-[1px] bg-brand-maroon/20" />
            Curating Secondary Revenue & Guest Loyalty
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-brand-maroon text-brand-ivory px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-brand-maroon/20 border-2 border-brand-maroon"
        >
          <Plus size={20} strokeWidth={3} />
          Forge Campaign
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Active Now', value: '03', icon: Zap, color: 'text-brand-gold' },
          { label: 'Scheduled', value: '12', icon: Calendar, color: 'text-brand-maroon/40' },
          { label: 'Collections', value: '₹42.5k', icon: Tag, color: 'text-brand-maroon/60' },
          { label: 'Conversion', value: '18%', icon: Percent, color: 'text-emerald-700', trend: '+2.4%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-sm border border-brand-maroon/10 p-8 rounded-sm hover:border-brand-gold/50 transition-all shadow-sm relative overflow-hidden group">
            <stat.icon className={`${stat.color} mb-6 group-hover:scale-110 transition-transform duration-500`} size={32} strokeWidth={3} />
            <h4 className="text-[10px] font-black text-brand-maroon/30 uppercase tracking-[0.3em] italic mb-2">Metrics: {stat.label}</h4>
            <p className="text-3xl font-heading font-black text-brand-maroon tracking-tighter uppercase italic leading-none">{stat.value}</p>
            {stat.trend && (
              <div className="mt-4 text-[9px] font-black text-emerald-700 flex items-center gap-2 italic">
                <ArrowUpRight size={12} strokeWidth={3} /> {stat.trend} YIELD
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white/80 backdrop-blur-md border border-brand-maroon/10 rounded-sm overflow-hidden shadow-sm relative">
         {/* Ledger texture */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

        <div className="p-10 border-b border-brand-maroon/10 bg-brand-maroon/5 flex justify-between items-center relative z-10">
          <h4 className="font-heading font-black text-2xl text-brand-maroon uppercase tracking-tighter italic">Promotion Registry</h4>
          <div className="flex gap-4">
            {['All', 'Active', 'Scheduled'].map(tab => (
              <button key={tab} className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                tab === 'All' ? 'bg-brand-maroon text-brand-ivory border-brand-maroon' : 'text-brand-maroon/40 border-transparent hover:border-brand-maroon/10'
              }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-brand-maroon/10 relative z-10">
          {MOCK_OFFERS.map((offer) => (
            <motion.div 
              key={offer.id} 
              whileHover={{ backgroundColor: "rgba(128,0,0,0.02)" }}
              className="p-10 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-10">
                <div className={`w-16 h-16 rounded-sm flex items-center justify-center border-4 border-white shadow-xl transition-all group-hover:bg-brand-gold duration-500 ${
                  offer.type === 'Happy Hour' ? 'bg-brand-gold/10 text-brand-gold' :
                  offer.type === 'BOGO' ? 'bg-brand-maroon/10 text-brand-maroon' :
                  offer.type === 'Loyalty' ? 'bg-emerald-700/10 text-emerald-700' :
                  'bg-brand-maroon/5 text-brand-maroon/20'
                }`}>
                  <Zap size={28} strokeWidth={3} />
                </div>
                <div>
                  <h5 className="font-heading font-black text-2xl text-brand-maroon mb-2 tracking-tighter uppercase italic leading-none group-hover:text-brand-gold transition-colors">{offer.title}</h5>
                  <div className="flex items-center gap-8">
                    <span className="text-[10px] font-black text-brand-maroon/30 uppercase tracking-[0.3em] flex items-center gap-3 italic">
                      <Calendar size={14} className="text-brand-gold" strokeWidth={3} /> {offer.validity}
                    </span>
                    <span className="text-[11px] font-mono text-brand-gold font-black px-4 py-1.5 bg-brand-gold/5 rounded-sm border-2 border-brand-gold/20 shadow-sm italic">
                      {offer.discount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className={`px-5 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] border-2 shadow-sm italic ${
                  offer.status === 'active' ? 'bg-emerald-700/10 text-emerald-700 border-emerald-700/20' :
                  offer.status === 'scheduled' ? 'bg-brand-maroon/5 text-brand-maroon/20 border-brand-maroon/10' :
                  'bg-brand-maroon/5 text-brand-maroon/10 border-brand-maroon/5 opacity-50'
                }`}>
                  {offer.status}
                </div>
                <button className="w-12 h-12 flex items-center justify-center hover:bg-brand-maroon/5 rounded-full transition-all text-brand-maroon/10 hover:text-brand-maroon">
                  <MoreVertical size={24} strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
