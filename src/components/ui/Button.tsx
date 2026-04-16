import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: 'amber' | 'brass' | 'ghost' | 'outline' | 'ivory-dark' | 'maroon' | 'primary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  ...props
}) => {
  const variants: Record<string, string> = {
    primary: 'bg-brand-maroon text-brand-ivory hover:bg-black transition-all duration-500 font-bold tracking-[0.2em] uppercase shadow-lg',
    amber: 'bg-brand-amber text-brand-stout hover:bg-brand-foam transition-all duration-500 font-bold tracking-[0.2em] uppercase amber-glow text-shadow-premium',
    brass: 'bg-brand-brass text-brand-foam hover:bg-brand-amber hover:text-brand-stout transition-all duration-500 font-bold tracking-[0.2em] uppercase brass-glow',
    'ivory-dark': 'bg-brand-ivory text-brand-stout hover:bg-brand-amber transition-all duration-500 font-bold tracking-[0.2em] uppercase',
    maroon: 'bg-brand-maroon text-brand-ivory hover:bg-black transition-all duration-500 font-bold tracking-[0.2em] uppercase shadow-lg',
    ghost: 'text-brand-ivory hover:text-brand-amber bg-transparent transition-colors tracking-widest uppercase text-[10px] font-bold',
    outline: 'border border-brand-iron text-brand-ivory hover:border-brand-amber hover:text-brand-amber transition-all uppercase tracking-widest text-[10px] font-bold',
  };

  const sizes = {
    sm: 'px-5 py-2 text-[10px]',
    md: 'px-8 py-3.5 text-xs',
    lg: 'px-12 py-5 text-sm',
    xl: 'px-16 py-6 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative overflow-hidden inline-flex items-center justify-center rounded-[2px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{isLoading ? 'Loading...' : children}</span>
      
      {/* Metallic Shine Hover Effect */}
      {(variant === 'amber' || variant === 'brass' || variant === 'ivory-dark') && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[30deg] translate-x-[-200%]"
          initial={false}
          whileHover={{ translateX: '200%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      
      {/* Subtle Grain Detail */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-grain" />
    </motion.button>
  );
};

export default Button;
