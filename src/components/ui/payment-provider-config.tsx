'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRole } from '@/contexts/role-context';
import { CreditCard, Shield, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentProvider {
  id: string;
  name: string;
  type: 'paypal' | 'stripe' | 'square' | 'custom';
  clientId: string;
  secretKey: string;
  isEnabled: boolean;
  isTestMode: boolean;
  webhookUrl: string;
}

const defaultProviders: PaymentProvider[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    type: 'paypal',
    clientId: '',
    secretKey: '',
    isEnabled: true,
    isTestMode: true,
    webhookUrl: '',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    type: 'stripe',
    clientId: '',
    secretKey: '',
    isEnabled: false,
    isTestMode: true,
    webhookUrl: '',
  },
  {
    id: 'square',
    name: 'Square',
    type: 'square',
    clientId: '',
    secretKey: '',
    isEnabled: false,
    isTestMode: true,
    webhookUrl: '',
  },
];

export function PaymentProviderConfig() {
  const { hasPermission } = useRole();
  const [providers, setProviders] = useState<PaymentProvider[]>(defaultProviders);
  const [isEditing, setIsEditing] = useState(false);

  const handleProviderToggle = (providerId: string, enabled: boolean) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, isEnabled: enabled }
        : provider
    ));
  };

  const handleProviderUpdate = (providerId: string, field: keyof PaymentProvider, value: any) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, [field]: value }
        : provider
    ));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast.success('Payment provider configuration saved');
    setIsEditing(false);
  };

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'paypal':
        return <CreditCard className="h-5 w-5 text-blue-600" />;
      case 'stripe':
        return <CreditCard className="h-5 w-5 text-purple-600" />;
      case 'square':
        return <CreditCard className="h-5 w-5 text-green-600" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getProviderDescription = (type: string) => {
    switch (type) {
      case 'paypal':
        return 'Accept PayPal payments with Smart Buttons';
      case 'stripe':
        return 'Accept credit cards and digital wallets';
      case 'square':
        return 'Accept payments online and in-person';
      default:
        return '';
    }
  };

  const validateProvider = (provider: PaymentProvider) => {
    if (!provider.isEnabled) return { isValid: true, errors: [] };
    
    const errors: string[] = [];
    if (!provider.clientId) errors.push('Client ID is required');
    if (!provider.secretKey) errors.push('Secret Key is required');
    if (!provider.webhookUrl) errors.push('Webhook URL is required');
    
    return { isValid: errors.length === 0, errors };
  };

  if (!hasPermission('configure_providers')) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>You don't have permission to configure payment providers.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Provider Configuration
        </CardTitle>
        <CardDescription>
          Configure payment providers and their credentials. Test mode is recommended for development.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {providers.map((provider) => {
            const validation = validateProvider(provider);
            
            return (
              <div
                key={provider.id}
                className={`p-4 border rounded-lg ${
                  provider.isEnabled 
                    ? validation.isValid 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getProviderIcon(provider.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-600">{getProviderDescription(provider.type)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {provider.isEnabled && (
                      <div className="flex items-center space-x-1">
                        {validation.isValid ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-xs ${
                          validation.isValid ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {validation.isValid ? 'Valid' : 'Invalid'}
                        </span>
                      </div>
                    )}
                    <Switch
                      checked={provider.isEnabled}
                      onCheckedChange={(enabled) => handleProviderToggle(provider.id, enabled)}
                    />
                  </div>
                </div>

                {provider.isEnabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`clientId-${provider.id}`} className="text-sm font-medium">
                          Client ID / Public Key
                        </Label>
                        <Input
                          id={`clientId-${provider.id}`}
                          type="text"
                          value={provider.clientId}
                          onChange={(e) => handleProviderUpdate(provider.id, 'clientId', e.target.value)}
                          placeholder={`Enter your ${provider.name} client ID`}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`secretKey-${provider.id}`} className="text-sm font-medium">
                          Secret Key
                        </Label>
                        <Input
                          id={`secretKey-${provider.id}`}
                          type="password"
                          value={provider.secretKey}
                          onChange={(e) => handleProviderUpdate(provider.id, 'secretKey', e.target.value)}
                          placeholder={`Enter your ${provider.name} secret key`}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`webhookUrl-${provider.id}`} className="text-sm font-medium">
                        Webhook URL
                      </Label>
                      <Input
                        id={`webhookUrl-${provider.id}`}
                        type="url"
                        value={provider.webhookUrl}
                        onChange={(e) => handleProviderUpdate(provider.id, 'webhookUrl', e.target.value)}
                        placeholder={`https://yourdomain.com/api/webhooks/${provider.name}`}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`testMode-${provider.id}`}
                          checked={provider.isTestMode}
                          onCheckedChange={(checked) => handleProviderUpdate(provider.id, 'isTestMode', checked)}
                        />
                        <Label htmlFor={`testMode-${provider.id}`} className="text-sm">
                          Test Mode
                        </Label>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        provider.isTestMode 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {provider.isTestMode ? 'Test Mode' : 'Live Mode'}
                      </div>
                    </div>

                    {!validation.isValid && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <h4 className="text-sm font-medium text-red-800 mb-2">Configuration Issues:</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          {validation.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Security Notes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Never commit secret keys to version control</li>
              <li>• Use environment variables for production credentials</li>
              <li>• Test webhook endpoints before going live</li>
              <li>• Enable webhook signature verification</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">
              <strong>Active Providers:</strong> {providers.filter(p => p.isEnabled).length} of {providers.length}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              {isEditing && (
                <Button onClick={handleSave}>
                  Save Configuration
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
