import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Beer, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, isPositive, icon: Icon }: StatCardProps) => (
  <div className="bg-white/40 backdrop-blur-sm border border-brand-maroon/20 p-6 rounded-sm hover:border-brand-gold/50 transition-all group relative overflow-hidden shadow-sm hover:shadow-md">
    {/* Metallic Accent Line */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
    
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-brand-maroon/5 rounded-sm border border-brand-maroon/10 group-hover:bg-brand-gold/10 transition-colors">
        <Icon size={20} className="text-brand-maroon group-hover:text-brand-gold transition-colors" />
      </div>
      <div className={isPositive ? "text-emerald-700" : "text-brand-maroon"}>
        <div className="flex items-center text-[10px] font-black uppercase tracking-widest gap-0.5">
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-brand-maroon/60 text-[10px] font-black tracking-[0.2em] uppercase mb-1">{title}</h3>
      <p className="text-3xl font-heading font-black text-brand-maroon tracking-tighter leading-none">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Daily Revenue" 
          value="₹1,24,500" 
          change="+12.5%" 
          isPositive={true} 
          icon={TrendingUp} 
        />
        <StatCard 
          title="Total Guests" 
          value="342" 
          change="+8.2%" 
          isPositive={true} 
          icon={Users} 
        />
        <StatCard 
          title="Pints Poured" 
          value="890" 
          change="-2.4%" 
          isPositive={false} 
          icon={Beer} 
        />
        <StatCard 
          title="Avg. Table Time" 
          value="1h 45m" 
          change="+5.0%" 
          isPositive={true} 
          icon={Clock} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm border border-brand-maroon/10 rounded-sm p-10 relative overflow-hidden shadow-sm">
           {/* Ledger Pattern Background */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="text-2xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic">Occupancy Heatmap</h3>
              <p className="text-brand-maroon/40 text-[9px] font-black uppercase tracking-[0.3em] mt-1 italic italic underline decoration-brand-gold/40 underline-offset-8">Real-time table distribution across floors</p>
            </div>
            <button className="p-3 hover:bg-brand-maroon/5 rounded-full text-brand-maroon/40 transition-colors border border-brand-maroon/10">
              <MoreVertical size={20} />
            </button>
          </div>
          
          <div className="h-64 w-full flex items-end gap-3 px-4 relative z-10">
            {[40, 65, 80, 55, 90, 100, 85, 45, 60, 75, 95, 80].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div 
                  className="w-full bg-brand-maroon/5 border border-brand-maroon/10 rounded-sm transition-all duration-700 group-hover:bg-brand-gold/30 group-hover:border-brand-gold/50 group-hover:translate-y-[-4px]"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[9px] text-brand-maroon/30 font-black tracking-widest uppercase">{12 + i}:00</span>
              </div>
            ))}
          </div>
          
          <div className="absolute -bottom-20 -right-20 opacity-[0.05] pointer-events-none rotate-12">
            <Beer size={420} className="text-brand-maroon" />
          </div>
        </div>

        {/* Side List: Top Selling Brews */}
        <div className="bg-brand-maroon text-brand-ivory border border-brand-maroon rounded-sm p-10 shadow-2xl relative overflow-hidden">
           {/* Dark Grain Texture */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

          <h3 className="text-2xl font-heading font-black mb-8 text-brand-gold uppercase tracking-tighter italic relative z-10">Top Selling Brews</h3>
          <div className="space-y-8 relative z-10">
            {[
              { name: 'Toit Weiss', volume: '124 L', share: 32 },
              { name: 'Basmati Blonde', volume: '98 L', share: 25 },
              { name: 'Dark Knight', volume: '72 L', share: 18 },
              { name: 'Tintin Toit', volume: '45 L', share: 12 },
              { name: 'Seasonal: Mango Ale', volume: '30 L', share: 8 },
            ].map((brew, i) => (
              <div key={i} className="space-y-3 group">
                <div className="flex justify-between items-end">
                  <span className="font-brand font-black text-sm uppercase tracking-wide group-hover:text-brand-gold transition-colors">{brew.name}</span>
                  <span className="text-brand-gold font-mono text-[10px] font-black border border-brand-gold/30 px-2 py-0.5 rounded-sm">{brew.volume}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <div 
                    className="h-full bg-brand-gold transition-all duration-[1.5s] ease-out shadow-[0_0_15px_rgba(253,185,19,0.5)]" 
                    style={{ width: `${brew.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-4 rounded-sm border border-brand-gold/30 text-[10px] font-black text-brand-gold hover:bg-brand-gold hover:text-brand-maroon transition-all uppercase tracking-[0.4em] relative z-10">
            Internal Audit
          </button>
        </div>
      </div>
    </div>
  );
}
