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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <ClientSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <ClientHeader 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 bg-white dark:bg-gray-900">
          {children}
        </main>

        {/* Footer */}
        <ClientFooter />
      </div>
    </div>
  );
}