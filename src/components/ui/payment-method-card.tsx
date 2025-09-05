'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { QRCode } from './qr-code';
import { ExternalLink, Copy, Check, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import axios from 'axios';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  type: 'qr' | 'link';
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  amount: number;
  clientId: string;
  clientName: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

export function PaymentMethodCard({ 
  method, 
  amount, 
  clientId, 
  clientName, 
  onSuccess, 
  onError 
}: PaymentMethodCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string>('');
  const [qrData, setQrData] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleCreateInvoice = async () => {
    try {
      setIsLoading(true);
      
      const response = await axios.post('/api/payments/create-invoice', {
        amount,
        clientId,
        clientName,
        method: method.id
      });

      if (response.data.success) {
        setPaymentLink(response.data.paymentLink);
        setQrData(response.data.qrData);
        
        // Simulate payment success after a delay
        setTimeout(() => {
          onSuccess({
            amount,
            clientId,
            clientName,
            method: method.id,
            paymentLink: response.data.paymentLink,
            qrData: response.data.qrData
          });
        }, 3000);
      } else {
        throw new Error(response.data.error || 'Failed to create invoice');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const getPaymentInstructions = () => {
    switch (method.id) {
      case 'ath-movil':
        return 'Scan QR code with ATH Móvil app or use the payment link';
      case 'zelle':
        return 'Use Zelle app to scan QR code or open payment link';
      case 'cashapp':
        return 'Open Cash App and scan QR code or use payment link';
      case 'chime':
        return 'Use Chime app to scan QR code or open payment link';
      default:
        return 'Scan QR code or use payment link';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <method.icon className={`h-5 w-5 mr-2 ${method.color.replace('bg-', 'text-')}`} />
          {method.name} Payment
        </CardTitle>
        <p className="text-sm text-gray-500">
          {method.description} - {formatCurrency(amount)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!paymentLink ? (
            // Initial state - create invoice button
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <method.icon className={`h-8 w-8 ${method.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Create Payment</h3>
                <p className="text-gray-500 mb-4">
                  Generate a payment link and QR code for {method.name}
                </p>
                <Button
                  onClick={handleCreateInvoice}
                  disabled={isLoading}
                  className={`${method.color} hover:opacity-90`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <method.icon className="h-4 w-4 mr-2" />
                      Create Payment
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            // Payment created state - show QR and link
            <div className="space-y-6">
              {/* Instructions */}
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Payment Ready</h3>
                <p className="text-gray-500">{getPaymentInstructions()}</p>
              </div>

              {/* QR Code */}
              {qrData && (
                <div className="text-center space-y-4">
                  <QRCode
                    value={qrData}
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                  <p className="text-sm text-gray-500">
                    Scan this QR code with your {method.name} app
                  </p>
                </div>
              )}

              {/* Payment Link */}
              {paymentLink && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm font-mono text-gray-600 break-all">
                        {paymentLink}
                      </p>
                    </div>
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => window.open(paymentLink, '_blank')}
                    className={`w-full ${method.color} hover:opacity-90`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in {method.name}
                  </Button>
                </div>
              )}

              {/* Payment Status */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Waiting for payment confirmation...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
