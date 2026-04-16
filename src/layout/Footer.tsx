import React from 'react';
import { Link } from 'react-router-dom';

// Custom SVG Social Icons (Gold Circle Style matching screenshot)
const SocialCircle = ({
  children,
  href = "#"
}: {
  children: React.ReactNode,
  href?: string
}) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full border-2 border-brand-gold bg-transparent flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-maroon transition-all duration-300"
  >
    {children}
  </a>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48L15.45 11.75z" /></svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-1.8.7-2.1 1.1h-.1V10h-3.4v8.5h3.4v-4.9c0-1.2.1-2.4 1.5-2.4 1.4 0 1.4 1.3 1.4 2.5v4.8h3.4M7 10H3.5v8.5H7V10m-.2-3.2c0-1-.8-1.8-1.8-1.8s-1.8.8-1.8 1.8.8 1.8 1.8 1.8 1.8-.8 1.8-1.8z" /></svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-maroon pt-20 pb-12 relative overflow-hidden font-brand text-brand-ivory border-t-8 border-black/10">
      <div className="container mx-auto px-6 lg:px-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-x-12 mb-20">

          {/* Column 1: BEER */}
          <div className="space-y-6">
            <h4 className="text-[20px] font-black uppercase tracking-widest border-b border-brand-ivory/10 pb-3">Beer</h4>
            <ul className="space-y-3">
              {['Nitro Stout', 'Banger Lager', 'Basmati Blonde', 'India Pale Ale', 'Tint-In-Wit', 'Red Ale', 'Hefeweizen'].map(item => (
                <li key={item}>
                  <Link to="#" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-wider">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: RESTAURANTS & QUICK LINKS */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-[20px] font-black uppercase tracking-widest border-b border-brand-ivory/10 pb-3">Restaurants</h4>
              <ul className="space-y-3">
                {['Toit Bangalore - Mahadevapura', 'Toit Bangalore - Indiranagar', 'Toit Pune', 'Toit Mumbai'].map(item => (
                  <li key={item}>
                    <Link to="#" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-wider">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <Link to="/faq" className="block text-[20px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">FAQs</Link>
              <Link to="/beer-finder" className="block text-[20px] font-black uppercase tracking-widest hover:text-brand-gold transition-colors">Beer Finder</Link>
            </div>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-6">
            <h4 className="text-[20px] font-black uppercase tracking-widest border-b border-brand-ivory/10 pb-3">Company</h4>
            <ul className="space-y-3">
              {['About', 'Food', 'Partnerships', 'Partner Bars & MRP Stores', 'Blog', 'Contact', 'Valet Terms and Conditions', 'Privacy'].map(item => (
                <li key={item}>
                  <Link to="#" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-wider">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACTS DETAILED */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <h5 className="text-[13px] font-black uppercase tracking-widest">Toit Bangalore - Mahadevapura</h5>
                <a href="mailto:toitblr.east@toit.in" className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-brand-gold transition-all">toitblr.east@toit.in</a>
              </div>
              <div className="space-y-1">
                <h5 className="text-[13px] font-black uppercase tracking-widest">Toit Bangalore - Indiranagar</h5>
                <a href="mailto:toitblr@toit.in" className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-brand-gold transition-all">toitblr@toit.in</a>
              </div>
              <div className="space-y-1">
                <h5 className="text-[13px] font-black uppercase tracking-widest">Toit Pune</h5>
                <a href="mailto:toitpune@toit.in" className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-brand-gold transition-all">toitpune@toit.in</a>
              </div>
              <div className="space-y-1">
                <h5 className="text-[13px] font-black uppercase tracking-widest">Toit Mumbai</h5>
                <a href="mailto:toitmumbai@toit.in" className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-brand-gold transition-all">toitmumbai@toit.in</a>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Bottom Bar */}
        <div className="pt-10 border-t border-brand-ivory/5 flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Socials - Bottom Left */}
          <div className="flex gap-4">
            <SocialCircle><FacebookIcon /></SocialCircle>
            <SocialCircle><InstagramIcon /></SocialCircle>
            <SocialCircle><TwitterIcon /></SocialCircle>
            <SocialCircle><YoutubeIcon /></SocialCircle>
            <SocialCircle><LinkedinIcon /></SocialCircle>
          </div>

          {/* Copyright & Powering - Bottom Right */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">© Copyright 2026 WWW.TOIT.IN</p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black tracking-widest text-brand-gold uppercase">Powered by Analyse Digital</span>
              <div className="flex items-center gap-1 text-brand-gold font-bold text-xs">
                <span>&lt;</span>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                <span>&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
