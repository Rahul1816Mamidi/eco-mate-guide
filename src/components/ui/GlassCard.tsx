
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
  const variants = {
    default: 'glass',
    light: 'glass-light',
    dark: 'glass-dark'
  };

  return (
    <div
      className={cn(
        'rounded-lg shadow-lg',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
