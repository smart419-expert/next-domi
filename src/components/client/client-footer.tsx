'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  HelpCircle,
  Shield,
  Heart
} from 'lucide-react';
import { VirginMoneyLogo } from '@/components/ui/virgin-money-logo';

interface ClientFooterProps {
  className?: string;
}

export function ClientFooter({ className }: ClientFooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <VirginMoneyLogo 
              size="md" 
              text="portal"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('client.footer.description')}
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Mail className="h-4 w-4 mr-1" />
                {t('client.footer.email')}
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Phone className="h-4 w-4 mr-1" />
                {t('client.footer.call')}
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('client.footer.quick_links')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t('client.footer.dashboard')}
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t('client.footer.documents')}
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t('client.footer.messages')}
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t('client.footer.billing')}
                </Button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('client.footer.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  {t('client.footer.help_center')}
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {t('client.footer.live_chat')}
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t('client.footer.contact_support')}
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t('client.footer.faq')}
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('client.footer.contact_us')}</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@clientportal.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>{t('client.footer.live_chat_available')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>&copy; {currentYear} {t('client.footer.all_rights_reserved')}</span>
              <Button variant="ghost" className="p-0 h-auto text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                {t('client.footer.privacy_policy')}
              </Button>
              <Button variant="ghost" className="p-0 h-auto text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                {t('client.footer.terms_of_service')}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{t('client.footer.made_with')}</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>{t('client.footer.for_our_clients')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
