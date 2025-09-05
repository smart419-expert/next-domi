'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: {
    title: 'text-xl font-semibold',
    description: 'text-sm text-muted-foreground',
  },
  md: {
    title: 'text-2xl font-semibold',
    description: 'text-base text-muted-foreground',
  },
  lg: {
    title: 'text-3xl font-bold',
    description: 'text-lg text-muted-foreground',
  },
};

export function PageTitle({ 
  title, 
  description, 
  children, 
  className, 
  size = 'md' 
}: PageTitleProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className={cn('text-slate-900', sizeClasses[size].title)}>
            {title}
          </h1>
          {description && (
            <p className={cn('text-slate-600', sizeClasses[size].description)}>
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex items-center space-x-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
