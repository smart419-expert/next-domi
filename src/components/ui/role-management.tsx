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
import { useLanguage } from '@/contexts/language-context';

export function RoleManagement() {
  const { t } = useLanguage();
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
        return t('admin.settings.role_admin_desc');
      case 'agent':
        return t('admin.settings.role_agent_desc');
      case 'viewer':
        return t('admin.settings.role_viewer_desc');
      default:
        return t('admin.settings.role_no_permissions');
    }
  };

  if (!hasPermission('manage_users')) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>{t('admin.settings.no_permission')}</p>
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
          {t('admin.settings.user_role_management')}
        </CardTitle>
        <CardDescription>
          {t('admin.settings.user_role_management_desc')}
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
                        {t('admin.settings.you')}
                      </Badge>
                    )}
                    {!user.isActive && (
                      <Badge variant="secondary" className="text-xs">
                        {t('admin.settings.offline')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">
                    {t('admin.settings.last_active')}: {formatDate(user.lastActive)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    {getRoleIcon(user.role)}
                    <span className="text-sm font-medium">{t('admin.settings.current_role')}</span>
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
                      onValueChange={(value: string) => handleRoleChange(user.id, value as UserRole)}
                      className="w-32"
                    >
                      <option value="admin">Admin</option>
                      <option value="agent">Agent</option>
                      <option value="viewer">Viewer</option>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingUser(null)}
                    >
                      {t('admin.settings.cancel')}
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
                    {t('admin.settings.edit_role')}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">{t('admin.settings.role_permissions')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="font-medium text-blue-900">{t('admin.settings.role_admin')}</span>
              </div>
              <ul className="text-blue-700 space-y-1">
                <li>• {t('admin.settings.role_admin_1')}</li>
                <li>• {t('admin.settings.role_admin_2')}</li>
                <li>• {t('admin.settings.role_admin_3')}</li>
                <li>• {t('admin.settings.role_admin_4')}</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <UserCheck className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">{t('admin.settings.role_agent')}</span>
              </div>
              <ul className="text-blue-700 space-y-1">
                <li>• {t('admin.settings.role_agent_1')}</li>
                <li>• {t('admin.settings.role_agent_2')}</li>
                <li>• {t('admin.settings.role_agent_3')}</li>
                <li>• {t('admin.settings.role_agent_4')}</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Eye className="h-4 w-4 text-green-600" />
                <span className="font-medium text-blue-900">{t('admin.settings.role_viewer')}</span>
              </div>
              <ul className="text-blue-700 space-y-1">
                <li>• {t('admin.settings.role_viewer_1')}</li>
                <li>• {t('admin.settings.role_viewer_2')}</li>
                <li>• {t('admin.settings.role_viewer_3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
