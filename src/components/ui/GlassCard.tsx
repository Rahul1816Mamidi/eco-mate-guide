
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default'
}) => {
  const baseStyles = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg";
  
  const variants = {
    default: 'glass ' + baseStyles,
    light: 'glass-light ' + baseStyles + ' bg-white/80 dark:bg-gray-800/50',
    dark: 'glass-dark ' + baseStyles + ' bg-gray-900/80 dark:bg-gray-900/80 text-white'
  };

  return (
    <div
      className={cn(
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
