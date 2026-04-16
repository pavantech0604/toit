import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import toitLogo from '../assets/toit-logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-copper/5 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-iron/30 rounded-[32px] p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 mb-6 drop-shadow-2xl">
            <img src={toitLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-serif text-3xl font-black text-ivory uppercase tracking-tighter">STAFF PORTAL</h1>
          <p className="text-smoke text-sm mt-2 font-sans">Enter the industrial command center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gold uppercase tracking-[0.2em] pl-1">Identiy</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-gold transition-colors" size={20} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="w-full bg-base border border-iron/50 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-gold transition-all text-ivory placeholder:text-zinc-800 font-medium" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gold uppercase tracking-[0.2em] pl-1">Access Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-gold transition-colors" size={20} />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-base border border-iron/50 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-gold transition-all text-ivory placeholder:text-zinc-800 font-medium" 
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs py-3 px-4 rounded-xl text-center font-bold"
            >
              {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold text-base py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 gold-glow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                AUTHENTICATE <ArrowRight size={20} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-iron/20 text-center">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>

      {/* Footer Grain Overlay (Local) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] grain-overlay" />
    </div>
  );
}
