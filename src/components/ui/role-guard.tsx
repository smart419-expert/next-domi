'use client';

import React from 'react';
import { useRole } from '@/contexts/role-context';
import { Shield } from 'lucide-react';

interface RoleGuardProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showMessage?: boolean;
  message?: string;
}

export function RoleGuard({ 
  permission, 
  children, 
  fallback = null, 
  showMessage = false,
  message = "You don't have permission to perform this action."
}: RoleGuardProps) {
  const { hasPermission } = useRole();

  if (!hasPermission(permission)) {
    if (showMessage) {
      return (
        <div className="flex items-center justify-center p-4 text-gray-500">
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">{message}</p>
          </div>
        </div>
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Convenience components for common permissions
export function AdminOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleGuard permission="edit_balance" fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function AgentOrAdmin({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleGuard permission="view_all_data" fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function ViewerOrAbove({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleGuard permission="view_basic_data" fallback={fallback}>
      {children}
    </RoleGuard>
  );
}
