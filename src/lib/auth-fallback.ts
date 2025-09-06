// Fallback authentication system for development without Supabase
export interface MockUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface MockSession {
  user: MockUser;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

// Mock user data
const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    avatar_url: 'https://via.placeholder.com/150',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    avatar_url: 'https://via.placeholder.com/150',
    created_at: new Date().toISOString(),
  },
];

// Mock session storage
let currentSession: MockSession | null = null;

export const mockAuth = {
  // Sign in with email (magic link simulation)
  async signInWithOtp({ email }: { email: string }) {
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return {
        data: null,
        error: { message: 'User not found' }
      };
    }

    // Simulate magic link delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const session: MockSession = {
      user,
      access_token: `mock_token_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    currentSession = session;
    localStorage.setItem('mock_session', JSON.stringify(session));

    return {
      data: { user, session },
      error: null
    };
  },

  // Sign in with Google (mock)
  async signInWithOAuth({ provider }: { provider: string }) {
    if (provider !== 'google') {
      return {
        data: null,
        error: { message: 'Provider not supported' }
      };
    }

    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers[0]; // Use first mock user
    const session: MockSession = {
      user,
      access_token: `mock_google_token_${Date.now()}`,
      refresh_token: `mock_google_refresh_${Date.now()}`,
      expires_at: Date.now() + 24 * 60 * 60 * 1000,
    };

    currentSession = session;
    localStorage.setItem('mock_session', JSON.stringify(session));

    return {
      data: { user, session },
      error: null
    };
  },

  // Get current user
  async getUser() {
    if (typeof window === 'undefined') {
      return { data: { user: null }, error: null };
    }

    // Try to get from memory first
    if (currentSession) {
      return { data: { user: currentSession.user }, error: null };
    }

    // Try to get from localStorage
    const stored = localStorage.getItem('mock_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (session.expires_at > Date.now()) {
          currentSession = session;
          return { data: { user: session.user }, error: null };
        } else {
          localStorage.removeItem('mock_session');
        }
      } catch (e) {
        localStorage.removeItem('mock_session');
      }
    }

    return { data: { user: null }, error: null };
  },

  // Get current session
  async getSession() {
    const { data: { user } } = await this.getUser();
    return {
      data: { session: user ? currentSession : null },
      error: null
    };
  },

  // Sign out
  async signOut() {
    currentSession = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_session');
    }
    return { error: null };
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    // Simulate auth state change
    const checkAuth = () => {
      this.getUser().then(({ data: { user } }) => {
        callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', user ? currentSession : null);
      });
    };

    // Check immediately
    checkAuth();

    // Check periodically (simulate real auth changes)
    const interval = setInterval(checkAuth, 5000);

    return {
      data: { subscription: { unsubscribe: () => clearInterval(interval) } }
    };
  }
};
