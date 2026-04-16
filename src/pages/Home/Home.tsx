import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Button from '../../components/ui/Button';
import BreweryHeading from '../../components/shared/BreweryHeading';
import LiquidFillCard from '../../components/shared/LiquidFillCard';
import { ArrowDown, Play } from 'lucide-react';

import heroImg from '../../assets/hero_new.webp';

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const x = useSpring(0, { stiffness: 50, damping: 30 });
  const y = useSpring(0, { stiffness: 50, damping: 30 });

  React.useEffect(() => {
    x.set(mousePos.x);
    y.set(mousePos.y);
  }, [mousePos, x, y]);

  const rotateX = useTransform(y, [0, 1080], [2, -2]);
  const rotateY = useTransform(x, [0, 1920], [-2, 2]);
  const moveX = useTransform(x, [0, 1920], [-10, 10]);
  const moveY = useTransform(y, [0, 1080], [-10, 10]);

  // Section 2: Manifesto view triggers will be handled directly on the element
  const manifestoRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative bg-brand-ivory">
      
      {/* 01. Official Ivory Hero Section */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-brand-ivory pb-8 md:pb-0 pt-0"
      >
        {/* Layered Parallax Background - Light Theme */}
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 0.2], [0, 100]),
            rotateX,
            rotateY,
            scale: 1.05
          }}
          className="absolute inset-0 z-0 bg-brand-stout"
        >
          <motion.div 
            style={{ x: moveX, y: moveY, backgroundImage: `url(${heroImg})` }}
            className="absolute inset-0 bg-cover bg-center brightness-90 transition-all duration-300"
          />
          {/* Subtle top shading only to ensure navbar text is readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent opacity-90" />
          
          {/* Ambient Brewery Dust / Haze / Bokeh */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
             <motion.div 
               style={{ 
                 x: useTransform(x, [0, 1920], [50, -50]),
                 y: useTransform(y, [0, 1080], [50, -50])
               }}
               className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-brand-gold/10 blur-[180px] rounded-full" 
             />
             <motion.div 
               style={{ 
                 x: useTransform(x, [0, 1920], [-80, 80]),
                 y: useTransform(y, [0, 1080], [-80, 80])
               }}
               className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-maroon/10 blur-[150px] rounded-full" 
             />
             
             {/* Tiny Bokeh Particles */}
             {[...Array(6)].map((_, i) => (
               <motion.div
                 key={i}
                 animate={{ 
                   y: [0, -40, 0],
                   opacity: [0.1, 0.4, 0.1],
                   scale: [1, 1.2, 1]
                 }}
                 transition={{ 
                   repeat: Infinity, 
                   duration: 5 + i, 
                   delay: i * 0.5, 
                   ease: "easeInOut" 
                 }}
                 className="absolute rounded-full bg-brand-gold/20 blur-[2px]"
                 style={{
                   width: Math.random() * 8 + 4,
                   height: Math.random() * 8 + 4,
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                 }}
               />
             ))}
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10 pt-[50px] md:pt-[70px]">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-4">
            <motion.div
              className="space-y-4 pt-4"
            >
              <h1 className="text-[75px] md:text-[95px] lg:text-[115px] font-heading font-black leading-[0.8] text-brand-maroon italic tracking-tighter drop-shadow-2xl flex flex-col items-center">
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Crafted for
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-brand-gold bg-gradient-to-b from-brand-gold to-[#D49B35] bg-clip-text text-transparent"
                >
                  the Bold.
                </motion.span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -10, 0] 
              }}
              transition={{ 
                opacity: { delay: 0.6, duration: 0.8 },
                scale: { delay: 0.6, duration: 0.8 },
                y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
              }}
              className="mt-12 mb-10"
            >
              <div className="relative overflow-hidden inline-flex items-center gap-4 px-10 py-3.5 rounded-full border border-brand-gold/25 bg-brand-stout/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                {/* Glossy Shine Effect */}
                <motion.div 
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ repeat: Infinity, duration: 3.5, delay: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                />

                <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-[0_0_15px_#FDB913] animate-pulse relative z-10" />
                
                <p className="relative z-10 text-[12px] md:text-[13px] text-brand-ivory font-brand font-black uppercase tracking-[0.4em] flex items-center">
                  Toit Bangalore 
                  <span className="mx-4 h-4 w-[1px] bg-brand-gold/40" /> 
                  <span className="bg-gradient-to-r from-brand-gold via-[#FFF1CC] to-brand-gold bg-clip-text text-transparent drop-shadow-sm">
                    Indiranagar Branch
                  </span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 relative z-50"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="xl" 
                  variant="maroon" 
                  className="h-[65px] px-12 bg-brand-maroon text-brand-ivory hover:bg-brand-maroon/90 font-black tracking-[0.25em] uppercase rounded-none border-2 border-brand-maroon shadow-[0_12px_30px_rgba(107,14,14,0.3)] transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 text-xs md:text-[13px]">Book a Table</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="h-[65px] px-10 flex items-center justify-center gap-5 text-brand-ivory hover:text-brand-gold transition-all bg-brand-stout/95 border-2 border-brand-ivory/10 hover:border-brand-gold/50 shadow-[0_12px_30px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-9 h-9 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-brand-stout transition-all duration-300">
                  <Play size={12} fill="currentColor" className="ml-1" />
                </div>
                <span className="text-[12px] uppercase tracking-[0.35em] font-black font-brand">Our Story</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Cue with pulsing effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <p className="text-[10px] uppercase tracking-[0.6em] font-black text-brand-maroon/40 rotate-90 origin-left translate-x-3 mb-10 whitespace-nowrap">Scroll to explore</p>
          <motion.div 
             animate={{ height: [40, 80, 40] }}
             transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
             className="w-[1px] bg-gradient-to-b from-brand-maroon/60 to-transparent" 
          />
        </motion.div>
      </section>

      {/* 02. Official "We Are Toit" Manifesto (Light Version) */}
      <section ref={manifestoRef} className="relative py-24 md:py-32 bg-brand-ivory overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            <BreweryHeading 
              badge="MANIFESTO"
              title="We Are Toit."
              align="center"
              theme="light"
            />
            
            <motion.h3 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                }
              }}
              className="text-4xl md:text-[72px] lg:text-[80px] font-heading font-black leading-tight text-brand-maroon text-center italic"
            >
              {"Come by. Try everything twice. Learn, love, linger, stagger, slur, whatever. We are Toit. You should be too.".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h3>

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
