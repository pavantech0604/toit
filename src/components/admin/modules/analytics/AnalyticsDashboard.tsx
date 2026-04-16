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
        <div className="bg-white/90 backdrop-blur-md border-2 border-brand-maroon/20 p-6 rounded-sm shadow-2xl">
          <p className="text-brand-maroon/40 text-[9px] font-black uppercase tracking-[0.3em] mb-3 italic">{label}</p>
          <p className="text-brand-gold font-mono font-black text-2xl tracking-tighter italic">₹{payload[0].value.toLocaleString()}</p>
          <p className="text-brand-maroon/60 font-black uppercase tracking-widest text-[9px] mt-2 italic flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-gold" />
            Footfall: {payload[0].payload.footfall}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 h-full flex flex-col"
    >
      <div className="flex justify-between items-end bg-white/40 p-10 border border-brand-maroon/10 rounded-sm shadow-sm relative overflow-hidden">
        {/* Parchment Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

        <div className="relative z-10">
          <h3 className="text-4xl font-heading font-black text-brand-maroon uppercase tracking-tighter italic leading-none">Intelligence Hub</h3>
          <p className="text-brand-maroon/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
            <div className="w-4 h-[1px] bg-brand-maroon/20" />
            Operational Audit • Station Intel
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <button className="flex items-center gap-3 px-8 py-4 bg-white/40 border-2 border-brand-maroon/10 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-brand-maroon/60 hover:text-brand-maroon hover:border-brand-maroon transition-all">
            <Calendar size={16} className="text-brand-gold" strokeWidth={3} /> 
            Last 30 Days
            <ChevronDown size={14} strokeWidth={3} />
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-8 py-4 bg-brand-maroon text-brand-ivory rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-maroon/20 border-2 border-brand-maroon transition-all"
          >
            <Download size={18} strokeWidth={3} />
            Export Audit
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Gross Revenue', value: '₹24,82,500', trend: '+18.4%', trendUp: true, icon: TrendingUp, color: 'text-brand-gold' },
          { label: 'Avg. Check Value', value: '₹3,450', trend: '+5.2%', trendUp: true, icon: Wallet, color: 'text-brand-gold' },
          { label: 'Lifetime Value', value: '₹12,800', trend: '-1.2%', trendUp: false, icon: BarChart3, color: 'text-brand-maroon/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-sm border border-brand-maroon/10 p-10 rounded-sm relative overflow-hidden group hover:border-brand-gold/50 transition-all shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-8">
              <div className={`p-4 bg-brand-maroon/5 border-2 border-brand-maroon/10 rounded-sm ${stat.color} group-hover:bg-brand-gold/10 group-hover:border-brand-gold/30 transition-all`}>
                <stat.icon size={28} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.trendUp ? 'text-emerald-700' : 'text-brand-maroon/40'}`}>
                {stat.trendUp ? <ArrowUpRight size={14} strokeWidth={3} /> : null} {stat.trend}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-brand-maroon/30 uppercase tracking-[0.4em] italic mb-2">Registry: {stat.label}</h4>
              <p className="text-4xl font-heading font-black text-brand-maroon tracking-tighter uppercase italic leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Revenue Trend Chart */}
        <div className="bg-white/60 backdrop-blur-sm border border-brand-maroon/10 rounded-sm p-10 flex flex-col shadow-sm relative overflow-hidden">
           {/* Ledger texture */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

          <div className="flex justify-between items-center mb-10 relative z-10 border-b border-brand-maroon/10 pb-6">
            <h4 className="font-heading font-black text-2xl text-brand-maroon uppercase tracking-tighter italic">Revenue Trajectory</h4>
            <div className="flex gap-2 bg-brand-maroon/5 p-1.5 rounded-sm border-2 border-brand-maroon/5">
              {['D', 'W', 'M'].map(t => (
                <button key={t} className={`w-10 h-10 rounded-sm text-[10px] font-black flex items-center justify-center transition-all ${
                  t === 'M' ? 'bg-brand-maroon text-brand-ivory shadow-lg' : 'text-brand-maroon/20 hover:text-brand-maroon'
                }`}>{t}</button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px] relative z-10 w-full font-mono">
            {loading ? (
              <div className="h-full flex items-center justify-center text-brand-maroon/20 font-black uppercase tracking-widest text-[10px] animate-pulse italic">Decrypting Station Logs...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D49B35" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#D49B35" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#800000" vertical={false} opacity={0.05} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#800000" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    opacity={0.3}
                    tickFormatter={(value) => value.split(' ')[0]} 
                  />
                  <YAxis 
                    stroke="#800000" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    opacity={0.3}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#D49B35', strokeWidth: 2 }} />
                  <Area 
                    type="monotone" 
                    dataKey="gross_revenue" 
                    stroke="#D49B35" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Server Performance Leaderboard */}
        <div className="bg-white/80 border border-brand-maroon/10 rounded-sm overflow-hidden flex flex-col shadow-sm relative">
           {/* Ledger texture */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

          <div className="p-10 border-b border-brand-maroon/10 flex justify-between items-center bg-brand-maroon/5 relative z-10 backdrop-blur-sm">
            <h4 className="font-heading font-black text-2xl text-brand-maroon uppercase tracking-tighter italic">Staff Proficiency</h4>
            <button className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] hover:text-brand-maroon transition-all italic underline underline-offset-8">Audit Export</button>
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1 relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-brand-maroon/40 uppercase tracking-[0.4em] font-black bg-brand-maroon/5 sticky top-0 z-10 backdrop-blur-md">
                  <th className="px-10 py-5 border-b border-brand-maroon/10">Ambassador</th>
                  <th className="px-10 py-5 border-b border-brand-maroon/10">Registry Yield</th>
                  <th className="px-10 py-5 border-b border-brand-maroon/10 text-right">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-maroon/10">
                {[
                  { name: 'John Doe', sales: '₹4,50,000', rate: '24%' },
                  { name: 'Anita Desai', sales: '₹4,12,000', rate: '28%' },
                  { name: 'Siddharth V.', sales: '₹3,80,000', rate: '15%' },
                  { name: 'Maya Kapoor', sales: '₹3,45,000', rate: '12%' },
                  { name: 'Rahul Sharma', sales: '₹2,90,000', rate: '19%' },
                ].map((staff, i) => (
                  <tr key={i} className="hover:bg-brand-maroon/5 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="font-heading font-black text-xl text-brand-maroon tracking-tighter uppercase italic leading-none group-hover:text-brand-gold transition-colors">{staff.name}</div>
                      <div className="text-[9px] text-brand-maroon/40 font-black uppercase tracking-[0.4em] mt-2 italic">Floor Captain</div>
                    </td>
                    <td className="px-10 py-8 font-mono font-black text-brand-maroon/60 text-base italic">{staff.sales}</td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-5">
                        <div className="w-32 h-1.5 bg-brand-maroon/5 rounded-full overflow-hidden border border-brand-maroon/20 p-[1px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: staff.rate }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-brand-gold shadow-[0_0_15px_rgba(253,185,19,0.3)]" 
                          />
                        </div>
                        <span className="text-[10px] font-black text-brand-gold border-2 border-brand-gold/30 px-3 py-1 rounded-sm bg-brand-gold/5 min-w-[45px] text-center inline-block">{staff.rate}</span>
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
