'use client';

import { ChatWidget, ChatUser } from '@/components/ChatWidget';

// Example usage of ChatWidget component
export function ChatWidgetExamples() {
  // Example 1: Basic Chat Widget
  const basicUser: ChatUser = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/api/placeholder/40/40',
    role: 'Client'
  };

  // Example 2: Admin User
  const adminUser: ChatUser = {
    id: 'admin-456',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: '/api/placeholder/40/40',
    role: 'Financial Advisor'
  };

  // Example 3: User without avatar
  const userWithoutAvatar: ChatUser = {
    id: 'user-789',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Premium Client'
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
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-900">ChatWidget Examples</h1>
      
      {/* Basic Chat Widget */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Basic Chat Widget</h2>
        <div className="relative h-96 border border-gray-200 rounded-lg">
          <ChatWidget
            user={basicUser}
            isOpen={true}
            position="bottom-right"
            theme="light"
            chatwootToken="YOUR_CHATWOOT_TOKEN"
            baseUrl="https://app.chatwoot.com"
            showFloatingButton={false}
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
          />
        </div>
      </div>

      {/* Admin Chat Widget */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Admin Chat Widget</h2>
        <div className="relative h-96 border border-gray-200 rounded-lg">
          <ChatWidget
            user={adminUser}
            isOpen={true}
            position="bottom-left"
            theme="dark"
            chatwootToken="YOUR_CHATWOOT_TOKEN"
            baseUrl="https://app.chatwoot.com"
            showFloatingButton={false}
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
          />
        </div>
      </div>

      {/* User without Avatar */}
      <div>
        <h2 className="text-xl font-semibold mb-4">User without Avatar</h2>
        <div className="relative h-96 border border-gray-200 rounded-lg">
          <ChatWidget
            user={userWithoutAvatar}
            isOpen={true}
            position="top-right"
            theme="light"
            chatwootToken="YOUR_CHATWOOT_TOKEN"
            baseUrl="https://app.chatwoot.com"
            showFloatingButton={false}
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
          />
        </div>
      </div>

      {/* Floating Button Only */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Floating Button Only</h2>
        <div className="relative h-32 border border-gray-200 rounded-lg">
          <ChatWidget
            user={basicUser}
            isOpen={false}
            position="bottom-right"
            theme="light"
            chatwootToken="YOUR_CHATWOOT_TOKEN"
            baseUrl="https://app.chatwoot.com"
            showFloatingButton={true}
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
          />
        </div>
      </div>

      {/* Configuration Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Configuration Instructions</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>1. Get your Chatwoot token:</strong> Go to your Chatwoot dashboard → Settings → Applications → Web Widget</p>
          <p><strong>2. Set your base URL:</strong> Use your Chatwoot instance URL (e.g., https://your-domain.chatwoot.com)</p>
          <p><strong>3. Configure user data:</strong> Pass user information for auto-identification</p>
          <p><strong>4. Customize appearance:</strong> Use position, theme, and className props for styling</p>
        </div>
      </div>
    </div>
  );
}
