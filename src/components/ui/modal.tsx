'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface ModalContentProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  return (
    <Dialog open={open} onClose={() => onOpenChange?.(false)}>
      {children}
    </Dialog>
  );
};

const ModalTrigger = ({ asChild, children }: ModalTriggerProps) => {
  if (asChild) {
    return <DialogTrigger asChild>{children}</DialogTrigger>;
  }
  return <DialogTrigger>{children}</DialogTrigger>;
};

const ModalContent = ({ className, children }: ModalContentProps) => {
  return (
    <DialogContent className={cn('sm:max-w-[425px]', className)}>
      {children}
    </DialogContent>
  );
};

const ModalHeader = ({ className, children }: ModalHeaderProps) => {
  return (
    <DialogHeader className={cn('space-y-1.5 pb-4', className)}>
      {children}
    </DialogHeader>
  );
};

const ModalTitle = ({ className, children }: ModalTitleProps) => {
  return (
    <DialogTitle className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
      {children}
    </DialogTitle>
  );
};

const ModalDescription = ({ className, children }: ModalDescriptionProps) => {
  return (
    <DialogDescription className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </DialogDescription>
  );
};

const ModalClose = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
};

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
