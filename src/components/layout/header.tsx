'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Menu, Bell, Search, Settings, LogOut, ChevronDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLayout } from './layout-context';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  className?: string;
}

export function Header({ onMenuClick, isSidebarOpen, className }: HeaderProps) {
  const [notifications, setNotifications] = React.useState(3);
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);
  const { isSidebarCollapsed } = useLayout();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-slate-900 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Right side - Controls and user menu */}
      <div className="flex items-center space-x-4">
        {/* Desktop: Theme and Language Controls */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <LanguageSelector />
        </div>

        {/* Desktop: Notifications and Settings */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="relative text-slate-500 hover:text-slate-700"
            aria-label={`Notifications (${notifications} unread)`}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-1 h-[15px] w-[15px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center p-1">
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

        {/* Desktop: User Info */}
        <div className="hidden md:flex items-center space-x-3">
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
                onClick={handleLogout}
                className="text-slate-500 hover:text-slate-700"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile: User Avatar Dropdown */}
        <div className="md:hidden relative user-dropdown-container">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg p-2 transition-all duration-200"
          >
            <div className="relative">
              <Avatar
                name={user?.name || 'Guest'}
                size="sm"
                className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200"
              />
              {/* Notification Badge on Avatar */}
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg border-2 border-white">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </div>
          </Button>

          {/* Dropdown Menu */}
          {showUserDropdown && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-4 z-50 animate-in slide-in-from-top-2 duration-200">
              {/* User Info Section */}
              <div className="px-6 pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <Avatar
                    name={user?.name || 'Guest'}
                    size="lg"
                    className="ring-2 ring-blue-500 ring-offset-2"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-slate-900 truncate">
                      {user?.name || 'Guest User'}
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                      {user?.email || 'Not signed in'}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="px-6 py-4 space-y-3">
                {/* Theme and Language */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Theme & Language</span>
                  <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <LanguageSelector />
                  </div>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Notifications</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative text-slate-500 hover:text-slate-700"
                    aria-label={`Notifications (${notifications} unread)`}
                  >
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications > 9 ? '9+' : notifications}
                      </span>
                    )}
                  </Button>
                </div>

                {/* Settings */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Settings</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-700"
                    aria-label="Settings"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Actions Section */}
              {user && (
                <div className="px-6 pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start text-slate-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
