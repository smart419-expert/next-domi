'use client';

import React from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { DollarSign, Edit3, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BalanceDisplayProps {
  balance: number;
  clientName: string;
  onEditClick: () => void;
  className?: string;
}

export function BalanceDisplay({ 
  balance, 
  clientName, 
  onEditClick, 
  className 
}: BalanceDisplayProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getBalanceStatus = (balance: number) => {
    if (balance > 0) return { status: 'positive', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (balance < 0) return { status: 'negative', color: 'text-red-600', bgColor: 'bg-red-50' };
    return { status: 'zero', color: 'text-gray-600', bgColor: 'bg-gray-50' };
  };

  const { status, color, bgColor } = getBalanceStatus(balance);

  return (
    <Card className={cn('card-premium', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-xl">Account Balance</CardTitle>
          </div>
          <Button
            onClick={onEditClick}
            size="sm"
            className="btn-gradient-blue"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Balance
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          Current balance for {clientName}
        </p>
      </CardHeader>

      <CardContent>
        <div className={cn('p-6 rounded-lg border-2', bgColor)}>
          <div className="text-center">
            <div className={cn('text-4xl font-bold mb-2', color)}>
              {formatCurrency(balance)}
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge 
                variant={status === 'positive' ? 'default' : status === 'negative' ? 'destructive' : 'secondary'}
                className="text-sm"
              >
                {status === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                {status === 'negative' && <TrendingDown className="h-3 w-3 mr-1" />}
                {status === 'positive' ? 'Credit Balance' : 
                 status === 'negative' ? 'Overdue Balance' : 'Zero Balance'}
              </Badge>
            </div>

            <div className="text-sm text-gray-600">
              {status === 'positive' && 'Client has a positive account balance'}
              {status === 'negative' && 'Client has an overdue balance that requires attention'}
              {status === 'zero' && 'Client account is at zero balance'}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
            onClick={() => {/* TODO: Add payment functionality */}}
          >
            <DollarSign className="h-4 w-4" />
            <span>Add Payment</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
            onClick={() => {/* TODO: Add adjustment functionality */}}
          >
            <Edit3 className="h-4 w-4" />
            <span>Adjust Balance</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
