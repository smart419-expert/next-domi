'use client';

import * as React from 'react';

interface LayoutContextType {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  closeSidebar: () => void;
}

const LayoutContext = React.createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const toggleSidebarCollapse = React.useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const closeSidebar = React.useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // Close sidebar on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen, closeSidebar]);

  // Close sidebar on route change (mobile)
  React.useEffect(() => {
    const handleRouteChange = () => {
      if (isSidebarOpen) {
        closeSidebar();
      }
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [isSidebarOpen, closeSidebar]);

  const value = React.useMemo(
    () => ({
      isSidebarOpen,
      isSidebarCollapsed,
      toggleSidebar,
      toggleSidebarCollapse,
      closeSidebar,
    }),
    [isSidebarOpen, isSidebarCollapsed, toggleSidebar, toggleSidebarCollapse, closeSidebar]
  );

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = React.useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
