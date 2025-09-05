'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Eye,
  Search,
  Filter,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  Smartphone,
  Wallet
} from 'lucide-react';

export function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');

  const walletOptions = [
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

  const payments = [
    {
      id: 1,
      amount: 1500.00,
      description: 'Monthly Investment Contribution',
      date: '2024-12-01',
      status: 'completed',
      type: 'deposit',
      method: 'PayPal',
      reference: 'TXN-001234'
    },
    {
      id: 2,
      amount: 2500.00,
      description: 'Additional Investment',
      date: '2024-11-15',
      status: 'completed',
      type: 'deposit',
      method: 'Bank Transfer',
      reference: 'TXN-001235'
    },
    {
      id: 3,
      amount: 500.00,
      description: 'Account Maintenance Fee',
      date: '2024-11-01',
      status: 'completed',
      type: 'withdrawal',
      method: 'Zelle',
      reference: 'TXN-001236'
    },
    {
      id: 4,
      amount: 2000.00,
      description: 'Investment Withdrawal',
      date: '2024-10-20',
      status: 'pending',
      type: 'withdrawal',
      method: 'Cash App',
      reference: 'TXN-001237'
    },
    {
      id: 5,
      amount: 750.00,
      description: 'Service Fee',
      date: '2024-10-01',
      status: 'failed',
      type: 'withdrawal',
      method: 'PayPal',
      reference: 'TXN-001238'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalDeposits = payments
    .filter(p => p.status === 'completed' && p.type === 'deposit')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalWithdrawals = payments
    .filter(p => p.status === 'completed' && p.type === 'withdrawal')
    .reduce((sum, p) => sum + p.amount, 0);

  const netAmount = totalDeposits - totalWithdrawals;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalDeposits.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${totalWithdrawals.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Net position</p>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2" />
            Choose Payment Method
          </CardTitle>
          <CardDescription>
            Select your preferred payment method to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => setSelectedWallet(wallet.id)}
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

      {/* Payment Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Management
              </CardTitle>
              <CardDescription>
                Manage your payments and view transaction history
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowNewPayment(true)} disabled={!selectedWallet}>
                <Plus className="h-4 w-4 mr-2" />
                New Payment
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('completed')}
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'failed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('failed')}
              >
                Failed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Your recent payment transactions and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(payment.type)}
                    {getStatusIcon(payment.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{payment.description}</h4>
                    <p className="text-sm text-gray-500">
                      {payment.method} • {payment.reference}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`font-semibold text-gray-900 ${
                      payment.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {payment.type === 'deposit' ? '+' : '-'}${payment.amount.toLocaleString()}
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'No payments match the selected filter.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Payment Modal */}
      {showNewPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Make New Payment</CardTitle>
              <CardDescription>
                Process a new payment using {walletOptions.find(w => w.id === selectedWallet)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Wallet Display */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold">
                    {walletOptions.find(w => w.id === selectedWallet)?.icon}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {walletOptions.find(w => w.id === selectedWallet)?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {walletOptions.find(w => w.id === selectedWallet)?.description}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input
                  placeholder="Payment description"
                />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">
                  Process Payment
                </Button>
                <Button variant="outline" onClick={() => setShowNewPayment(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-1">
                Need Help with Payments?
              </h3>
              <p className="text-blue-700">
                Contact our support team for assistance with payment processing.
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
