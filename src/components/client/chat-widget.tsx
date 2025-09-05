'use client';

import { useState } from 'react';
import { ChatWidget, ChatUser } from '@/components/ChatWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Phone, 
  Video, 
  Mail, 
  Clock,
  User,
  Bot
} from 'lucide-react';

export function ClientChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Mock user data - in a real app, this would come from your auth system
  const currentUser: ChatUser = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/api/placeholder/40/40',
    role: 'Client'
  };

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // In a real app, this would send the message to your backend
  };

  const handleTyping = (isTyping: boolean) => {
    console.log('User is typing:', isTyping);
    // In a real app, this would notify the agent
  };

  return (
    <div className="space-y-6">
      {/* Chat Widget */}
      <ChatWidget
        user={currentUser}
        isOpen={isChatOpen}
        onToggle={setIsChatOpen}
        position="bottom-right"
        theme="light"
        chatwootToken="YOUR_CHATWOOT_TOKEN" // Replace with your actual token
        baseUrl="https://app.chatwoot.com" // Replace with your Chatwoot instance URL
        showFloatingButton={true}
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
      />

      {/* Chat Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                Live Chat Support
              </h2>
              <p className="text-gray-600">
                Connect with your financial team in real-time for instant support
              </p>
            </div>
            <Button
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Open Chat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Schedule Call</h3>
            <p className="text-sm text-gray-500">Book a phone consultation with your advisor</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Video Meeting</h3>
            <p className="text-sm text-gray-500">Start a video call with your team</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Send Email</h3>
            <p className="text-sm text-gray-500">Send a detailed message via email</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-1">
                Need Immediate Assistance?
              </h3>
              <p className="text-blue-700">
                Our support team is available 24/7 for urgent matters.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
