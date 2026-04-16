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
  <div className="bg-surface border border-iron/30 p-6 rounded-2xl hover:border-gold/30 transition-colors gold-glow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-base rounded-xl border border-iron/50">
        <Icon size={24} className="text-gold" />
      </div>
      <div className={isPositive ? "text-status-success" : "text-status-warning"}>
        <div className="flex items-center text-xs font-bold gap-0.5">
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-smoke text-sm font-medium tracking-tight uppercase">{title}</h3>
      <p className="text-2xl font-serif font-bold mt-1 text-ivory">{value}</p>
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
        {/* Main Chart Area (Mock) */}
        <div className="lg:col-span-2 bg-surface border border-iron/30 rounded-3xl p-8 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-ivory uppercase tracking-tighter">Occupancy Heatmap</h3>
              <p className="text-smoke text-sm font-sans underline decoration-gold/30 underline-offset-4">Real-time table distribution across floors</p>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-lg text-smoke">
              <MoreVertical size={20} />
            </button>
          </div>
          
          <div className="h-64 w-full flex items-end gap-2 px-2 relative z-10">
            {[40, 65, 80, 55, 90, 100, 85, 45, 60, 75, 95, 80].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-gold/10 border border-gold/30 rounded-t-lg transition-all duration-700 group-hover:bg-gold/40 group-hover:translate-y-[-4px]"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[10px] text-zinc-600 font-mono tracking-tighter">{12 + i}:00</span>
              </div>
            ))}
          </div>
          
          <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
            <Beer size={320} className="text-gold" />
          </div>
        </div>

        {/* Side List: Top Selling Brews */}
        <div className="bg-surface border border-iron/30 rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-serif font-bold mb-6 text-ivory uppercase">Top Selling Brews</h3>
          <div className="space-y-6">
            {[
              { name: 'Toit Weiss', volume: '124 L', share: 32 },
              { name: 'Basmati Blonde', volume: '98 L', share: 25 },
              { name: 'Dark Knight', volume: '72 L', share: 18 },
              { name: 'Tintin Toit', volume: '45 L', share: 12 },
              { name: 'Seasonal: Mango Ale', volume: '30 L', share: 8 },
            ].map((brew, i) => (
              <div key={i} className="space-y-2 group">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-ivory group-hover:text-gold transition-colors">{brew.name}</span>
                  <span className="text-gold font-mono text-xs">{brew.volume}</span>
                </div>
                <div className="h-1.5 w-full bg-base rounded-full overflow-hidden border border-iron/30 p-[1px]">
                  <div 
                    className="h-full bg-gradient-to-r from-copper to-gold transition-all duration-[1.5s] ease-out shadow-[0_0_10px_rgba(212,155,53,0.4)]" 
                    style={{ width: `${brew.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-iron/50 text-sm font-bold text-smoke hover:border-gold hover:text-ivory hover:bg-gold/5 transition-all uppercase tracking-widest">
            Inventory Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}
