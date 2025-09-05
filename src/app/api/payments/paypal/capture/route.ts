import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, clientId, clientName } = body;

    // Validate input
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      );
    }

    if (!clientId || !clientName) {
      return NextResponse.json(
        { error: 'Client information required' },
        { status: 400 }
      );
    }

    // Mock PayPal payment capture
    // In a real implementation, this would call PayPal's capture API
    const mockTransactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock successful capture
    return NextResponse.json({
      success: true,
      transactionId: mockTransactionId,
      orderId: orderId,
      status: 'COMPLETED',
      capturedAt: new Date().toISOString(),
      clientId: clientId,
      clientName: clientName
    });

  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    return NextResponse.json(
      { error: 'Failed to capture PayPal payment' },
      { status: 500 }
    );
  }
}

