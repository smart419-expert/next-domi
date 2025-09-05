'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { CreditCard, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import axios from 'axios';

interface PayPalPaymentProps {
  amount: number;
  clientId: string;
  clientName: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PayPalPayment({ 
  amount, 
  clientId, 
  clientName, 
  onSuccess, 
  onError 
}: PayPalPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [status, setStatus] = useState<'idle' | 'creating' | 'approving' | 'capturing' | 'success' | 'error'>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);
  const paypalRef = useRef<HTMLDivElement>(null);

  // Load PayPal SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=mock-paypal-client-id&currency=USD';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      onError('Failed to load PayPal SDK');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onError]);

  // Initialize PayPal buttons when script is loaded
  useEffect(() => {
    if (isScriptLoaded && paypalRef.current && window.paypal) {
      // Clear previous buttons
      paypalRef.current.innerHTML = '';

      window.paypal.Buttons({
        createOrder: async () => {
          try {
            setStatus('creating');
            setIsLoading(true);
            
            const response = await axios.post('/api/payments/paypal/create-order', {
              amount,
              clientId,
              clientName
            });

            if (response.data.success) {
              setOrderId(response.data.orderId);
              setStatus('approving');
              return response.data.orderId;
            } else {
              throw new Error(response.data.error || 'Failed to create order');
            }
          } catch (error) {
            console.error('Error creating PayPal order:', error);
            setStatus('error');
            onError(error);
            throw error;
          } finally {
            setIsLoading(false);
          }
        },
        onApprove: async (data: any) => {
          try {
            setStatus('capturing');
            setIsLoading(true);

            const response = await axios.post('/api/payments/paypal/capture', {
              orderId: data.orderID,
              clientId,
              clientName
            });

            if (response.data.success) {
              setStatus('success');
              onSuccess({
                amount,
                clientId,
                clientName,
                method: 'paypal',
                orderId: data.orderID,
                transactionId: response.data.transactionId
              });
            } else {
              throw new Error(response.data.error || 'Failed to capture payment');
            }
          } catch (error) {
            console.error('Error capturing PayPal payment:', error);
            setStatus('error');
            onError(error);
          } finally {
            setIsLoading(false);
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          setStatus('error');
          onError(err);
        },
        onCancel: () => {
          setStatus('idle');
        }
      }).render(paypalRef.current);
    }
  }, [isScriptLoaded, amount, clientId, clientName, onSuccess, onError]);

  const getStatusIcon = () => {
    switch (status) {
      case 'creating':
      case 'approving':
      case 'capturing':
        return <Loader2 className="h-5 w-5 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'creating':
        return 'Creating order...';
      case 'approving':
        return 'Waiting for approval...';
      case 'capturing':
        return 'Processing payment...';
      case 'success':
        return 'Payment successful!';
      case 'error':
        return 'Payment failed';
      default:
        return 'Ready to pay';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
          PayPal Payment
        </CardTitle>
        <p className="text-sm text-gray-500">
          Pay securely with PayPal - {formatCurrency(amount)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status Display */}
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            {getStatusIcon()}
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>

          {/* PayPal Buttons Container */}
          <div className="min-h-[100px] flex items-center justify-center">
            {!isScriptLoaded ? (
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-500">Loading PayPal...</p>
              </div>
            ) : (
              <div ref={paypalRef} className="w-full" />
            )}
          </div>

          {/* Order ID Display */}
          {orderId && (
            <div className="text-xs text-gray-500 text-center">
              Order ID: {orderId}
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="text-center">
              <Button 
                onClick={() => {
                  setStatus('idle');
                  setOrderId(null);
                }}
                variant="outline"
                size="sm"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

