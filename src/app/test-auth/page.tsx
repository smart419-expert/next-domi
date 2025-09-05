'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabase } from '@/components/providers/supabase-provider';
import { LogOut, User, Mail, Calendar } from 'lucide-react';

export default function TestAuthPage() {
  const { user, loading } = useSupabase();
  const [session, setSession] = useState<any>(null);
  const supabase = createClient();
  
  // Check if we're using mock authentication
  const isMockAuth = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                    process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url';

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Authentication Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                User Information
              </CardTitle>
              <CardDescription>
                Current authentication state
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Created:</span>
                    <span className="text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="pt-4">
                    <Button onClick={handleSignOut} variant="outline" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No user signed in</p>
                  <Button onClick={() => window.location.href = '/login'}>
                    Go to Login
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Session Info */}
          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
              <CardDescription>
                Raw session data for debugging
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-xs text-gray-700 overflow-auto max-h-64">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environment Check */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Environment Check</CardTitle>
            <CardDescription>
              Verify your Supabase configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Authentication Mode:</span>
                <span className={`text-sm ${isMockAuth ? 'text-yellow-600' : 'text-green-600'}`}>
                  {isMockAuth ? '🔄 Mock Authentication' : '✅ Real Supabase'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Supabase URL:</span>
                <span className={`text-sm ${process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' ? 'text-green-600' : 'text-red-600'}`}>
                  {process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' ? '✓ Configured' : '✗ Missing'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Supabase Key:</span>
                <span className={`text-sm ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key' ? 'text-green-600' : 'text-red-600'}`}>
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key' ? '✓ Configured' : '✗ Missing'}
                </span>
              </div>
              {isMockAuth && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Mock Authentication Active:</strong> You can test with <code className="bg-yellow-200 px-1 rounded">test@example.com</code> or <code className="bg-yellow-200 px-1 rounded">admin@example.com</code>
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
