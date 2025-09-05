'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Maximize2, 
  Send, 
  Phone, 
  Mail, 
  Clock,
  User,
  Bot,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent' | 'system';
  timestamp: Date;
  isRead?: boolean;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export interface ChatWidgetProps {
  user?: ChatUser;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark' | 'auto';
  chatwootToken?: string;
  baseUrl?: string;
  showFloatingButton?: boolean;
  customMessages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
  onTyping?: (isTyping: boolean) => void;
}

export function ChatWidget({
  user,
  isOpen = false,
  onToggle,
  className = "",
  position = 'bottom-right',
  theme = 'light',
  chatwootToken = 'YOUR_CHATWOOT_TOKEN',
  baseUrl = 'https://app.chatwoot.com',
  showFloatingButton = true,
  customMessages = [],
  onSendMessage,
  onTyping,
}: ChatWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(customMessages);
  const [isConnected, setIsConnected] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'online' | 'offline' | 'away'>('offline');
  const [agentInfo, setAgentInfo] = useState<{ name: string; avatar?: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatwootRef = useRef<any>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize Chatwoot
  useEffect(() => {
    if (typeof window !== 'undefined' && chatwootToken !== 'YOUR_CHATWOOT_TOKEN') {
      // Load Chatwoot script
      const script = document.createElement('script');
      script.src = `${baseUrl}/packs/js/sdk.js`;
      script.async = true;
      script.onload = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken: chatwootToken,
            baseUrl: baseUrl,
            hideMessageBubble: true, // We'll use our custom UI
            position: position,
            type: 'standard',
            launcherTitle: 'Chat with Support',
            user: user ? {
              identifier: user.id,
              name: user.name,
              email: user.email,
              avatar_url: user.avatar,
              identifier_hash: user.id,
            } : undefined,
          });

          // Store reference for later use
          chatwootRef.current = window.chatwootSDK;
          setIsConnected(true);
        }
      };
      document.head.appendChild(script);

      return () => {
        // Cleanup
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [chatwootToken, baseUrl, position, user]);

  // Mock agent status and info (in real app, this would come from your backend)
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: Array<'online' | 'offline' | 'away'> = ['online', 'offline', 'away'];
      setAgentStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      
      if (agentStatus === 'online') {
        setAgentInfo({
          name: 'Sarah Johnson',
          avatar: '/api/placeholder/40/40'
        });
      } else {
        setAgentInfo(null);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [agentStatus]);

  // Mock messages for demo
  useEffect(() => {
    if (customMessages.length === 0) {
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          content: 'Hello! How can I help you today?',
          sender: 'agent',
          timestamp: new Date(Date.now() - 300000), // 5 minutes ago
          isRead: true,
        },
        {
          id: '2',
          content: 'I need help with my investment portfolio',
          sender: 'user',
          timestamp: new Date(Date.now() - 240000), // 4 minutes ago
          isRead: true,
        },
        {
          id: '3',
          content: 'I\'d be happy to help you with your portfolio. What specific questions do you have?',
          sender: 'agent',
          timestamp: new Date(Date.now() - 180000), // 3 minutes ago
          isRead: true,
        },
        {
          id: '4',
          content: 'Can you explain the recent performance of my stocks?',
          sender: 'user',
          timestamp: new Date(Date.now() - 120000), // 2 minutes ago
          isRead: true,
        },
        {
          id: '5',
          content: 'I\'m looking into your portfolio performance now. One moment please...',
          sender: 'agent',
          timestamp: new Date(Date.now() - 60000), // 1 minute ago
          isRead: false,
        },
      ];
      setMessages(mockMessages);
    }
  }, [customMessages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message.trim(),
      sender: 'user',
      timestamp: new Date(),
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate agent response
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message. I\'ll get back to you shortly.',
        sender: 'agent',
        timestamp: new Date(),
        isRead: false,
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);

    onSendMessage?.(message.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'offline': return 'Offline';
      default: return 'Offline';
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  if (!isOpen) {
    return showFloatingButton ? (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <Button
          onClick={() => onToggle?.(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <MessageCircle className="h-6 w-6" />
          {messages.some(m => !m.isRead && m.sender === 'agent') && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {messages.filter(m => !m.isRead && m.sender === 'agent').length}
            </Badge>
          )}
        </Button>
      </div>
    ) : null;
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      <Card className={cn(
        "w-80 h-96 md:w-96 md:h-[500px] shadow-2xl border-0 bg-white/95 backdrop-blur-sm",
        isMinimized && "h-16"
      )}>
        {/* Header */}
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {agentInfo?.avatar ? (
                  <img
                    src={agentInfo.avatar}
                    alt={agentInfo.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
                <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(agentStatus)}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  {agentInfo?.name || 'Support Team'}
                </h3>
                <p className="text-xs text-white/80">
                  {getStatusText(agentStatus)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle?.(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div className="h-64 md:h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        msg.sender === 'user'
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      )}
                    >
                      <p>{msg.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">
                          {formatTime(msg.timestamp)}
                        </span>
                        {msg.sender === 'user' && (
                          <div className="flex items-center space-x-1">
                            {msg.isRead ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Agent is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={agentStatus === 'offline'}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || agentStatus === 'offline'}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {agentStatus === 'offline' && (
                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                  <AlertCircle className="h-3 w-3" />
                  <span>Support is currently offline. We'll get back to you soon!</span>
                </div>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// Extend Window interface for Chatwoot
declare global {
  interface Window {
    chatwootSDK: any;
  }
}
