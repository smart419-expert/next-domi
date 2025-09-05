'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';
import { 
  LogOut, 
  Menu, 
  Bell, 
  Settings,
  User,
  ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ClientHeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  className?: string;
}

export function ClientHeader({ onMenuClick, isSidebarOpen, className }: ClientHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <header className={`bg-white border-b border-gray-200 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Client Portal</span>
            </div>
          </div>

          {/* Right side - Notifications and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-gray-500 hover:text-gray-700"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 hover:bg-gray-50"
              >
                <Avatar
                  name={user?.name || 'Client'}
                  size="sm"
                  className="cursor-pointer"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium">{user?.name || 'Client User'}</div>
                  <div className="text-xs text-gray-500">{user?.email || 'client@example.com'}</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">{user?.name || 'Client User'}</div>
                    <div className="text-xs text-gray-500">{user?.email || 'client@example.com'}</div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
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
