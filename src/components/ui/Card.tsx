import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'oak';
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hoverEffect = true
}) => {
  const baseStyles = "relative rounded-[8px] border border-brand-iron/20 overflow-hidden";
  
  const variants = {
    default: "bg-brand-obsidian",
    elevated: "bg-brand-oak gold-glow",
    oak: "bg-brand-oak border-brand-copper/30",
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(212, 155, 53, 0.1)" } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(baseStyles, variants[variant], className)}
    >
      {/* Top Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />
      
      {children}
    </motion.div>
  );
};

export default Card;
