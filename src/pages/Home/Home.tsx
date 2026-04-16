import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../../components/ui/Button';
import BreweryHeading from '../../components/shared/BreweryHeading';
import LiquidFillCard from '../../components/shared/LiquidFillCard';
import { ArrowDown, Play } from 'lucide-react';

import heroImg from '../../assets/hero.png';

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 2: Manifesto Scroll Transforms
  const manifestoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: manifestoScroll } = useScroll({
    target: manifestoRef,
    offset: ["start end", "center center"]
  });
  
  const textFill = useTransform(manifestoScroll, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative bg-brand-ivory">
      
      {/* 01. Official Ivory Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-ivory">
        {/* Layered Parallax Background - Light Theme */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, 100]) }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 opacity-60 brightness-110"
            style={{ backgroundImage: `url(${heroImg})` }}
          />
          {/* Official Parchment/Ivory Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ivory/40 via-transparent to-brand-ivory" />
          
          {/* Ambient Brewery Dust / Haze (Light) */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white blur-[150px] rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-32">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <h1 className="text-7xl md:text-[160px] font-heading font-black leading-[1] text-brand-maroon italic tracking-tighter drop-shadow-sm">
                Crafted for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-maroon via-brand-amber to-brand-maroon">the Bold.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.8, duration: 2 }}
              className="text-lg md:text-xl text-brand-maroon/60 font-brand font-bold max-w-2xl leading-relaxed italic"
            >
              Experience the award-winning alchemy of Toit, where industrial heritage meets the future of brewing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6"
            >
              <Button size="xl" variant="maroon" className="bg-brand-maroon text-brand-ivory hover:bg-black">Book a Table</Button>
              <button className="flex items-center gap-4 text-brand-maroon group hover:text-brand-gold transition-all">
                <div className="w-14 h-14 rounded-full border border-brand-maroon/20 flex items-center justify-center group-hover:border-brand-gold/50 transition-colors bg-white/40 backdrop-blur-sm">
                  <Play size={20} fill="currentColor" />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] font-black font-brand">Our Story</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Cue */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="h-16 w-[1px] bg-gradient-to-b from-brand-maroon/30 to-transparent" />
          <ArrowDown size={14} className="text-brand-maroon/40" />
        </motion.div>
      </section>

      {/* 02. Official "We Are Toit" Manifesto (Light Version) */}
      <section ref={manifestoRef} className="relative py-64 bg-brand-ivory overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-20">
            <BreweryHeading 
              badge="MANIFESTO"
              title="We Are Toit."
              align="center"
              theme="light"
            />
            
            <div className="relative">
              <h3 className="text-4xl md:text-[80px] font-heading font-black leading-tight text-brand-maroon/[0.05] select-none text-center italic">
                Come by. Try everything twice. Learn, love, linger, stagger, slur, whatever. We are Toit. You should be too.
              </h3>
              
              <motion.h3 
                style={{ clipPath: `inset(0 ${100 - parseFloat(textFill.get().toString())}% 0 0)` }}
                className="absolute inset-0 text-4xl md:text-[80px] font-heading font-black leading-tight text-brand-maroon text-center italic pointer-events-none"
              >
                Come by. Try everything twice. Learn, love, linger, stagger, slur, whatever. We are Toit. You should be too.
              </motion.h3>
            </div>

            <div className="flex justify-center pt-10">
              <Button variant="outline" size="md" className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-brand-ivory">Our Roots</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Signature Beers (Ivory Grid) */}
      <section className="py-32 relative bg-brand-ivory">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
            <BreweryHeading 
              badge="THE TAPROOM"
              title="Signature Creations."
              subtitle="The beers we've been perfecting for over a decade, each brewed with local soul and industrial precision."
              theme="light"
            />
            <Button variant="ghost" className="text-brand-maroon group">
              View Digital Ledger <ArrowDown size={14} className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <LiquidFillCard 
              title="Tint-In-Wit"
              subtitle="Belgian Style Wit"
              abv="4.5%"
              ibu="12"
              description="A crisp, refreshing wheat beer with subtle hints of coriander and bitter orange peel."
              image="https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=1000&auto=format&fit=crop"
              theme="light"
            />
            <LiquidFillCard 
              title="Nitro Stout"
              subtitle="Industrial Dry Stout"
              abv="5.2%"
              ibu="28"
              description="Creamy, coffee-forward, and served on nitro for that signature velvet waterfall finish."
              image="https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=1000&auto=format&fit=crop"
              className="lg:-mt-12"
              theme="light"
            />
            <LiquidFillCard 
              title="Indie IPA"
              subtitle="Heritage Pale Ale"
              abv="6.8%"
              ibu="45"
              description="Boldly hopped with tropical notes. A Bangalore favorite for a reason."
              image="https://images.unsplash.com/photo-1550341335-961ad15144d6?q=80&w=1000&auto=format&fit=crop"
              theme="light"
            />
          </div>
        </div>
      </section>

      {/* Other sections would follow same light parchment theme... */}
    </div>
  );
};

export default HomePage;
