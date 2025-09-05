'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/ui/avatar';
import { useRole, UserRole } from '@/contexts/role-context';
import { Users, Shield, Eye, UserCheck, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export function RoleManagement() {
  const { users, updateUserRole, currentUser, hasPermission } = useRole();
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    updateUserRole(userId, newRole);
    setEditingUser(null);
    toast.success('User role updated successfully');
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'agent':
        return <UserCheck className="h-4 w-4" />;
      case 'viewer':
        return <Eye className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'agent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'viewer':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Full system access, can manage users and settings';
      case 'agent':
        return 'Can chat with clients, view data, and upload files';
      case 'viewer':
        return 'Read-only access to basic client information';
      default:
        return 'No permissions';
    }
  };

  if (!hasPermission('manage_users')) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>You don't have permission to manage users.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Role Management
        </CardTitle>
        <CardDescription>
          Manage user roles and permissions. Changes take effect immediately.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar name={user.name} />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    {user.id === currentUser?.id && (
                      <Badge variant="outline" className="text-xs">
                        You
                      </Badge>
                    )}
                    {!user.isActive && (
                      <Badge variant="secondary" className="text-xs">
                        Offline
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">
                    Last active: {formatDate(user.lastActive)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    {getRoleIcon(user.role)}
                    <span className="text-sm font-medium">Current Role</span>
                  </div>
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1 max-w-48">
                    {getRoleDescription(user.role)}
                  </p>
                </div>

                {editingUser === user.id ? (
                  <div className="flex items-center space-x-2">
                    <Select
                      value={user.role}
                      onValueChange={(value: UserRole) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Admin</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="agent">
                          <div className="flex items-center space-x-2">
                            <UserCheck className="h-4 w-4" />
                            <span>Agent</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="viewer">
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>Viewer</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingUser(user.id)}
                    disabled={user.id === currentUser?.id}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Role
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Role Permissions</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="font-medium text-blue-900">Admin</span>
              </div>
              <ul className="text-blue-700 space-y-1">
                <li>• Edit client balances</li>
                <li>• Manage users</li>
                <li>• Configure providers</li>
                <li>• System settings</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <UserCheck className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Agent</span>
              </div>
              <ul className="text-blue-700 space-y-1">
                <li>• Chat with clients</li>
                <li>• View all data</li>
                <li>• Upload files</li>
                <li>• View reports</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Eye className="h-4 w-4 text-green-600" />
                <span className="font-medium text-blue-900">Viewer</span>
              </div>
              <ul className="text-blue-700 space-y-1">
                <li>• View basic data</li>
                <li>• View reports</li>
                <li>• Read-only access</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
