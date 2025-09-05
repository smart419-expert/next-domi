'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { ChatSettings, ChatSettings as ChatSettingsType } from './chat-settings';
import { MockChat } from './mock-chat';
import { MessageSquare, Settings, ExternalLink, Bell, BellOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/lib/notifications';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  sender: 'admin' | 'client';
  timestamp: string;
  read: boolean;
  delivered: boolean;
}

interface ChatWindowProps {
  clientId: string;
  clientName: string;
  className?: string;
}

export function ChatWindow({ clientId, clientName, className }: ChatWindowProps) {
  const [settings, setSettings] = useState<ChatSettingsType>({
    provider: 'mock',
    clientId: '',
    customScript: '',
    isEnabled: true,
    useMockChat: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isProviderLoaded, setIsProviderLoaded] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const providerScriptRef = useRef<HTMLScriptElement | null>(null);

  const {
    permission,
    isSupported,
    isGranted,
    isDenied,
    canRequest,
    requestPermission,
    showChatNotification,
  } = useNotifications();

  // Load settings from localStorage on mount
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

  // Handle provider script loading
  useEffect(() => {
    if (!settings.isEnabled || settings.useMockChat) {
      // Clean up any existing provider script
      if (providerScriptRef.current) {
        providerScriptRef.current.remove();
        providerScriptRef.current = null;
        setIsProviderLoaded(false);
      }
      return;
    }

    const loadProviderScript = () => {
      // Clean up existing script
      if (providerScriptRef.current) {
        providerScriptRef.current.remove();
      }

      if (settings.provider === 'custom' && settings.customScript) {
        // Load custom script
        try {
          const scriptElement = document.createElement('script');
          scriptElement.innerHTML = settings.customScript;
          document.head.appendChild(scriptElement);
          providerScriptRef.current = scriptElement;
          setIsProviderLoaded(true);
        } catch (error) {
          console.error('Failed to load custom script:', error);
          toast.error('Failed to load custom chat script');
        }
      } else if (settings.clientId) {
        // Load provider-specific script
        const scriptElement = document.createElement('script');
        
        switch (settings.provider) {
          case 'tawk':
            scriptElement.src = `${settings.scriptUrl}${settings.clientId}`;
            break;
          case 'crisp':
            scriptElement.src = `${settings.scriptUrl}${settings.clientId}`;
            break;
          case 'intercom':
            scriptElement.src = `${settings.scriptUrl}${settings.clientId}`;
            break;
          default:
            return;
        }

        scriptElement.async = true;
        scriptElement.onload = () => {
          setIsProviderLoaded(true);
          toast.success(`${settings.provider} chat loaded successfully`);
        };
        scriptElement.onerror = () => {
          toast.error(`Failed to load ${settings.provider} chat`);
        };

        document.head.appendChild(scriptElement);
        providerScriptRef.current = scriptElement;
      }
    };

    loadProviderScript();

    // Cleanup on unmount
    return () => {
      if (providerScriptRef.current) {
        providerScriptRef.current.remove();
      }
    };
  }, [settings]);

  // Handle new messages and notifications
  const handleNewMessage = (message: Message) => {
    // Show toast notification
    toast.success(`New message from ${message.sender === 'admin' ? 'You' : clientName}`);
    
    // Show browser notification if permission is granted
    if (isGranted) {
      showChatNotification(message.content, message.sender === 'admin' ? 'You' : clientName);
    }
  };

  // Request notification permission
  const handleRequestNotificationPermission = async () => {
    const newPermission = await requestPermission();
    if (newPermission === 'granted') {
      toast.success('Notifications enabled!');
    } else if (newPermission === 'denied') {
      toast.error('Notifications blocked. Please enable them in your browser settings.');
    }
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: ChatSettingsType) => {
    setSettings(newSettings);
  };

  if (!settings.isEnabled) {
    return (
      <Card className={cn('h-96 flex items-center justify-center', className)}>
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat Disabled</h3>
          <p className="text-gray-500 mb-4">Chat functionality is currently disabled.</p>
          <Button
            onClick={() => setShowSettings(true)}
            variant="outline"
          >
            <Settings className="h-4 w-4 mr-2" />
            Enable Chat
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Chat Settings */}
      <ChatSettings
        onSettingsChange={handleSettingsChange}
        className={showSettings ? 'block' : 'hidden'}
      />

      {/* Notification Permission Banner */}
      {isSupported && !isGranted && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDenied ? (
                <BellOff className="h-5 w-5 text-red-500" />
              ) : (
                <Bell className="h-5 w-5 text-blue-500" />
              )}
              <div>
                <h4 className="text-sm font-medium text-blue-900">
                  {isDenied ? 'Notifications Blocked' : 'Enable Notifications'}
                </h4>
                <p className="text-sm text-blue-700">
                  {isDenied
                    ? 'Please enable notifications in your browser settings to receive chat alerts.'
                    : 'Get notified when new messages arrive in the chat.'
                  }
                </p>
              </div>
            </div>
            {canRequest && (
              <Button
                size="sm"
                onClick={handleRequestNotificationPermission}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Enable
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Chat Container */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <CardTitle>Live Chat</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {!showSettings && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <CardDescription>
            {settings.useMockChat
              ? 'Mock chat with simulated real-time messaging'
              : `Third-party chat provider: ${settings.provider}`
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-hidden">
          <div ref={chatContainerRef} className="h-full">
            {settings.useMockChat ? (
              <MockChat
                clientId={clientId}
                clientName={clientName}
                onNewMessage={handleNewMessage}
                className="h-full"
              />
            ) : (
              <div className="h-full flex items-center justify-center p-6">
                {isProviderLoaded ? (
                  <div className="text-center">
                    <ExternalLink className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {settings.provider} Chat Loaded
                    </h3>
                    <p className="text-gray-500">
                      The {settings.provider} chat widget should be visible below.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Loading Chat...
                    </h3>
                    <p className="text-gray-500">
                      Loading {settings.provider} chat widget...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}