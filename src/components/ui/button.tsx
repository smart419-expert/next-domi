import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient' | 'gradient-purple' | 'gradient-blue' | 'gradient-green' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md',
      destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md',
      outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700',
      secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      ghost: 'hover:bg-slate-100 text-slate-700',
      link: 'underline-offset-4 hover:underline text-blue-600',
      gradient: 'btn-gradient',
      'gradient-purple': 'btn-gradient-purple',
      'gradient-blue': 'btn-gradient-blue',
      'gradient-green': 'btn-gradient-green',
      success: 'btn-success',
      warning: 'btn-warning',
      danger: 'btn-danger',
      info: 'btn-info',
    };

    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-11 px-8 rounded-md',
      icon: 'h-10 w-10',
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <div className="spinner mr-2" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
