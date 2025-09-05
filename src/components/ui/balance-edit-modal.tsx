'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { X, DollarSign, Edit3, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BalanceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  clientName: string;
  onSave: (data: BalanceEditData) => Promise<void>;
}

export interface BalanceEditData {
  newBalance: number;
  changeReason: string;
  transactionAmount: number;
}

export function BalanceEditModal({ 
  isOpen, 
  onClose, 
  currentBalance, 
  clientName, 
  onSave 
}: BalanceEditModalProps) {
  const [formData, setFormData] = useState<BalanceEditData>({
    newBalance: currentBalance,
    changeReason: '',
    transactionAmount: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<BalanceEditData>>({});

  const handleInputChange = (field: keyof BalanceEditData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const calculateTransactionAmount = () => {
    const amount = formData.newBalance - currentBalance;
    setFormData(prev => ({ ...prev, transactionAmount: amount }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BalanceEditData> = {};

    if (!formData.changeReason.trim()) {
      newErrors.changeReason = 'Change reason is required';
    }

    if (formData.newBalance < 0) {
      newErrors.newBalance = 'Balance cannot be negative';
    }

    if (Math.abs(formData.newBalance - currentBalance) > 100000) {
      newErrors.newBalance = 'Balance change too large (max $100,000)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
      // Reset form
      setFormData({
        newBalance: currentBalance,
        changeReason: '',
        transactionAmount: 0
      });
    } catch (error) {
      console.error('Error updating balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Edit3 className="h-5 w-5 text-blue-600" />
              <CardTitle>Edit Balance</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Update balance for {clientName}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Balance Display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-gray-600">Current Balance</Label>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(currentBalance)}
              </div>
            </div>

            {/* New Balance Input */}
            <div className="space-y-2">
              <Label htmlFor="newBalance">New Balance</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="newBalance"
                  type="number"
                  step="0.01"
                  value={formData.newBalance}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    handleInputChange('newBalance', value);
                    calculateTransactionAmount();
                  }}
                  className={cn(
                    "pl-10",
                    errors.newBalance && "border-red-500 focus:border-red-500"
                  )}
                  placeholder="0.00"
                />
              </div>
              {errors.newBalance && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.newBalance}
                </p>
              )}
            </div>

            {/* Transaction Amount Display */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <Label className="text-sm font-medium text-blue-800">Transaction Amount</Label>
              <div className={cn(
                "text-lg font-semibold mt-1",
                formData.transactionAmount >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {formData.transactionAmount >= 0 ? '+' : ''}{formatCurrency(formData.transactionAmount)}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                {formData.transactionAmount >= 0 ? 'Credit' : 'Debit'} transaction
              </p>
            </div>

            {/* Change Reason */}
            <div className="space-y-2">
              <Label htmlFor="changeReason">Change Reason *</Label>
              <Textarea
                id="changeReason"
                value={formData.changeReason}
                onChange={(e) => handleInputChange('changeReason', e.target.value)}
                className={cn(
                  "min-h-[80px]",
                  errors.changeReason && "border-red-500 focus:border-red-500"
                )}
                placeholder="Enter reason for balance change..."
              />
              {errors.changeReason && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.changeReason}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Update Balance'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
