import React from 'react';
import { motion, useSpring } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LiquidFillCardProps {
  title: string;
  subtitle: string;
  abv: string;
  ibu: string;
  description: string;
  image?: string;
  className?: string;
  theme?: 'light' | 'dark';
}

const LiquidFillCard: React.FC<LiquidFillCardProps> = ({
  title,
  subtitle,
  abv,
  ibu,
  description,
  image,
  className,
  theme = 'dark'
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Spring animation for the liquid level
  const fillLevel = useSpring(isHovered ? 100 : 0, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001
  });

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-[4px] overflow-hidden transition-all duration-700",
        theme === 'dark' ? "bg-brand-surface border-white/5" : "bg-white border-brand-maroon/10 shadow-sm",
        isHovered ? (theme === 'dark' ? "border-brand-amber/30 -translate-y-2 amber-glow" : "border-brand-maroon/30 -translate-y-2 shadow-xl") : "",
        className
      )}
    >
      {/* The Liquid Layer */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-t from-brand-amber/20 via-brand-amber/10 to-transparent origin-bottom"
        style={{ scaleY: fillLevel.get() / 100 }}
      />

      {/* Foam Head Detail (Subtle line at the top of the liquid) */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-brand-foam/40 z-10 blur-[1px]"
        style={{ 
          bottom: `${fillLevel.get()}%`,
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 p-8 space-y-6">
        <div className="aspect-[4/5] relative overflow-hidden rounded-[2px] bg-brand-stout/50 mb-8 border border-white/5">
          {image ? (
             <img 
               src={image} 
               alt={title} 
               className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110"
             />
          ) : (
             <div className="w-full h-full flex items-center justify-center opacity-20">
               <div className="w-16 h-24 border-2 border-brand-amber rounded-t-xl overflow-hidden relative">
                 <div className="absolute inset-x-0 bottom-0 bg-brand-amber h-1/2" />
               </div>
             </div>
          )}
          
          {/* Glass Condensation Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <h3 className={cn(
              "text-3xl font-heading font-black transition-colors duration-500",
              theme === 'dark' ? "text-brand-ivory group-hover:text-brand-amber" : "text-brand-maroon group-hover:text-black"
            )}>
              {title}
            </h3>
            <span className={cn(
              "text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-[2px]",
              theme === 'dark' ? "text-brand-smoke border-brand-iron" : "text-brand-maroon border-brand-maroon/20"
            )}>
              {abv}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-amber">
            {subtitle}
          </p>
        </div>

        <p className={cn(
          "text-sm leading-relaxed font-light italic opacity-80 group-hover:opacity-100 transition-opacity",
          theme === 'dark' ? "text-brand-smoke" : "text-brand-maroon/70"
        )}>
          "{description}"
        </p>

        <div className={cn(
          "pt-6 border-t flex items-center justify-between",
          theme === 'dark' ? "border-white/5" : "border-brand-maroon/5"
        )}>
          <div className="flex gap-4">
             <div className="flex flex-col">
               <span className="text-[8px] uppercase tracking-widest text-brand-smoke">IBU</span>
               <span className={cn("text-xs font-bold font-sans", theme === 'dark' ? "text-brand-ivory" : "text-brand-maroon")}>{ibu}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[8px] uppercase tracking-widest text-brand-smoke">MALT</span>
               <span className={cn("text-xs font-bold font-sans", theme === 'dark' ? "text-brand-ivory" : "text-brand-maroon")}>HERITAGE</span>
             </div>
          </div>
          <button className={cn(
            "text-[10px] uppercase tracking-widest font-black transition-colors",
            theme === 'dark' ? "text-brand-amber hover:text-brand-ivory" : "text-brand-maroon hover:text-black"
          )}>
            Tasting Notes +
          </button>
        </div>
      </div>

      {/* Decorative Corner Brass Detail */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-brass/20 m-2 group-hover:border-brand-amber/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand-brass/20 m-2 group-hover:border-brand-amber/50 transition-colors" />
    </motion.div>
  );
};

export default LiquidFillCard;
