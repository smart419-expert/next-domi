'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/language-context';
import { RoleProvider } from '@/contexts/role-context';
import { SupabaseProvider } from '@/components/providers/supabase-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <RoleProvider>
                {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastStyle={{
                  background: 'hsl(var(--muted))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--primary-500))',
                }}
              />
              <ReactQueryDevtools initialIsOpen={false} />
              </RoleProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}
