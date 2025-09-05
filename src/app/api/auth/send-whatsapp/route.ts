import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Mock phone validation (basic format check)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Generate mock WhatsApp link
    const cleanPhone = phone.replace(/\s/g, '');
    const whatsappLink = `https://wa.me/${cleanPhone}?text=Hello! You've been invited to join our platform. Click here to get started: https://localhost:3001/login`;

    // Simulate sending WhatsApp invite
    console.log(`WhatsApp invite sent to: ${phone}`);
    console.log(`WhatsApp link: ${whatsappLink}`);
    
    // Mock delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'WhatsApp invite sent successfully',
      whatsappLink: whatsappLink,
      phone: phone,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in /api/auth/send-whatsapp:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send WhatsApp invite' },
      { status: 500 }
    );
  }
}
