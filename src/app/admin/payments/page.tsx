'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaymentConfirmationModal } from '@/components/ui/payment-confirmation-modal';
import { PayPalPayment } from '@/components/ui/paypal-payment';
import { PaymentMethodCard } from '@/components/ui/payment-method-card';
import { AppLayout, PageTitle } from '@/components/layout';
import { 
  CreditCard, 
  Smartphone, 
  QrCode, 
  ExternalLink,
  DollarSign,
  CheckCircle,
  Clock,
  Wallet,
  RefreshCw,
  Crown,
  ArrowRight,
  Heart,
  FileText,
  BarChart3,
  User,
  Settings,
  Calendar,
  TrendingDown,
  TrendingUp,
  Home,
  CheckSquare,
  Circle,
  User as UserIcon
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

interface PaymentData {
  amount: number;
  clientId: string;
  clientName: string;
  method: string;
  orderId?: string;
  paymentLink?: string;
  qrData?: string;
}

export default function PaymentsPage() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(0);
  const [clientId, setClientId] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Mock user data
  const user = {
    name: 'Devon',
    email: 'devonbra***mail.com',
    phone: '9394972971',
    level: 'Lv0',
    balance: 1357.00,
    avatar: '/api/placeholder/40/40'
  };

  // Mock client data
  const clients = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
  ];

  // Simple icon components
  const PayPalIcon = () => <span className="text-2xl font-bold">PP</span>;
  const BankIcon = () => <span className="text-2xl">🏦</span>;
  const ZelleIcon = () => <span className="text-2xl font-bold">Z</span>;
  const CashAppIcon = () => <span className="text-2xl font-bold">$</span>;

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay securely with PayPal',
      icon: PayPalIcon,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      hoverColor: 'hover:bg-blue-100',
      type: 'link' as const
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: BankIcon,
      color: 'bg-gray-50 border-gray-200 text-gray-700',
      hoverColor: 'hover:bg-gray-100',
      type: 'qr' as const
    },
    {
      id: 'zelle',
      name: 'Zelle',
      description: 'Send money with Zelle',
      icon: ZelleIcon,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      hoverColor: 'hover:bg-purple-100',
      type: 'qr' as const
    },
    {
      id: 'cashapp',
      name: 'Cash App',
      description: 'Pay with Cash App',
      icon: CashAppIcon,
      color: 'bg-green-50 border-green-200 text-green-700',
      hoverColor: 'hover:bg-green-100',
      type: 'qr' as const
    }
  ];

  const quickActions = [
    {
      id: 'recharge',
      name: t('payments.recharge'),
      icon: Heart,
      color: 'bg-blue-500',
      description: t('payments.recharge_account')
    },
    {
      id: 'presentation',
      name: t('payments.presentation'),
      icon: FileText,
      color: 'bg-orange-500',
      description: t('payments.account_presentation')
    },
    {
      id: 'invitation',
      name: t('payments.invitation'),
      icon: BarChart3,
      color: 'bg-teal-500',
      description: t('payments.invite_friends')
    },
    {
      id: 'personal',
      name: t('payments.personal'),
      icon: User,
      color: 'bg-orange-500',
      description: t('payments.personal_settings')
    }
  ];

  const accountRecords = [
    {
      id: 'bank-card',
      name: t('payments.my_bank_card'),
      icon: CreditCard,
      description: t('payments.manage_bank_card')
    },
    {
      id: 'recharge-record',
      name: t('payments.recharge_record'),
      icon: Calendar,
      description: t('payments.recharge_history')
    },
    {
      id: 'withdrawal-record',
      name: t('payments.withdrawal_records'),
      icon: TrendingDown,
      description: t('payments.withdrawal_history')
    },
    {
      id: 'balance-change',
      name: t('payments.balance_change_record'),
      icon: TrendingUp,
      description: t('payments.balance_change_history')
    }
  ];

  const handlePaymentSuccess = (data: PaymentData) => {
    setPaymentData(data);
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    setPaymentData(null);
    // Reset form
    setAmount(0);
    setClientId('');
    setClientName('');
    setSelectedMethod('');
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'recharge':
        setShowPaymentForm(true);
        setActiveSection('recharge');
        break;
      case 'presentation':
        setActiveSection('presentation');
        // Show account presentation modal or page
        break;
      case 'invitation':
        setActiveSection('invitation');
        // Show invitation modal or page
        break;
      case 'personal':
        setActiveSection('personal');
        // Navigate to personal settings
        break;
      default:
        break;
    }
  };

  const handleAccountRecord = (recordId: string) => {
    switch (recordId) {
      case 'bank-card':
        setActiveSection('bank-card');
        // Show bank card management
        break;
      case 'recharge-record':
        setActiveSection('recharge-record');
        // Show recharge history
        break;
      case 'withdrawal-record':
        setActiveSection('withdrawal-record');
        // Show withdrawal history
        break;
      case 'balance-change':
        setActiveSection('balance-change');
        // Show balance change history
        break;
      default:
        break;
    }
  };

  const selectedClient = clients.find(c => c.id === clientId);

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-gray-900">
        {/* Page Title */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('payments.admin_title')}</h1>
          <p className="text-slate-600 dark:text-gray-300">{t('payments.admin_description')}</p>
        </div>

        {/* Blue Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white px-4 py-6 mx-4 rounded-lg">
        {/* User Profile Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium payment-header-text">{user.email}</div>
              <div className="text-xs payment-header-text opacity-90">{user.phone}</div>
            </div>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-black dark:text-white px-3 py-1 rounded-lg flex items-center space-x-1">
            <Crown className="h-4 w-4" />
            <span className="text-sm font-medium">{user.level}</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>

        {/* Balance Display */}
        <div className="bg-blue-800 dark:bg-blue-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 payment-balance-text" />
              <span className="text-sm font-medium payment-balance-text">{t('payments.balance')}</span>
              <RefreshCw className="h-4 w-4 cursor-pointer hover:rotate-180 transition-transform payment-balance-text" />
            </div>
          </div>
          <div className="text-2xl font-bold payment-balance-text">{formatCurrency(user.balance)}</div>
        </div>
      </div>

        {/* Main Content */}
        <div className="px-4 -mt-2">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                className={`${action.color} hover:opacity-90 text-white h-20 flex flex-col items-center justify-center space-y-2 rounded-lg transition-all duration-200 hover:scale-105 dark:opacity-90 dark:hover:opacity-100`}
                onClick={() => handleQuickAction(action.id)}
              >
                <action.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{action.name}</span>
              </Button>
            ))}
          </div>

          {/* Account Records List */}
          <Card className="mb-6 bg-white dark:bg-gray-800 shadow-sm border border-slate-200 dark:border-gray-700">
            <CardContent className="p-0">
              {accountRecords.map((record, index) => (
                <div
                  key={record.id}
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors ${
                    index !== accountRecords.length - 1 ? 'border-b border-slate-100 dark:border-gray-700' : ''
                  }`}
                  onClick={() => handleAccountRecord(record.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <record.icon className="h-4 w-4 text-slate-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <div className="font-medium payment-content-text dark:text-white">{record.name}</div>
                      <div className="text-xs text-slate-500 dark:text-gray-400">{record.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 dark:text-gray-500" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Sections */}
          {activeSection === 'presentation' && (
            <Card className="mb-6 bg-white shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Account Presentation</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="text-slate-600">
                  <p>Your account presentation and statistics will be displayed here.</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">1,234</div>
                      <div className="text-sm text-slate-600">Total Clients</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">$45,231</div>
                      <div className="text-sm text-slate-600">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'invitation' && (
            <Card className="mb-6 bg-white shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Invite Friends</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="text-slate-600">
                  <p>Share your referral link to invite friends and earn rewards.</p>
                  <div className="mt-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm text-slate-600 mb-2">Your Referral Link:</div>
                      <div className="font-mono text-slate-900">https://vapps.com/ref/devon123</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'personal' && (
            <Card className="mb-6 bg-white shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Personal Settings</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="text-slate-600">
                  <p>Manage your personal account settings and preferences.</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span>Profile Information</span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span>Security Settings</span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span>Notification Preferences</span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'bank-card' && (
            <Card className="mb-6 bg-white shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Bank Card Management</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="text-slate-600">
                  <p>Manage your bank cards and payment methods.</p>
                  <div className="mt-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm text-slate-600 mb-2">Primary Card</div>
                      <div className="font-mono text-slate-900">**** **** **** 1234</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'recharge-record' && (
            <Card className="mb-6 bg-white shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Recharge History</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="text-slate-600">
                  <p>View your account recharge history and transactions.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span>Recharge via PayPal</span>
                      <span className="font-semibold text-green-600">+$100.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span>Recharge via ATH Móvil</span>
                      <span className="font-semibold text-green-600">+$50.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'withdrawal-record' && (
            <Card className="mb-6 bg-white shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Withdrawal History</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="text-slate-600">
                  <p>View your withdrawal history and pending transactions.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span>Bank Transfer</span>
                      <span className="font-semibold text-red-600">-$200.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span>PayPal Withdrawal</span>
                      <span className="font-semibold text-red-600">-$75.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'balance-change' && (
            <Card className="mb-6 bg-white shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Balance Change History</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="text-slate-600">
                  <p>Track all balance changes and account adjustments.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span>Admin Adjustment</span>
                      <span className="font-semibold text-blue-600">+$25.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span>Interest Earned</span>
                      <span className="font-semibold text-green-600">+$5.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Form (when recharge is selected) */}
          {showPaymentForm && (
            <Card className="mb-6 bg-white shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Payment Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowPaymentForm(false);
                      setActiveSection(null);
                    }}
                  >
                    ×
                  </Button>
                </div>
              
                {/* Amount Input */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="amount">Payment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={amount || ''}
                      onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                      className="pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Client Selection */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="client">Select Client</Label>
                  <Select 
                    value={clientId} 
                    onValueChange={(value) => {
                      setClientId(value);
                      const client = clients.find(c => c.id === value);
                      setClientName(client?.name || '');
                    }}
                  >
                    <option value="">Choose a client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} ({client.email})
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-2 mb-4">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${method.color} dark:${method.color.replace('50', '900/20').replace('200', '800')} ${method.hoverColor} dark:hover:bg-opacity-30 ${
                          selectedMethod === method.id ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2' : ''
                        }`}
                      >
                        <div className="text-2xl font-bold mb-2">
                          <method.icon />
                        </div>
                        <div className="font-semibold text-sm">{method.name}</div>
                        <div className="text-xs opacity-75 mt-1">{method.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                {amount > 0 && selectedClient && selectedMethod && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Payment Summary</h4>
                    <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Client:</span>
                        <span className="font-medium">{selectedClient.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium">{formatCurrency(amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="font-medium">
                          {paymentMethods.find(m => m.id === selectedMethod)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Interface */}
                {selectedMethod && amount > 0 && selectedClient && (
                  <div className="space-y-4">
                    {selectedMethod === 'paypal' ? (
                      <PayPalPayment
                        amount={amount}
                        clientId={clientId}
                        clientName={clientName}
                        onSuccess={handlePaymentSuccess}
                        onError={(error) => console.error('PayPal Error:', error)}
                      />
                    ) : (
                      <PaymentMethodCard
                        method={paymentMethods.find(m => m.id === selectedMethod)!}
                        amount={amount}
                        clientId={clientId}
                        clientName={clientName}
                        onSuccess={handlePaymentSuccess}
                        onError={(error) => console.error('Payment Error:', error)}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Payment Confirmation Modal */}
        <PaymentConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={handleCloseConfirmation}
          paymentData={paymentData}
        />
      </div>
    </AppLayout>
  );
}