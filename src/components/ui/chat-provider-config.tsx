'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRole } from '@/contexts/role-context';
import { MessageSquare, Code, Settings, Shield, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface ChatProvider {
  id: string;
  name: string;
  type: 'tawk' | 'crisp' | 'intercom' | 'custom';
  script: string;
  isEnabled: boolean;
  clientId: string;
}

const defaultProviders: ChatProvider[] = [
  {
    id: 'tawk',
    name: 'Tawk.to',
    type: 'tawk',
    script: '',
    isEnabled: false,
    clientId: '',
  },
  {
    id: 'crisp',
    name: 'Crisp',
    type: 'crisp',
    script: '',
    isEnabled: false,
    clientId: '',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    type: 'intercom',
    script: '',
    isEnabled: false,
    clientId: '',
  },
  {
    id: 'custom',
    name: 'Custom Chat',
    type: 'custom',
    script: '',
    isEnabled: true,
    clientId: '',
  },
];

export function ChatProviderConfig() {
  const { hasPermission } = useRole();
  const [providers, setProviders] = useState<ChatProvider[]>(defaultProviders);
  const [activeProvider, setActiveProvider] = useState<string>('custom');
  const [isEditing, setIsEditing] = useState(false);

  const handleProviderToggle = (providerId: string, enabled: boolean) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, isEnabled: enabled }
        : { ...provider, isEnabled: false } // Disable others when enabling one
    ));
    
    if (enabled) {
      setActiveProvider(providerId);
    }
  };

  const handleScriptChange = (providerId: string, script: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, script }
        : provider
    ));
  };

  const handleClientIdChange = (providerId: string, clientId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, clientId }
        : provider
    ));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast.success('Chat provider configuration saved');
    setIsEditing(false);
  };

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'tawk':
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case 'crisp':
        return <MessageSquare className="h-5 w-5 text-green-600" />;
      case 'intercom':
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      case 'custom':
        return <Code className="h-5 w-5 text-orange-600" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getProviderDescription = (type: string) => {
    switch (type) {
      case 'tawk':
        return 'Free live chat widget with basic features';
      case 'crisp':
        return 'Modern chat platform with advanced features';
      case 'intercom':
        return 'Enterprise-grade customer messaging platform';
      case 'custom':
        return 'Use the built-in custom chat system';
      default:
        return '';
    }
  };

  if (!hasPermission('configure_providers')) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>You don't have permission to configure chat providers.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Chat Provider Configuration
        </CardTitle>
        <CardDescription>
          Configure third-party chat providers or use the custom chat system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`p-4 border rounded-lg ${
                provider.isEnabled ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
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
                <Switch
                  checked={provider.isEnabled}
                  onCheckedChange={(enabled) => handleProviderToggle(provider.id, enabled)}
                />
              </div>

              {provider.isEnabled && (
                <div className="space-y-4">
                  {provider.type !== 'custom' && (
                    <div>
                      <Label htmlFor={`clientId-${provider.id}`} className="text-sm font-medium">
                        Client ID / Widget ID
                      </Label>
                      <input
                        id={`clientId-${provider.id}`}
                        type="text"
                        value={provider.clientId}
                        onChange={(e) => handleClientIdChange(provider.id, e.target.value)}
                        placeholder={`Enter your ${provider.name} client ID`}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor={`script-${provider.id}`} className="text-sm font-medium">
                      Provider Script
                    </Label>
                    <Textarea
                      id={`script-${provider.id}`}
                      value={provider.script}
                      onChange={(e) => handleScriptChange(provider.id, e.target.value)}
                      placeholder={`Paste your ${provider.name} script here...`}
                      className="mt-1 font-mono text-sm"
                      rows={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Paste the complete script tag provided by {provider.name}
                    </p>
                  </div>

                  {provider.type !== 'custom' && (
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <ExternalLink className="h-4 w-4" />
                      <span>
                        Get your script from{' '}
                        <a 
                          href={`https://${provider.name.toLowerCase()}.com`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="underline hover:no-underline"
                        >
                          {provider.name}.com
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">
              <strong>Active Provider:</strong> {providers.find(p => p.isEnabled)?.name || 'None'}
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
