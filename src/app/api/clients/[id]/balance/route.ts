import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { balance, note } = body;

    // Validate input
    if (typeof balance !== 'number' || balance < 0) {
      return NextResponse.json(
        { error: 'Invalid balance amount' },
        { status: 400 }
      );
    }

    if (!note || typeof note !== 'string' || note.trim().length === 0) {
      return NextResponse.json(
        { error: 'Note is required' },
        { status: 400 }
      );
    }

    // Mock database update
    // In a real application, this would update the database
    const updatedClient = {
      id,
      balance,
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin@example.com' // In real app, get from auth context
    };

    // Mock transaction creation
    const transaction = {
      id: `txn_${Date.now()}`,
      clientId: id,
      amount: balance, // This would be calculated as newBalance - oldBalance
      balanceAfter: balance,
      note: note.trim(),
      adminName: 'Admin User', // In real app, get from auth context
      type: balance > 0 ? 'credit' : 'debit',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      client: updatedClient,
      transaction
    });

  } catch (error) {
    console.error('Error updating client balance:', error);
    return NextResponse.json(
      { error: 'Failed to update balance' },
      { status: 500 }
    );
  }
}