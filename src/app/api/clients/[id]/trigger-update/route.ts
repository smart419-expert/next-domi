import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = params.id;
    
    // Simulate some processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response with updated timestamp
    return NextResponse.json({
      success: true,
      message: 'Update requested successfully',
      updatedAt: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + 60000).toISOString(), // Next update in 60 seconds
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to trigger update' },
      { status: 500 }
    );
  }
}
