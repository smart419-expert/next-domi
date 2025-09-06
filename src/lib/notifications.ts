'use client';

import React from 'react';

export interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
}

class NotificationService {
  private permission: NotificationPermission = 'default';
  private isSupported: boolean = false;

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (typeof window === 'undefined' || !this.isSupported) {
      console.warn('Notifications are not supported in this browser');
      return 'denied';
    }

    if (this.permission === 'granted') {
      return 'granted';
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  }

  async showNotification(options: NotificationOptions): Promise<Notification | null> {
    if (typeof window === 'undefined' || !this.isSupported || this.permission !== 'granted') {
      console.warn('Notifications are not available or permission not granted');
      return null;
    }

    try {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/favicon.ico',
        badge: options.badge || '/favicon.ico',
        tag: options.tag,
        requireInteraction: options.requireInteraction || false,
        silent: options.silent || false,
      });

      // Auto-close after 5 seconds unless requireInteraction is true
      if (!options.requireInteraction) {
        setTimeout(() => {
          notification.close();
        }, 5000);
      }

      return notification;
    } catch (error) {
      console.error('Failed to show notification:', error);
      return null;
    }
  }

  async showChatNotification(message: string, sender: string): Promise<Notification | null> {
    return this.showNotification({
      title: `New message from ${sender}`,
      body: message.length > 100 ? message.substring(0, 100) + '...' : message,
      tag: 'chat-message',
      requireInteraction: false,
    });
  }

  getPermissionStatus(): NotificationPermission {
    return this.permission;
  }

  isPermissionGranted(): boolean {
    return this.permission === 'granted';
  }

  isPermissionDenied(): boolean {
    return this.permission === 'denied';
  }

  canRequestPermission(): boolean {
    return this.permission === 'default';
  }

  getIsSupported(): boolean {
    return this.isSupported;
  }
}

// Create singleton instance only in browser
export const notificationService = typeof window !== 'undefined' ? new NotificationService() : null;

// Hook for React components
export function useNotifications() {
  const [permission, setPermission] = React.useState<NotificationPermission>('denied');
  const [isClient, setIsClient] = React.useState(false);

  // Fix hydration issues by ensuring client-side only updates
  React.useEffect(() => {
    setIsClient(true);
    if (notificationService) {
      setPermission(notificationService.getPermissionStatus());
    }
  }, []);

  const requestPermission = async () => {
    if (!notificationService || !isClient) return 'denied';
    const newPermission = await notificationService.requestPermission();
    setPermission(newPermission);
    return newPermission;
  };

  const showNotification = notificationService?.showNotification.bind(notificationService) || (() => Promise.resolve(null));
  const showChatNotification = notificationService?.showChatNotification.bind(notificationService) || (() => Promise.resolve(null));

  return {
    permission,
    isSupported: isClient ? (notificationService?.getIsSupported() || false) : false,
    isGranted: isClient ? (notificationService?.isPermissionGranted() || false) : false,
    isDenied: isClient ? (notificationService?.isPermissionDenied() || true) : true,
    canRequest: isClient ? (notificationService?.canRequestPermission() || false) : false,
    requestPermission,
    showNotification,
    showChatNotification,
  };
}

