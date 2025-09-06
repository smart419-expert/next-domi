'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface VirginMoneyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  text?: string;
  className?: string;
  onClick?: () => void;
}

export function VirginMoneyLogo({ 
  size = 'md', 
  showText = true, 
  text = 'money',
  className,
  onClick 
}: VirginMoneyLogoProps) {
  const sizeClasses = {
    sm: {
      circle: 'w-8 h-8',
      text: 'text-xs',
      wordmark: 'text-sm'
    },
    md: {
      circle: 'w-10 h-10',
      text: 'text-sm',
      wordmark: 'text-base'
    },
    lg: {
      circle: 'w-12 h-12',
      text: 'text-base',
      wordmark: 'text-lg'
    },
    xl: {
      circle: 'w-16 h-16',
      text: 'text-lg',
      wordmark: 'text-xl'
    }
  };

  const currentSize = sizeClasses[size];

  const LogoContent = (
    <div className={cn('flex items-center space-x-2', className)}>
      {/* Red Circular Emblem */}
      <div className={cn(
        'relative rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg',
        'flex items-center justify-center',
        currentSize.circle
      )}>
        {/* White highlight effect */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm" />
        
        {/* Virgin text in script style */}
        <span className={cn(
          'text-white font-bold relative z-10',
          'font-serif italic tracking-wide',
          currentSize.text
        )}>
          Virgin
        </span>
      </div>

      {/* Wordmark with gradient */}
      {showText && (
        <span className={cn(
          'font-semibold lowercase tracking-wide',
          'bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent',
          currentSize.wordmark
        )}>
          {text}
        </span>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Go to home page"
      >
        {LogoContent}
      </button>
    );
  }

  return LogoContent;
}
