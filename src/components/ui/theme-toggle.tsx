'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { Button } from './button';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300"
        aria-label={`Current theme: ${theme}`}
      >
        {(() => {
          const currentTheme = themes.find(t => t.value === theme);
          const IconComponent = currentTheme?.icon;
          return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
        })()}
      </Button>
      
      <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`w-full flex items-center px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
              theme === themeOption.value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-gray-300'
            }`}
          >
            <themeOption.icon className="h-4 w-4 mr-2" />
            {themeOption.label}
          </button>
        ))}
      </div>
    </div>
  );
}
