import React from 'react';
import { Beer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Custom SVG Social Icons (Gold Circle Style)
const SocialCircle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-maroon hover:bg-brand-ivory transition-colors duration-500">
    {children}
  </div>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48L15.45 11.75z"/></svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-1.8.7-2.1 1.1h-.1V10h-3.4v8.5h3.4v-4.9c0-1.2.1-2.4 1.5-2.4 1.4 0 1.4 1.3 1.4 2.5v4.8h3.4M7 10H3.5v8.5H7V10m-.2-3.2c0-1-.8-1.8-1.8-1.8s-1.8.8-1.8 1.8.8 1.8 1.8 1.8 1.8-.8 1.8-1.8z"/></svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-maroon pt-32 pb-16 relative overflow-hidden font-brand">
      {/* Background Brand Mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-black/5 uppercase pointer-events-none select-none tracking-tighter">
        Toit Brewpub
      </div>

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24 relative z-10"
        >
          
          {/* Column 1: BEER */}
          <div className="space-y-8">
            <h4 className="text-brand-ivory font-black uppercase tracking-[0.3em] text-lg">Beer</h4>
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-black text-brand-ivory/40 tracking-[0.2em]">Our Brews</span>
                <p className="text-sm font-black text-brand-ivory leading-relaxed uppercase">Basmati Blonde</p>
                <p className="text-sm font-black text-brand-ivory leading-relaxed uppercase">India Pale Ale</p>
              </div>
              <ul className="space-y-4">
                {['Tint-In-Wit', 'Red Ale', 'Hefeweizen', 'Nitro Stout', 'The Dark Knight'].map(link => (
                  <li key={link}>
                    <Link to="#" className="text-xs text-brand-ivory/60 hover:text-brand-ivory transition-colors uppercase tracking-[0.2em] font-black underline-offset-4 hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: RESTAURANTS */}
          <div className="space-y-8">
            <h4 className="text-brand-ivory font-black uppercase tracking-[0.3em] text-lg">Restaurants</h4>
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-black text-brand-ivory/40 tracking-[0.2em]">Our Outlets</span>
                <p className="text-sm font-black text-brand-ivory leading-relaxed uppercase">TOIT BANGALORE</p>
                <p className="text-sm font-black text-brand-ivory leading-relaxed uppercase">TOIT PUNE</p>
                <p className="text-sm font-black text-brand-ivory leading-relaxed uppercase">TOIT MUMBAI</p>
              </div>
              <ul className="space-y-4">
                {['FAQs', 'BEER FINDER', 'RESERVATIONS'].map(link => (
                  <li key={link}>
                    <Link to="#" className="text-xs text-brand-ivory/60 hover:text-brand-ivory transition-colors uppercase tracking-[0.2em] font-black underline-offset-4 hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-8">
            <h4 className="text-brand-ivory font-black uppercase tracking-[0.3em] text-lg">Company</h4>
            <div className="space-y-8">
               <div className="space-y-2">
                <p className="text-sm font-black text-brand-ivory leading-relaxed uppercase">About Us</p>
                <p className="text-sm font-black text-brand-ivory leading-relaxed uppercase">Our Food</p>
              </div>
              <ul className="space-y-4">
                {['Partnerships', 'Partner Bars', 'Blog', 'Contact', 'Privacy Policy'].map(link => (
                  <li key={link}>
                    <Link to="#" className="text-xs text-brand-ivory/60 hover:text-brand-ivory transition-colors uppercase tracking-[0.2em] font-black underline-offset-4 hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: CONTACT INFO */}
          <div className="space-y-8">
            <h4 className="text-brand-ivory font-black uppercase tracking-[0.3em] text-lg">Contact Info</h4>
            <ul className="space-y-8">
              {[
                { name: 'Toit Bangalore', mail: 'toitblr@toit.in' },
                { name: 'Toit Pune', mail: 'toitpune@toit.in' },
                { name: 'Toit Mumbai', mail: 'toitmumbai@toit.in' }
              ].map(loc => (
                <li key={loc.name} className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-widest font-black text-brand-ivory/40">{loc.name}</span>
                  <a href={`mailto:${loc.mail}`} className="text-xs text-brand-ivory hover:text-brand-gold transition-colors font-black uppercase">{loc.mail}</a>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>

        {/* Bottom Bar: 1:1 Parity */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex items-center gap-12">
            <div className="flex gap-4">
              {[FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon, LinkedinIcon].map((Icon, idx) => (
                <a key={idx} href="#" className="hover:scale-110 transition-transform">
                  <SocialCircle><Icon /></SocialCircle>
                </a>
              ))}
            </div>
          </div>

          <div className="text-[10px] uppercase font-black tracking-[0.3em] text-center md:text-right space-y-3">
            <p className="text-brand-ivory/40 italic">© Copyright 2026 WWW.TOIT.IN</p>
            <div className="flex items-center justify-center md:justify-end gap-3 opacity-60 hover:opacity-100 transition-all">
               <span className="text-[9px] text-brand-gold font-black tracking-widest">POWERED BY ANALYSE DIGITAL</span>
               <div className="flex items-center gap-1 text-brand-gold font-black text-sm">
                  <span>&lt;</span>
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span>&gt;</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Corner Mask Detail */}
      <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none">
        <Beer size={120} className="text-brand-ivory" />
      </div>
    </footer>
  );
};

export default Footer;
