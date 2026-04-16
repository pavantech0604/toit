import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'copper' | 'outline' | 'success';
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'gold'
}) => {
  const variants = {
    gold: 'bg-brand-gold/10 text-brand-gold border-brand-gold/30',
    copper: 'bg-brand-copper/10 text-brand-copper border-brand-copper/30',
    outline: 'border-brand-iron/50 text-brand-smoke hover:border-brand-gold hover:text-brand-gold',
    success: 'bg-green-500/10 text-green-400 border-green-500/30',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest border transition-all duration-300',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
