import { useState, useEffect } from 'react';
import { 
  BarChart3,
  TrendingUp, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ChevronDown,
  Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { supabase } from '../../../../lib/supabase';

interface RevenueData {
  date: string;
  gross_revenue: number;
  footfall: number;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: revData } = await supabase
      .from('daily_revenue')
      .select('*')
      .order('date', { ascending: true })
      .limit(30);

    if (revData && revData.length > 0) {
      // Format dates for charting
      setData(revData.map(d => ({
        ...d,
        date: new Date(d.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
      })));
    } else {
      // Fallback mock data if DB not seeded
      setData([
        { date: 'Apr 01', gross_revenue: 125000, footfall: 180 },
        { date: 'Apr 02', gross_revenue: 132000, footfall: 195 },
        { date: 'Apr 03', gross_revenue: 185000, footfall: 240 },
        { date: 'Apr 04', gross_revenue: 290000, footfall: 410 },
        { date: 'Apr 05', gross_revenue: 350000, footfall: 490 },
        { date: 'Apr 06', gross_revenue: 145000, footfall: 210 },
      ]);
    }
    setLoading(false);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface/90 backdrop-blur border border-iron p-4 rounded-xl shadow-2xl">
          <p className="text-smoke text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
          <p className="text-gold font-serif font-black text-xl">₹{payload[0].value.toLocaleString()}</p>
          <p className="text-zinc-400 font-sans text-xs mt-1">Footfall: {payload[0].payload.footfall}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 h-full flex flex-col"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-serif font-bold text-ivory">Business Intelligence</h3>
          <p className="text-smoke text-sm font-sans tracking-tight">Deciphering the data behind the Toit experience</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-base border border-iron/30 rounded-xl text-[10px] font-black uppercase tracking-widest text-smoke hover:text-ivory hover:border-ivory/30 transition-all">
            <Calendar size={16} className="text-gold/50" /> 
            Last 30 Days
            <ChevronDown size={14} />
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-2.5 bg-gold text-base rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-gold/20 transition-all gold-glow"
          >
            <Download size={16} strokeWidth={3} />
            Export Audit
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Gross Revenue', value: '₹24,82,500', trend: '+18.4%', trendUp: true, icon: TrendingUp, color: 'text-gold' },
          { label: 'Avg. Check Value', value: '₹3,450', trend: '+5.2%', trendUp: true, icon: Wallet, color: 'text-copper' },
          { label: 'Lifetime Value', value: '₹12,800', trend: '-1.2%', trendUp: false, icon: BarChart3, color: 'text-smoke' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-iron/30 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-gold/30 transition-all gold-glow flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 bg-base border border-iron/30 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.trendUp ? 'text-status-success' : 'text-smoke'}`}>
                {stat.trendUp ? <ArrowUpRight size={14} /> : null} {stat.trend}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black font-sans text-smoke uppercase tracking-[0.2em]">{stat.label}</h4>
              <p className="text-3xl font-serif font-bold text-ivory mt-2 tracking-tight">{stat.value}</p>
            </div>
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-5 rounded-full ${stat.color.replace('text-', 'bg-')}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Revenue Trend Chart */}
        <div className="bg-surface border border-iron/30 rounded-[2.5rem] p-10 flex flex-col shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h4 className="font-serif font-bold text-xl text-ivory tracking-tight">Revenue Trajectory</h4>
            <div className="flex gap-2 bg-base p-1 rounded-xl border border-iron/30">
              {['D', 'W', 'M'].map(t => (
                <button key={t} className={`w-8 h-8 rounded-lg text-[10px] font-black flex items-center justify-center transition-all ${
                  t === 'M' ? 'bg-gold text-base shadow-lg shadow-gold/10' : 'text-smoke hover:bg-white/5'
                }`}>{t}</button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-h-[250px] relative z-10 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-smoke font-black uppercase tracking-widest text-xs animate-pulse">Loading Audit...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D49B35" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D49B35" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#332E2A" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#968F88" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => value.split(' ')[0]} 
                  />
                  <YAxis 
                    stroke="#968F88" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="gross_revenue" 
                    stroke="#D49B35" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,155,53,0.05),transparent)] pointer-events-none" />
        </div>

        {/* Server Performance Leaderboard */}
        <div className="bg-surface border border-iron/30 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
          <div className="p-8 border-b border-iron/10 flex justify-between items-center bg-base/30">
            <h4 className="font-serif font-bold text-xl text-ivory tracking-tight">Staff Proficiency</h4>
            <button className="text-[10px] font-black text-gold uppercase tracking-widest hover:underline transition-all">Export Leaderboard</button>
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[9px] text-smoke uppercase tracking-[0.25em] font-black bg-base/50 sticky top-0 z-10">
                  <th className="px-8 py-5 border-b border-iron/10">Ambassador</th>
                  <th className="px-8 py-5 border-b border-iron/10">Contribution</th>
                  <th className="px-8 py-5 border-b border-iron/10 text-right">Upsell Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-iron/5">
                {[
                  { name: 'John Doe', sales: '₹4,50,000', rate: '24%' },
                  { name: 'Anita Desai', sales: '₹4,12,000', rate: '28%' },
                  { name: 'Siddharth V.', sales: '₹3,80,000', rate: '15%' },
                  { name: 'Maya Kapoor', sales: '₹3,45,000', rate: '12%' },
                  { name: 'Rahul Sharma', sales: '₹2,90,000', rate: '19%' },
                ].map((staff, i) => (
                  <tr key={i} className="hover:bg-ivory/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-serif font-bold text-base text-ivory tracking-tight group-hover:text-gold transition-colors">{staff.name}</div>
                      <div className="text-[9px] text-smoke font-black uppercase tracking-widest mt-0.5">Floor Captain</div>
                    </td>
                    <td className="px-8 py-6 font-mono font-bold text-zinc-400 text-sm">{staff.sales}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 h-1.5 bg-base rounded-full overflow-hidden border border-iron/50">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: staff.rate }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-copper to-gold"
                          />
                        </div>
                        <span className="text-[10px] font-black text-gold border border-gold/30 px-2 py-0.5 rounded bg-gold/5 min-w-[35px] text-center inline-block">{staff.rate}</span>
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
