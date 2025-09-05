'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
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
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
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
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {inviteToken ? 'Accept Invitation' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {inviteToken 
              ? 'Complete your account setup to get started'
              : 'Sign in to your account to continue'
            }
          </p>
          {isMockAuth && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Development Mode:</strong> Using mock authentication. 
                Try <code className="bg-yellow-200 px-1 rounded">test@example.com</code> or <code className="bg-yellow-200 px-1 rounded">admin@example.com</code>
              </p>
            </div>
          )}
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {inviteToken ? 'Accept Invite' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-center">
              {inviteToken 
                ? 'Enter your email to accept the invitation'
                : 'Choose your preferred sign-in method'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isMagicLinkSent ? (
              <>
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
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
                  {inviteToken ? 'Accept Invite' : 'Send Magic Link'}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
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
                  Continue with Google
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
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We've sent a magic link to <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Click the link in your email to sign in. The link will expire in 1 hour.
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
                  Try Different Email
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-blue-600 hover:text-blue-500 font-medium">
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
