'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Paperclip,
  Smile
} from 'lucide-react';

export default function ClientMessages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Financial Advisor',
      lastMessage: 'I\'ve reviewed your portfolio and have some recommendations...',
      timestamp: '2 hours ago',
      unread: 2,
      status: 'online'
    },
    {
      id: 2,
      name: 'Support Team',
      role: 'Customer Support',
      lastMessage: 'Your document request has been processed.',
      timestamp: '1 day ago',
      unread: 0,
      status: 'offline'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Account Manager',
      lastMessage: 'The quarterly review meeting is scheduled for next week.',
      timestamp: '3 days ago',
      unread: 1,
      status: 'away'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      content: 'Hello! I hope you\'re doing well. I\'ve completed the review of your portfolio and have some exciting updates to share.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Hi Sarah! Thank you for the update. I\'m looking forward to hearing about the recommendations.',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      content: 'Great! Your portfolio has performed exceptionally well this quarter with a 12.5% return. I\'d like to discuss some rebalancing options to optimize for the next quarter.',
      timestamp: '10:40 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'Sarah Johnson',
      content: 'I\'ve prepared a detailed analysis document that I\'ll share with you shortly. Would you be available for a call this week to discuss the details?',
      timestamp: '10:42 AM',
      isOwn: false
    }
  ];

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">
          Communicate with your financial team and get support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Conversations</CardTitle>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  New Chat
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          conversation.status === 'online' ? 'bg-green-500' :
                          conversation.status === 'away' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {conversation.name}
                          </h4>
                          {conversation.unread > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{conversation.role}</p>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {conversation.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{selectedConv.name}</CardTitle>
                      <CardDescription>{selectedConv.role}</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="min-h-[40px] max-h-32 resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a conversation from the list to start messaging.</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}