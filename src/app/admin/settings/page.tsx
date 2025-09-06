'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppLayout, PageTitle } from '@/components/layout';
import { RoleManagement } from '@/components/ui/role-management';
import { ChatProviderConfig } from '@/components/ui/chat-provider-config';
import { PaymentProviderConfig } from '@/components/ui/payment-provider-config';
import { UploadLimitsConfig } from '@/components/ui/upload-limits-config';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Users, MessageSquare, CreditCard, Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function SettingsPage() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <div className="py-8">
        <PageTitle
          title={t('admin.settings.title')}
          description={t('admin.settings.description')}
          size="lg"
        />

        <div className="space-y-8">
          {/* Role Management */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">{t('admin.settings.user_management')}</h2>
            </div>
            <RoleManagement />
          </div>

          {/* Provider Configurations */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">{t('admin.settings.provider_configurations')}</h2>
            </div>
            <div className="space-y-6">
              <ChatProviderConfig />
              <PaymentProviderConfig />
            </div>
          </div>

          {/* System Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Upload className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">{t('admin.settings.system_settings')}</h2>
            </div>
            <UploadLimitsConfig />
          </div>

          {/* Personal Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">{t('admin.settings.personal_settings')}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-primary-500/10 mr-3">
                    <User className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Profile Settings</h3>
                    <p className="text-sm text-muted-foreground">Update your personal information</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input id="name" defaultValue="John Admin" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button variant="gradient">Save Changes</Button>
                </div>
              </Card>

              {/* Notification Settings */}
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-primary-500/10 mr-3">
                    <Bell className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Configure your notification preferences</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive push notifications</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive SMS notifications</div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <Button variant="gradient-purple">Save Preferences</Button>
                </div>
              </Card>

              {/* Security Settings */}
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-primary-500/10 mr-3">
                    <Shield className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Security</h3>
                    <p className="text-sm text-muted-foreground">Manage your account security</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-foreground mb-2">
                      Current Password
                    </label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-foreground mb-2">
                      New Password
                    </label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground mb-2">
                      Confirm New Password
                    </label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button variant="gradient-blue">Update Password</Button>
                </div>
              </Card>

              {/* Appearance Settings */}
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-lg bg-primary-500/10 mr-3">
                    <Palette className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
                    <p className="text-sm text-muted-foreground">Customize the look and feel</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-foreground mb-2">
                      Theme
                    </label>
                    <select 
                      id="theme" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      defaultValue="light"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
                      Language
                    </label>
                    <select 
                      id="language" 
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <Button variant="gradient">Save Preferences</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
