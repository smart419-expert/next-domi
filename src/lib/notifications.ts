'use client';

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
    this.isSupported = 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported) {
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
    if (!this.isSupported || this.permission !== 'granted') {
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
}

// Create singleton instance
export const notificationService = new NotificationService();

// Hook for React components
export function useNotifications() {
  const [permission, setPermission] = React.useState<NotificationPermission>(
    notificationService.getPermissionStatus()
  );

  const requestPermission = async () => {
    const newPermission = await notificationService.requestPermission();
    setPermission(newPermission);
    return newPermission;
  };

  const showNotification = notificationService.showNotification.bind(notificationService);
  const showChatNotification = notificationService.showChatNotification.bind(notificationService);

  return {
    permission,
    isSupported: notificationService.isSupported,
    isGranted: notificationService.isPermissionGranted(),
    isDenied: notificationService.isPermissionDenied(),
    canRequest: notificationService.canRequestPermission(),
    requestPermission,
    showNotification,
    showChatNotification,
  };
}

// Import React for the hook
import React from 'react';
