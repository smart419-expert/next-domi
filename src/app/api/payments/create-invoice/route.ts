import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, clientId, clientName, method } = body;

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!clientId || !clientName) {
      return NextResponse.json(
        { error: 'Client information required' },
        { status: 400 }
      );
    }

    if (!method) {
      return NextResponse.json(
        { error: 'Payment method required' },
        { status: 400 }
      );
    }

    // Generate mock payment data
    const invoiceId = `INV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Generate payment link based on method
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const paymentLink = `${baseUrl}/pay/${invoiceId}`;
    
    // Generate QR data (payment string for mobile apps)
    const qrData = generateQRData(method, amount, invoiceId, clientId);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      invoiceId: invoiceId,
      paymentLink: paymentLink,
      qrData: qrData,
      amount: amount,
      currency: 'USD',
      method: method,
      clientId: clientId,
      clientName: clientName,
      status: 'PENDING',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}

function generateQRData(method: string, amount: number, invoiceId: string, clientId: string): string {
  // Generate mock QR data based on payment method
  const baseData = {
    amount: amount,
    invoiceId: invoiceId,
    clientId: clientId,
    timestamp: Date.now()
  };

  switch (method) {
    case 'ath-movil':
      return `athmovil://pay?amount=${amount}&ref=${invoiceId}&client=${clientId}`;
    case 'zelle':
      return `zelle://pay?amount=${amount}&memo=${invoiceId}&client=${clientId}`;
    case 'cashapp':
      return `cashapp://pay?amount=${amount}&note=${invoiceId}&client=${clientId}`;
    case 'chime':
      return `chime://pay?amount=${amount}&ref=${invoiceId}&client=${clientId}`;
    default:
      return JSON.stringify(baseData);
  }
}

