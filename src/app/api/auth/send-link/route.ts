import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Mock email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Simulate sending magic link
    console.log(`Magic link sent to: ${email}`);
    
    // Mock delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Magic link sent to your email',
      email: email,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in /api/auth/send-link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
}
