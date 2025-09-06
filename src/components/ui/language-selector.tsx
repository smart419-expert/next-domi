'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from './button';

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-500 hover:text-slate-700"
        aria-label={`Current language: ${currentLanguage?.name}`}
      >
        <Globe className="h-4 w-4 mr-1" />
        {currentLanguage?.flag}
      </Button>
      
      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-64 overflow-y-auto">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              console.log('Language selector clicked:', lang.code);
              setLanguage(lang.code);
            }}
            className={`w-full flex items-center px-3 py-2 text-sm text-left hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}
