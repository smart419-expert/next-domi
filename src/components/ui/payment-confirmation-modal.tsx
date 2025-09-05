'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { CheckCircle, X, CreditCard, Smartphone, QrCode, ExternalLink } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PaymentData {
  amount: number;
  clientId: string;
  clientName: string;
  method: string;
  orderId?: string;
  paymentLink?: string;
  qrData?: string;
  transactionId?: string;
}

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: PaymentData | null;
}

export function PaymentConfirmationModal({ 
  isOpen, 
  onClose, 
  paymentData 
}: PaymentConfirmationModalProps) {
  if (!isOpen || !paymentData) return null;

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'paypal':
        return <CreditCard className="h-5 w-5" />;
      case 'ath-movil':
      case 'zelle':
      case 'cashapp':
      case 'chime':
        return <Smartphone className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case 'paypal':
        return 'PayPal';
      case 'ath-movil':
        return 'ATH Móvil';
      case 'zelle':
        return 'Zelle';
      case 'cashapp':
        return 'Cash App';
      case 'chime':
        return 'Chime';
      default:
        return method;
    }
  };

  const getStatusMessage = () => {
    if (paymentData.orderId || paymentData.transactionId) {
      return 'Payment completed successfully!';
    } else if (paymentData.paymentLink || paymentData.qrData) {
      return 'Payment link generated successfully!';
    }
    return 'Payment processed successfully!';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle className="text-xl">Payment Confirmed</CardTitle>
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
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success Message */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {getStatusMessage()}
            </h3>
            <p className="text-gray-500">
              Your payment has been processed and will be reflected in the client's account.
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="font-medium text-gray-900">Payment Details</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="font-medium">{paymentData.clientName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">{formatCurrency(paymentData.amount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <div className="flex items-center space-x-1">
                  {getMethodIcon(paymentData.method)}
                  <span className="font-medium">{getMethodName(paymentData.method)}</span>
                </div>
              </div>

              {paymentData.orderId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-xs">{paymentData.orderId}</span>
                </div>
              )}

              {paymentData.transactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-xs">{paymentData.transactionId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Payment will be reflected in client's balance</li>
              <li>• Transaction added to payment history</li>
              <li>• Client will receive payment confirmation</li>
              {paymentData.paymentLink && (
                <li>• Payment link remains active for future use</li>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                // Navigate to client details or payment history
                window.location.href = `/clients/${paymentData.clientId}`;
              }}
              variant="outline"
              className="flex-1"
            >
              View Client
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

