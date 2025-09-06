'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Switch } from './switch';
import { MessageSquare, Settings, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatProvider {
  id: string;
  name: string;
  description: string;
  scriptUrl: string;
  clientIdField: string;
  placeholder: string;
}

const CHAT_PROVIDERS: ChatProvider[] = [
  {
    id: 'tawk',
    name: 'Tawk.to',
    description: 'Free live chat widget with visitor tracking',
    scriptUrl: 'https://embed.tawk.to/',
    clientIdField: 'propertyId',
    placeholder: 'Enter your Tawk.to Property ID',
  },
  {
    id: 'crisp',
    name: 'Crisp',
    description: 'Customer service platform with chat widget',
    scriptUrl: 'https://client.crisp.chat/l.js',
    clientIdField: 'websiteId',
    placeholder: 'Enter your Crisp Website ID',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    description: 'Customer messaging platform',
    scriptUrl: 'https://widget.intercom.io/widget/',
    clientIdField: 'appId',
    placeholder: 'Enter your Intercom App ID',
  },
  {
    id: 'custom',
    name: 'Custom Script',
    description: 'Paste your own chat widget script',
    scriptUrl: '',
    clientIdField: 'customScript',
    placeholder: 'Paste your custom chat script here',
  },
];

interface ChatSettingsProps {
  onSettingsChange?: (settings: ChatSettings) => void;
  className?: string;
}

export interface ChatSettings {
  provider: string;
  clientId: string;
  customScript: string;
  scriptUrl: string;
  isEnabled: boolean;
  useMockChat: boolean;
}

export function ChatSettings({ onSettingsChange, className }: ChatSettingsProps) {
  const [settings, setSettings] = useState<ChatSettings>({
    provider: 'mock',
    clientId: '',
    customScript: '',
    scriptUrl: '',
    isEnabled: true,
    useMockChat: true,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('chatSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse saved chat settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('chatSettings', JSON.stringify(settings));
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const handleProviderChange = (provider: string) => {
    setSettings(prev => ({
      ...prev,
      provider,
      clientId: '',
      customScript: '',
      useMockChat: provider === 'mock',
    }));
  };

  const handleClientIdChange = (clientId: string) => {
    setSettings(prev => ({ ...prev, clientId }));
  };

  const handleCustomScriptChange = (customScript: string) => {
    setSettings(prev => ({ ...prev, customScript }));
  };

  const handleToggleEnabled = (isEnabled: boolean) => {
    setSettings(prev => ({ ...prev, isEnabled }));
  };

  const handleToggleMockChat = (useMockChat: boolean) => {
    setSettings(prev => ({ ...prev, useMockChat }));
  };

  const selectedProvider = CHAT_PROVIDERS.find(p => p.id === settings.provider);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-600" />
            <CardTitle>Chat Settings</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Configure'}
          </Button>
        </div>
        <CardDescription>
          Configure chat provider and client settings
        </CardDescription>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Enable/Disable Chat */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="chat-enabled">Enable Chat</Label>
              <p className="text-sm text-gray-500">
                Turn chat functionality on or off
              </p>
            </div>
            <Switch
              id="chat-enabled"
              checked={settings.isEnabled}
              onCheckedChange={handleToggleEnabled}
            />
          </div>

          {/* Mock Chat Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="mock-chat">Use Mock Chat</Label>
              <p className="text-sm text-gray-500">
                Use built-in mock chat instead of external provider
              </p>
            </div>
            <Switch
              id="mock-chat"
              checked={settings.useMockChat}
              onCheckedChange={handleToggleMockChat}
            />
          </div>

          {!settings.useMockChat && (
            <>
              {/* Provider Selection */}
              <div className="space-y-2">
                <Label htmlFor="chat-provider">Chat Provider</Label>
                <Select
                  value={settings.provider}
                  onValueChange={handleProviderChange}
                >
                  <option value="">Select a chat provider</option>
                  <option value="mock">Mock Chat (Built-in)</option>
                  {CHAT_PROVIDERS.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))}
                </Select>
                {selectedProvider && (
                  <p className="text-sm text-gray-500">
                    {selectedProvider.description}
                  </p>
                )}
              </div>

              {/* Client ID Input */}
              {selectedProvider && selectedProvider.id !== 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="client-id">{selectedProvider.clientIdField}</Label>
                  <Input
                    id="client-id"
                    value={settings.clientId}
                    onChange={(e) => handleClientIdChange(e.target.value)}
                    placeholder={selectedProvider.placeholder}
                  />
                  <p className="text-sm text-gray-500">
                    You can find this in your {selectedProvider.name} dashboard
                  </p>
                </div>
              )}

              {/* Custom Script Input */}
              {selectedProvider?.id === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="custom-script">Custom Chat Script</Label>
                  <textarea
                    id="custom-script"
                    value={settings.customScript}
                    onChange={(e) => handleCustomScriptChange(e.target.value)}
                    placeholder="Paste your custom chat widget script here..."
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-sm text-gray-500">
                    Paste the complete script tag or JavaScript code for your chat widget
                  </p>
                </div>
              )}

              {/* Provider Info */}
              {selectedProvider && selectedProvider.id !== 'mock' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <ExternalLink className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">
                        {selectedProvider.name} Integration
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        The chat widget will be loaded from: {selectedProvider.scriptUrl}
                      </p>
                      {settings.clientId && (
                        <p className="text-sm text-blue-700 mt-1">
                          Client ID: {settings.clientId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Mock Chat Info */}
          {settings.useMockChat && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <MessageSquare className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-900">
                    Mock Chat Active
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Using built-in mock chat with simulated real-time messaging
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => setIsExpanded(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Settings
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
