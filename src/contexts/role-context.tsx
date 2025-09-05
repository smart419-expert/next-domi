'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'agent' | 'viewer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive: string;
  isActive: boolean;
}

interface RoleContextType {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User | null) => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
  isAdmin: boolean;
  isAgent: boolean;
  isViewer: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@example.com',
    role: 'admin',
    lastActive: '2024-01-15T10:30:00Z',
    isActive: true,
  },
  {
    id: '2',
    name: 'Sarah Agent',
    email: 'sarah@example.com',
    role: 'agent',
    lastActive: '2024-01-15T09:15:00Z',
    isActive: true,
  },
  {
    id: '3',
    name: 'Mike Viewer',
    email: 'mike@example.com',
    role: 'viewer',
    lastActive: '2024-01-14T16:45:00Z',
    isActive: true,
  },
  {
    id: '4',
    name: 'Lisa Agent',
    email: 'lisa@example.com',
    role: 'agent',
    lastActive: '2024-01-15T08:20:00Z',
    isActive: false,
  },
];

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  // Initialize with admin user for demo
  useEffect(() => {
    const adminUser = mockUsers.find(user => user.role === 'admin');
    if (adminUser) {
      setCurrentUser(adminUser);
    }
  }, []);

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role } : user
    ));
    
    // Update current user if it's the same user
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false;

    const permissions = {
      admin: [
        'edit_balance',
        'manage_users',
        'configure_providers',
        'view_all_data',
        'export_data',
        'system_settings'
      ],
      agent: [
        'view_all_data',
        'chat_with_clients',
        'upload_files',
        'view_reports'
      ],
      viewer: [
        'view_basic_data',
        'view_reports'
      ]
    };

    return permissions[currentUser.role]?.includes(permission) || false;
  };

  const isAdmin = currentUser?.role === 'admin';
  const isAgent = currentUser?.role === 'agent';
  const isViewer = currentUser?.role === 'viewer';

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        users,
        setCurrentUser,
        updateUserRole,
        hasPermission,
        isAdmin,
        isAgent,
        isViewer,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
