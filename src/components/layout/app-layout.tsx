'use client';

import * as React from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Container } from './container';
import { useLayout } from './layout-context';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const { 
    isSidebarOpen, 
    isSidebarCollapsed, 
    toggleSidebar, 
    toggleSidebarCollapse, 
    closeSidebar 
  } = useLayout();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header 
        onMenuClick={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        onClose={closeSidebar}
      />

      {/* Main content */}
      <main
        id="main-content"
        className={cn(
          'pt-16 transition-all duration-300 ease-in-out bg-slate-50',
          'lg:ml-16', // Default collapsed width (64px)
          !isSidebarCollapsed && 'lg:ml-64', // Expanded width (256px)
          className
        )}
        role="main"
      >
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
}
