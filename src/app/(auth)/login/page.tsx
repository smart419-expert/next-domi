'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DemoLogin } from '@/components/demo-login';
import { WhatsAppLogin } from '@/components/whatsapp-login';
import { LoginHeader } from '@/components/login-header';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'whatsapp'>('email');
  
  const inviteToken = searchParams.get('invite');
  const supabase = createClient();
  
  // Check if we're using mock authentication
  const isMockAuth = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                    process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url';

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Check if it's a demo account
      if (email === 'admin@example.com' || email === 'user@example.com') {
        // Handle demo account login
        const mockUser = {
          id: email === 'admin@example.com' ? 'admin-1' : 'user-1',
          email,
          name: email === 'admin@example.com' ? t('demo.admin.user_name') : t('demo.client.user_name'),
          role: email === 'admin@example.com' ? 'admin' as const : 'user' as const,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        
        login(mockUser);
        toast.success(`Logged in as ${email}`);
        // Redirect immediately after login
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
        return;
      }

      // Handle real Supabase authentication for other emails
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsMagicLinkSent(true);
        toast.success('Magic link sent! Check your email.');
      }
    } catch (_error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // For demo purposes, simulate Google login with a default user
      const mockUser = {
        id: 'google-user-1',
        email: 'user@example.com',
        name: 'Google User',
        role: 'user' as const,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google'
      };
      
      login(mockUser);
      toast.success('Logged in with Google');
      // Redirect immediately after login
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (_error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAcceptInvite = async () => {
    if (!email || !inviteToken) return;

    setIsLoading(true);
    try {
      // In a real app, you would validate the invite token with your backend
      // For now, we'll just proceed with the magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard?invite=${inviteToken}`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsMagicLinkSent(true);
        toast.success('Invite accepted! Check your email for the magic link.');
      }
    } catch (_error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <LoginHeader />
      
      {/* Main Content */}
      <div className="flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {inviteToken ? 'Accept Invitation' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {inviteToken 
              ? 'Complete your account setup to get started'
              : 'Sign in to your account to continue'
            }
          </p>
          {isMockAuth && <DemoLogin />}
          
          {/* Email Authentication Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📧 {t('demo.email.title')}</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
              {t('demo.email.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center">
                <span className="font-mono bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded mr-2">admin@example.com</span>
                <span className="text-blue-600 dark:text-blue-400">→ {t('demo.email.admin')}</span>
              </div>
              <div className="flex items-center">
                <span className="font-mono bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded mr-2">user@example.com</span>
                <span className="text-blue-600 dark:text-blue-400">→ {t('demo.email.client')}</span>
              </div>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              {t('demo.email.instruction')}
            </p>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {inviteToken ? 'Aceptar Invitación' : t('login.title')}
            </CardTitle>
            <CardDescription className="text-center">
              {inviteToken 
                ? 'Ingresa tu correo para aceptar la invitación'
                : 'Elige tu método de inicio de sesión preferido'
              }
            </CardDescription>
          </CardHeader>

          {/* Login Method Selection */}
          <div className="px-6 pb-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  loginMethod === 'email'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📧 {t('login.method.email')}
              </button>
              <button
                onClick={() => setLoginMethod('whatsapp')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  loginMethod === 'whatsapp'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                💬 {t('login.method.whatsapp')}
              </button>
            </div>
          </div>

          <CardContent className="space-y-6">
            {loginMethod === 'email' ? (
              !isMagicLinkSent ? (
                <>
                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('login.email.label')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('login.email.placeholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Magic Link Button */}
                  <Button
                    onClick={inviteToken ? handleAcceptInvite : handleMagicLink}
                    disabled={!email || isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4 mr-2" />
                    )}
                    {inviteToken ? 'Aceptar Invitación' : t('login.magic_link')}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">{t('login.or')}</span>
                    </div>
                  </div>

                  {/* Google OAuth Button */}
                  <Button
                    variant="outline"
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    className="w-full"
                  >
                    {isGoogleLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    )}
                    {t('login.google')}
                  </Button>
                </>
              ) : (
                /* Success State */
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Revisa tu Correo
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Hemos enviado un enlace mágico a <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      Haz clic en el enlace de tu correo para iniciar sesión. El enlace expirará en 1 hora.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsMagicLinkSent(false);
                      setEmail('');
                    }}
                    className="w-full"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Probar Email Diferente
                  </Button>
                </div>
              )
            ) : (
              <WhatsAppLogin />
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button className="text-blue-600 hover:text-blue-500 font-medium">
              Contactar soporte
            </button>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
