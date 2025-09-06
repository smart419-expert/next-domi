'use client';

import { Button } from '@/components/ui/button';
import { User, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useLanguage } from '@/contexts/language-context';

export function DemoLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  const handleDemoLogin = (email: string) => {
    const mockUser = {
      id: email === 'admin@example.com' ? 'admin-1' : 'user-1',
      email,
      name: email === 'admin@example.com' ? t('demo.admin.user_name') : t('demo.client.user_name'),
      role: email === 'admin@example.com' ? 'admin' as const : 'user' as const,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    
    login(mockUser);
    toast.success(`Iniciado sesión como ${email}`);
    // Redirect immediately after login
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          <strong>{t('demo.mode.title')}:</strong> {t('demo.mode.description')}
        </p>
      </div>
      
      {/* Demo Login Buttons with Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Admin Demo */}
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center mb-2">
            <Crown className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <h3 className="font-semibold text-red-800 dark:text-red-300">{t('demo.admin.title')}</h3>
          </div>
          <p className="text-sm text-red-700 dark:text-red-400 mb-3">
            {t('demo.admin.description')}
          </p>
          <ul className="text-xs text-red-600 dark:text-red-400 mb-3 space-y-1">
            <li>• {t('demo.admin.feature1')}</li>
            <li>• {t('demo.admin.feature2')}</li>
            <li>• {t('demo.admin.feature3')}</li>
            <li>• {t('demo.admin.feature4')}</li>
            <li>• {t('demo.admin.feature5')}</li>
          </ul>
          <Button
            onClick={() => handleDemoLogin('admin@example.com')}
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
            variant="default"
          >
            <Crown className="h-4 w-4 mr-2" />
            {t('demo.admin.button')}
          </Button>
        </div>

        {/* Client Demo */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center mb-2">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">{t('demo.client.title')}</h3>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
            {t('demo.client.description')}
          </p>
          <ul className="text-xs text-blue-600 dark:text-blue-400 mb-3 space-y-1">
            <li>• {t('demo.client.feature1')}</li>
            <li>• {t('demo.client.feature2')}</li>
            <li>• {t('demo.client.feature3')}</li>
            <li>• {t('demo.client.feature4')}</li>
            <li>• {t('demo.client.feature5')}</li>
          </ul>
          <Button
            onClick={() => handleDemoLogin('user@example.com')}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            variant="default"
          >
            <User className="h-4 w-4 mr-2" />
            {t('demo.client.button')}
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          <strong>{t('demo.note.title')}</strong> {t('demo.note.description')}
        </p>
      </div>
    </div>
  );
}
