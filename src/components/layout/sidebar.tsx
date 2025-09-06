'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { VirginMoneyLogo } from '@/components/ui/virgin-money-logo';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Shield,
  Smartphone,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onClose?: () => void;
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigation: NavItem[] = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/clients',
    label: 'Clients',
    icon: Users,
    badge: '4',
  },
  {
    href: '/admin/payments',
    label: 'Payments',
    icon: CreditCard,
  },
  {
    href: '/admin/investments',
    label: 'Investments',
    icon: TrendingUp,
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export function Sidebar({ 
  isOpen, 
  isCollapsed, 
  onToggleCollapse, 
  onClose, 
  className 
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-white border-r border-slate-200 shadow-sm',
          'transition-all duration-300 ease-in-out',
          'flex flex-col',
          isCollapsed ? 'w-16' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          {!isCollapsed && (
            <VirginMoneyLogo 
              size="md" 
              text="platform" 
              onClick={() => router.push('/')}
            />
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="hidden lg:flex text-slate-500 hover:text-slate-700"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2" role="navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                  isCollapsed && 'justify-center'
                )}
                onClick={onClose}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0', isCollapsed && 'mx-auto')} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {isCollapsed && item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white">
          {!isCollapsed && (
            <div className="text-xs text-slate-500">
              <p>Version 1.0.0</p>
              <p>© 2024 VApps Platform</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
