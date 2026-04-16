import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BreweryHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  theme?: 'light' | 'dark';
}

const BreweryHeading: React.FC<BreweryHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'left',
  className,
  theme = 'dark'
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={cn("flex flex-col gap-4", alignClasses[align], className)}>
      {badge && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.4em] font-black text-brand-amber bg-brand-amber/5 px-4 py-1.5 rounded-full border border-brand-amber/20"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <h2 className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-tight italic",
          theme === 'dark' ? "text-brand-ivory" : "text-brand-maroon"
        )}>
          {title}
        </h2>
        
        {/* Animated Light Response (Underline/Glow) */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '40%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.2, ease: "circOut" }}
          className={cn(
            "h-[2px] bg-gradient-to-r from-brand-amber via-brand-amber/50 to-transparent mt-4",
            align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto mr-0' : ''
          )}
        />
      </motion.div>

      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: theme === 'dark' ? 0.7 : 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className={cn(
            "max-w-xl text-lg font-light leading-relaxed italic",
            theme === 'dark' ? "text-brand-smoke" : "text-brand-maroon/80"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default BreweryHeading;
