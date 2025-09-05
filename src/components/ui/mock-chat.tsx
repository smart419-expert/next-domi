'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Avatar } from './avatar';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { 
  Send, 
  MessageSquare, 
  Clock, 
  Check, 
  CheckCheck, 
  MoreVertical,
  Phone,
  Video,
  Smile
} from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  sender: 'admin' | 'client';
  timestamp: string;
  read: boolean;
  delivered: boolean;
}

interface MockChatProps {
  clientId: string;
  clientName: string;
  onNewMessage?: (message: Message) => void;
  className?: string;
}

export function MockChat({ clientId, clientName, onNewMessage, className }: MockChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Mock WebSocket connection
  useEffect(() => {
    const connectToChat = async () => {
      try {
        setConnectionStatus('connecting');
        
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get mock connection details
        const response = await axios.post('/api/chat/connect', { clientId });
        
        if (response.data.success) {
          setIsConnected(true);
          setConnectionStatus('connected');
          
          // Simulate receiving initial messages
          const initialMessages: Message[] = [
            {
              id: 'msg-1',
              content: 'Hello! How can I help you today?',
              sender: 'admin',
              timestamp: new Date().toISOString(),
              read: true,
              delivered: true,
            },
            {
              id: 'msg-2',
              content: 'Hi there! I need help with my account.',
              sender: 'client',
              timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
              read: true,
              delivered: true,
            },
          ];
          
          setMessages(initialMessages);
        }
      } catch (error) {
        console.error('Failed to connect to chat:', error);
        setConnectionStatus('disconnected');
      }
    };

    connectToChat();

    // Simulate periodic connection status updates
    const statusInterval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance of disconnection
        setIsConnected(false);
        setConnectionStatus('disconnected');
      } else if (!isConnected && connectionStatus === 'disconnected') {
        setConnectionStatus('connecting');
        setTimeout(() => {
          setIsConnected(true);
          setConnectionStatus('connected');
        }, 2000);
      }
    }, 10000);

    return () => {
      clearInterval(statusInterval);
    };
  }, [clientId, isConnected, connectionStatus]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isTyping]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage.trim(),
      sender: 'admin',
      timestamp: new Date().toISOString(),
      read: false,
      delivered: false,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    onNewMessage?.(message);

    // Simulate message delivery and read status
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, delivered: true }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, read: true }
            : msg
        )
      );
    }, 3000);

    // Simulate client response
    setTimeout(() => {
      const clientResponse: Message = {
        id: `msg-${Date.now()}-response`,
        content: generateMockResponse(newMessage),
        sender: 'client',
        timestamp: new Date().toISOString(),
        read: true,
        delivered: true,
      };

      setMessages(prev => [...prev, clientResponse]);
      onNewMessage?.(clientResponse);
    }, Math.random() * 3000 + 2000); // 2-5 seconds delay
  };

  const generateMockResponse = (userMessage: string): string => {
    const responses = [
      "That's interesting, tell me more about that.",
      "I understand. Let me help you with that.",
      "Thanks for letting me know. I'll look into it.",
      "I see what you mean. Here's what I think...",
      "That makes sense. Let me check on that for you.",
      "I appreciate you bringing this up.",
      "Let me see what I can do about that.",
      "That's a good point. Let me investigate.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'connecting': return 'text-yellow-600';
      case 'disconnected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      default: return 'Unknown';
    }
  };

  return (
    <div className={cn('h-full flex flex-col bg-white', className)}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar name={clientName} size="sm" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{clientName}</h3>
              <div className="flex items-center space-x-2">
                <div className={cn('w-2 h-2 rounded-full', {
                  'bg-green-500': connectionStatus === 'connected',
                  'bg-yellow-500': connectionStatus === 'connecting',
                  'bg-red-500': connectionStatus === 'disconnected',
                })} />
                <span className={cn('text-sm', getConnectionStatusColor())}>
                  {getConnectionStatusText()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

              <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: '300px', maxHeight: '500px' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start space-x-2',
                message.sender === 'admin' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'client' && (
                <Avatar name={clientName} size="sm" />
              )}
              
              <div
                className={cn(
                  'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
                  message.sender === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={cn(
                    'text-xs',
                    message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                  )}>
                    {formatTime(message.timestamp)}
                  </span>
                  {message.sender === 'admin' && (
                    <div className="flex items-center space-x-1 ml-2">
                      {message.delivered ? (
                        message.read ? (
                          <CheckCheck className="h-3 w-3 text-blue-200" />
                        ) : (
                          <CheckCheck className="h-3 w-3 text-blue-200" />
                        )
                      ) : (
                        <Check className="h-3 w-3 text-blue-200" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {message.sender === 'admin' && (
                <Avatar name="Admin" size="sm" />
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-2">
              <Avatar name={clientName} size="sm" />
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={!isConnected}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || !isConnected}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
