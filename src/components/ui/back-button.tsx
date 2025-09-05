import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function BackButton({ href, children, className }: BackButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 ${className}`}
    >
      <Link href={href}>
        <ArrowLeft className="h-4 w-4" />
        {children}
      </Link>
    </Button>
  );
}
