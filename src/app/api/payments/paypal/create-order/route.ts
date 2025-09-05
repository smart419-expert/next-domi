import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, clientId, clientName } = body;

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

    // Mock PayPal order creation
    // In a real implementation, this would call PayPal's API
    const mockOrderId = `PAYPAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: amount,
      currency: 'USD',
      clientId: clientId,
      clientName: clientName,
      status: 'CREATED',
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}