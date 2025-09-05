import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Mock WhatsApp invite logic
    console.log(`WhatsApp invite requested for: ${phone}`);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate WhatsApp invite link
    const inviteMessage = encodeURIComponent(
      'Join CustomerComm Platform! Click the link to get started with our customer communication platform.'
    );
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${inviteMessage}`;

    return NextResponse.json({
      success: true,
      whatsappLink: whatsappLink,
      message: 'WhatsApp invite link generated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate invite link' },
      { status: 500 }
    );
  }
}
