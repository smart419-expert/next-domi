'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  hoverColor: string;
  description: string;
}

interface WalletSelectorProps {
  onWalletSelect: (walletId: string) => void;
  selectedWallet?: string;
  title?: string;
  description?: string;
  className?: string;
}

const defaultWallets: WalletOption[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'PP',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    hoverColor: 'hover:bg-blue-100',
    description: 'Pay securely with PayPal'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: '🏦',
    color: 'bg-gray-50 border-gray-200 text-gray-700',
    hoverColor: 'hover:bg-gray-100',
    description: 'Direct bank transfer'
  },
  {
    id: 'zelle',
    name: 'Zelle',
    icon: 'Z',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    hoverColor: 'hover:bg-purple-100',
    description: 'Send money with Zelle'
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    icon: '$',
    color: 'bg-green-50 border-green-200 text-green-700',
    hoverColor: 'hover:bg-green-100',
    description: 'Pay with Cash App'
  }
];

export function WalletSelector({ 
  onWalletSelect, 
  selectedWallet, 
  title = "Choose Payment Method",
  description = "Select your preferred payment method to continue",
  className = ""
}: WalletSelectorProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {defaultWallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => onWalletSelect(wallet.id)}
              className={`p-6 border-2 rounded-lg text-center transition-all duration-200 ${wallet.color} ${wallet.hoverColor} ${
                selectedWallet === wallet.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
            >
              <div className="text-2xl font-bold mb-2">{wallet.icon}</div>
              <div className="font-semibold text-sm">{wallet.name}</div>
              <div className="text-xs opacity-75 mt-1">{wallet.description}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
