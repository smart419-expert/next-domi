'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from './button';

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguage = languages.find(lang => lang.code === language);

  // Force re-render when language changes
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', handleLanguageChange);
      return () => {
        window.removeEventListener('languageChanged', handleLanguageChange);
      };
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: 'en' | 'es') => {
    console.log('Language selector clicked:', langCode);
    console.log('Current language before change:', language);
    setLanguage(langCode);
    console.log('Language set to:', langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-500 hover:text-slate-700 flex items-center space-x-1 min-w-0 p-1 sm:p-2"
        aria-label={`Current language: ${currentLanguage?.name}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
        <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{currentLanguage?.flag}</span>
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 sm:mt-2 w-36 sm:w-48 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-left hover:bg-slate-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 whitespace-nowrap ${
                language === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-gray-300'
              }`}
            >
              <span className="mr-1 sm:mr-2 flex-shrink-0">{lang.flag}</span>
              <span className="truncate">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
