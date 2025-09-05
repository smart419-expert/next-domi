import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { method: string } }
) {
  try {
    const { method } = params;
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount') || '100.00';

    // In a real implementation, you would:
    // 1. Verify authentication
    // 2. Generate QR code based on payment method
    // 3. Return QR code and payment details

    const paymentMethods = {
      'ath-movil': {
        account: '787-123-4567',
        amount: parseFloat(amount),
        reference: `ATH-${Date.now()}`
      },
      'zelle': {
        account: 'user@example.com',
        amount: parseFloat(amount),
        reference: `ZELLE-${Date.now()}`
      },
      'cashapp': {
        account: '$username',
        amount: parseFloat(amount),
        reference: `CASHAPP-${Date.now()}`
      },
      'chime': {
        account: 'user@example.com',
        amount: parseFloat(amount),
        reference: `CHIME-${Date.now()}`
      }
    };

    const paymentInfo = paymentMethods[method as keyof typeof paymentMethods];

    if (!paymentInfo) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Mock QR code (in real implementation, generate actual QR code)
    const mockQRCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

    return NextResponse.json({
      success: true,
      qrCode: mockQRCode,
      paymentInfo
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
