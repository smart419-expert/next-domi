import { NextRequest, NextResponse } from 'next/server';

// Mock client data
const mockClient = {
  id: '1',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  phone: '+1234567890',
  balance: 150.00,
  status: 'active' as const,
  lastLogin: '2024-01-15T10:30:00Z',
  createdAt: '2024-01-01T00:00:00Z',
  avatar: null,
  updatedAt: new Date().toISOString(),
  nextUpdate: new Date(Date.now() + 60000).toISOString(), // Next update in 60 seconds
  lastMessageAt: '2024-01-15T10:35:00Z',
  lastUploadAt: '2024-01-15T10:30:00Z',
  unreadMessages: 2,
  newUploads: 1,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params;
    
    // Simulate some delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return client data with next update timestamp
    return NextResponse.json({
      success: true,
      client: {
        ...mockClient,
        id: clientId,
        updatedAt: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + 60000).toISOString(), // Next update in 60 seconds
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch client data' },
      { status: 500 }
    );
  }
}