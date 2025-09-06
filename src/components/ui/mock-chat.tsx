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
import { useTheme } from '@/contexts/theme-context';

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
  const { actualTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true); // Always connected for demo
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  // Demo mode - always connected with initial messages
  useEffect(() => {
    // For demo purposes, we're always connected
    setIsConnected(true);
    
    // Load initial demo messages
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
  }, [clientId]);

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
    return 'text-green-600'; // Always green for ONLINE
  };

  const getConnectionStatusText = () => {
    return 'ONLINE'; // Always show ONLINE for demo
  };

  return (
    <div className={cn(
      'h-full flex flex-col',
      actualTheme === 'dark' ? 'bg-gray-900' : 'bg-white',
      className
    )}>
      <div className={cn(
        'p-4 border-b',
        actualTheme === 'dark' 
          ? 'border-gray-700 bg-gray-800' 
          : 'border-gray-200 bg-gray-50'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h3 className={cn(
                'text-lg font-semibold',
                actualTheme === 'dark' ? 'text-white' : 'text-gray-900'
              )}>{clientName}</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className={cn(
                  'text-sm',
                  actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-600',
                  getConnectionStatusColor()
                )}>
                  {getConnectionStatusText()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className={cn(
              actualTheme === 'dark' 
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            )}>
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className={cn(
              actualTheme === 'dark' 
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            )}>
              <Video className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className={cn(
              actualTheme === 'dark' 
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            )}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className={cn(
        'flex-1 flex flex-col overflow-hidden',
        actualTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
      )}>
        {/* Messages Area */}
        <div className={cn(
          'flex-1 overflow-y-auto p-4 space-y-4',
          actualTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
        )}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start space-x-3 mb-4',
                message.sender === 'admin' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'client' && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-semibold">
                  {clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
              )}
              
              <div className="flex flex-col max-w-xs lg:max-w-md">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={cn(
                    'text-xs font-medium',
                    actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {message.sender === 'admin' ? 'Admin' : clientName}
                  </span>
                  <span className={cn(
                    'text-xs',
                    actualTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  )}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <div
                  className={cn(
                    'px-4 py-3 rounded-lg relative',
                    message.sender === 'admin'
                      ? actualTheme === 'dark' 
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                      : 'bg-blue-600 text-white'
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {message.sender === 'admin' && (
                    <div className="flex items-center justify-end mt-1">
                      <div className="flex items-center space-x-1">
                        {message.delivered ? (
                          message.read ? (
                            <CheckCheck className="h-3 w-3 text-gray-400" />
                          ) : (
                            <CheckCheck className="h-3 w-3 text-gray-400" />
                          )
                        ) : (
                          <Check className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {message.sender === 'admin' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  A
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-semibold">
                {clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div className={cn(
                'px-4 py-3 rounded-lg',
                actualTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              )}>
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
      </div>

      {/* Message Input */}
      <div className={cn(
        'border-t p-4',
        actualTheme === 'dark' 
          ? 'border-gray-700 bg-gray-800' 
          : 'border-gray-200 bg-gray-50'
      )}>
        <div className="flex items-center space-x-3">
          <Button size="sm" variant="ghost" className={cn(
            actualTheme === 'dark' 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          )}>
            <Smile className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={!isConnected}
              className={cn(
                'w-full',
                actualTheme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500'
              )}
            />
          </div>
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Demo mode - no connection status needed */}
      </div>
    </div>
  );
}
