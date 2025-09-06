'use client';

import { Shield, Menu } from 'lucide-react';
import { VirginMoneyLogo } from '@/components/ui/virgin-money-logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { LanguageSelector } from '@/components/ui/language-selector';

interface LoginHeaderProps {
  className?: string;
}

export function LoginHeader({ className }: LoginHeaderProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200',
        'h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {/* Left side - Logo */}
      <VirginMoneyLogo 
        size="lg" 
        text="domi" 
        onClick={handleLogoClick}
      />

      {/* Right side - Menu button for mobile */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Desktop navigation - could add links here if needed */}
        <div className="hidden lg:flex items-center space-x-6">
          <a 
            href="#features" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t('nav.features')}
          </a>
          <a 
            href="#pricing" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t('nav.pricing')}
          </a>
          <a 
            href="#contact" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t('nav.contact')}
          </a>
          
          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
