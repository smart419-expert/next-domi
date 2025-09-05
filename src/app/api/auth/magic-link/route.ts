import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Mock magic link sending
    console.log(`Magic link sent to: ${email}`);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, you would:
    // 1. Generate a secure token
    // 2. Store it in database with expiration
    // 3. Send email with magic link

    return NextResponse.json({
      success: true,
      message: 'Magic link sent to your email'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
}
