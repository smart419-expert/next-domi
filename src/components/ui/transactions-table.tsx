'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { History, TrendingUp, TrendingDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  balanceAfter: number;
  note: string;
  adminName: string;
  type: 'credit' | 'debit';
}

interface TransactionsTableProps {
  transactions: Transaction[];
  className?: string;
}

export function TransactionsTable({ transactions, className }: TransactionsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (transactions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-gray-600" />
            <CardTitle>Transaction History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
            <p className="text-gray-500">Transaction history will appear here once balance changes are made.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <History className="h-5 w-5 text-gray-600" />
          <CardTitle>Transaction History</CardTitle>
        </div>
        <p className="text-sm text-gray-500">
          Recent account activity and balance changes
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  transaction.type === 'credit' 
                    ? "bg-green-100 text-green-600" 
                    : "bg-red-100 text-red-600"
                )}>
                  {transaction.type === 'credit' ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.note}
                    </span>
                    <Badge 
                      variant={transaction.type === 'credit' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{transaction.adminName}</span>
                    </div>
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={cn(
                  "text-lg font-semibold",
                  transaction.type === 'credit' ? "text-green-600" : "text-red-600"
                )}>
                  {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                </div>
                <div className="text-sm text-gray-500">
                  Balance: {formatCurrency(transaction.balanceAfter)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
