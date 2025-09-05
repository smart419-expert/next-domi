import { NextRequest, NextResponse } from 'next/server';

// Mock notifications data
const mockNotifications = [
  {
    id: 'notif-1',
    type: 'message' as const,
    title: 'New Message',
    message: 'You have a new message from admin',
    read: false,
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 'notif-2',
    type: 'file_upload' as const,
    title: 'File Uploaded',
    message: 'A new file has been uploaded to your account',
    read: false,
    timestamp: '2024-01-15T09:15:00Z'
  },
  {
    id: 'notif-3',
    type: 'payment' as const,
    title: 'Payment Received',
    message: 'Your payment of $50.00 has been processed',
    read: true,
    timestamp: '2024-01-14T16:20:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would:
    // 1. Verify authentication
    // 2. Fetch user-specific notifications from database
    // 3. Apply pagination

    return NextResponse.json({
      notifications: mockNotifications
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}
