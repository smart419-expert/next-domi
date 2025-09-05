import { NextRequest, NextResponse } from 'next/server';

// Mock messages data
const mockMessages = [
  {
    id: 'msg-1',
    content: 'Hello! How can I help you today?',
    sender: 'admin' as const,
    timestamp: '2024-01-15T10:30:00Z',
    read: true
  },
  {
    id: 'msg-2',
    content: 'I need help with my account balance',
    sender: 'client' as const,
    timestamp: '2024-01-15T10:32:00Z',
    read: true
  },
  {
    id: 'msg-3',
    content: 'I can help you with that. Your current balance is $150.00. Is there anything specific you\'d like to know?',
    sender: 'admin' as const,
    timestamp: '2024-01-15T10:35:00Z',
    read: true
  },
  {
    id: 'msg-4',
    content: 'Thank you! That helps a lot.',
    sender: 'client' as const,
    timestamp: '2024-01-15T10:37:00Z',
    read: false
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In a real implementation, you would:
    // 1. Verify authentication
    // 2. Check if user has access to this client's messages
    // 3. Fetch from database with pagination

    return NextResponse.json({
      messages: mockMessages
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message content is required' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Verify authentication
    // 2. Determine sender (admin or client)
    // 3. Save to database
    // 4. Send real-time notification

    const newMessage = {
      id: `msg-${Date.now()}`,
      content: content.trim(),
      sender: 'client' as const, // Would be determined from auth context
      timestamp: new Date().toISOString(),
      read: false
    };

    return NextResponse.json({
      success: true,
      message: newMessage
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
