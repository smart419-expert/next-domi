import { createBrowserClient } from '@supabase/ssr'
import { mockAuth } from './auth-fallback'

export const createClient = () => {
  // Check if Supabase environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url') {
    // Return mock client when Supabase is not configured
    return {
      auth: mockAuth
    } as any
  }

  // Return real Supabase client when configured
  return createBrowserClient(supabaseUrl, supabaseKey)
}
