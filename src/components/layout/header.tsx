'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Menu, Bell, Search, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLayout } from './layout-context';
import { useAuth } from '@/contexts/auth-context';

interface HeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  className?: string;
}

export function Header({ onMenuClick, isSidebarOpen, className }: HeaderProps) {
  const [notifications, setNotifications] = React.useState(3);
  const { isSidebarCollapsed } = useLayout();
  const { user, logout } = useAuth();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm',
        'h-16 flex items-center justify-between px-4 lg:px-6',
        'lg:ml-16', // Default collapsed width
        !isSidebarCollapsed && 'lg:ml-64', // Expanded width
        className
      )}
      role="banner"
    >
      {/* Left side - Menu button and search */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-slate-700"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-slate-900 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Right side - Controls and user menu */}
      <div className="flex items-center space-x-4">
        {/* Theme and Language Controls */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LanguageSelector />
        </div>

        {/* Notifications and Settings */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="relative text-slate-500 hover:text-slate-700"
            aria-label={`Notifications (${notifications} unread)`}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-700"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">
              {user?.name || 'Guest User'}
            </p>
            <p className="text-xs text-slate-500">
              {user?.email || 'Not signed in'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar
              name={user?.name || 'Guest'}
              size="sm"
              className="cursor-pointer hover:ring-2 hover:ring-ring transition-all"
            />
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-slate-500 hover:text-slate-700"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
