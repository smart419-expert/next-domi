'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'viewer' | 'user';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  sendMagicLink: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  sendWhatsAppInvite: (phone: string) => Promise<{ success: boolean; message?: string; whatsappLink?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication state - in a real app, this would check for existing session
  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      setIsLoading(true);
      
      // Mock delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check localStorage for mock session
      const mockSession = localStorage.getItem('mock-auth-session');
      if (mockSession) {
        try {
          const sessionData = JSON.parse(mockSession);
          setUser(sessionData.user);
        } catch (error) {
          console.error('Error parsing session data:', error);
          localStorage.removeItem('mock-auth-session');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Store mock session in localStorage
    localStorage.setItem('mock-auth-session', JSON.stringify({
      user: userData,
      timestamp: Date.now()
    }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock-auth-session');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      // Update localStorage
      localStorage.setItem('mock-auth-session', JSON.stringify({
        user: updatedUser,
        timestamp: Date.now()
      }));
    }
  };

  const sendMagicLink = async (email: string) => {
    try {
      const response = await fetch('/api/auth/send-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending magic link:', error);
      return { success: false, error: 'Failed to send magic link' };
    }
  };

  const sendWhatsAppInvite = async (phone: string) => {
    try {
      const response = await fetch('/api/auth/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending WhatsApp invite:', error);
      return { success: false, error: 'Failed to send WhatsApp invite' };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    sendMagicLink,
    sendWhatsAppInvite,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
// Mock authentication functions for testing
export const mockAuth = {
  // Mock login with email
  loginWithEmail: (email: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    return mockUser;
  },

  // Mock login with Google
  loginWithGoogle: () => {
    const mockUser: User = {
      id: '2',
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google'
    };
    return mockUser;
  },

  // Mock login with WhatsApp
  loginWithWhatsApp: (phone: string) => {
    const mockUser: User = {
      id: '3',
      email: `${phone}@whatsapp.local`,
      name: `WhatsApp User (${phone})`,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=whatsapp'
    };
    return mockUser;
  }
};

