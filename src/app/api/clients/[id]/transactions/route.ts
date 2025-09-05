import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Mock transaction data
    // In a real application, this would fetch from the database
    const mockTransactions = [
      {
        id: 'txn_001',
        clientId: id,
        amount: 150.00,
        balanceAfter: 150.00,
        note: 'Initial account setup',
        adminName: 'Admin User',
        type: 'credit',
        date: '2024-01-15T10:30:00Z',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 'txn_002',
        clientId: id,
        amount: -25.00,
        balanceAfter: 125.00,
        note: 'Service fee deduction',
        adminName: 'Admin User',
        type: 'debit',
        date: '2024-01-20T14:15:00Z',
        createdAt: '2024-01-20T14:15:00Z'
      },
      {
        id: 'txn_003',
        clientId: id,
        amount: 50.00,
        balanceAfter: 175.00,
        note: 'Payment received',
        adminName: 'Admin User',
        type: 'credit',
        date: '2024-01-25T09:45:00Z',
        createdAt: '2024-01-25T09:45:00Z'
      },
      {
        id: 'txn_004',
        clientId: id,
        amount: -75.00,
        balanceAfter: 100.00,
        note: 'Monthly subscription fee',
        adminName: 'Admin User',
        type: 'debit',
        date: '2024-02-01T00:00:00Z',
        createdAt: '2024-02-01T00:00:00Z'
      }
    ];

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      transactions: mockTransactions,
      total: mockTransactions.length
    });

  } catch (error) {
    console.error('Error fetching client transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}