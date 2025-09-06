'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { 
  LogOut, 
  Menu, 
  Bell, 
  Settings,
  User,
  ChevronDown
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { VirginMoneyLogo } from '@/components/ui/virgin-money-logo';
import toast from 'react-hot-toast';

interface ClientHeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  className?: string;
}

export function ClientHeader({ onMenuClick, isSidebarOpen, className }: ClientHeaderProps) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
    router.push('/login');
  };

  return (
    <header className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <VirginMoneyLogo 
              size="lg" 
              text="portal" 
              onClick={() => router.push('/')}
            />
          </div>

          {/* Right side - Notifications, Theme Toggle and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Selector */}
            <LanguageSelector />

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Avatar
                  name={user?.name || 'Client'}
                  size="sm"
                  className="cursor-pointer"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Usuario Cliente'}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'client@example.com'}</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Usuario Cliente'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'client@example.com'}</div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {t('client.dashboard.settings')}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('client.dashboard.logout')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
