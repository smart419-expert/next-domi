'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Calendar,
  Settings,
  HelpCircle,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/client/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Documents',
    href: '/client/documents',
    icon: FileText,
  },
  {
    name: 'Messages',
    href: '/client/messages',
    icon: MessageSquare,
  },
  {
    name: 'Payments',
    href: '/client/payments',
    icon: CreditCard,
  },
  {
    name: 'Schedule',
    href: '/client/schedule',
    icon: Calendar,
  },
  {
    name: 'Settings',
    href: '/client/settings',
    icon: Settings,
  },
  {
    name: 'Help',
    href: '/client/help',
    icon: HelpCircle,
  },
];

export function ClientSidebar({ isOpen, onClose, className }: ClientSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Client Portal</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "w-full justify-start",
                    isActive 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="text-sm font-medium text-blue-900 mb-1">
                    Need Help?
                  </h4>
                  <p className="text-xs text-blue-700 mb-3">
                    Our support team is here to assist you.
                  </p>
                  <Button size="sm" variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
