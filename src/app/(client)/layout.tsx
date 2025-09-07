'use client';

import { useState } from 'react';
import { ClientHeader } from '@/components/client/client-header';
import { ClientFooter } from '@/components/client/client-footer';
import { ClientSidebar } from '@/components/client/client-sidebar';
import { cn } from '@/lib/utils';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* Sidebar */}
      <ClientSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0 overflow-x-hidden">
        {/* Header */}
        <ClientHeader 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

        {/* Footer */}
        <ClientFooter />
      </div>
    </div>
  );
}
