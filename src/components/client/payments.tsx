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
import { useLanguage } from '@/contexts/language-context';

export function Payments() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawDescription, setWithdrawDescription] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('');

  const walletOptions = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'PP',
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
      hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
      description: 'Pay securely with PayPal'
    },
    {
      id: 'zelle',
      name: 'Zelle',
      icon: 'Z',
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
      hoverColor: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
      description: 'Send money with Zelle'
    },
    {
      id: 'cashapp',
      name: 'Cash App',
      icon: '$',
      color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
      hoverColor: 'hover:bg-green-100 dark:hover:bg-green-900/30',
      description: 'Pay with Cash App'
    },
    {
      id: 'chime',
      name: 'Chime',
      icon: 'C',
      color: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300',
      hoverColor: 'hover:bg-teal-100 dark:hover:bg-teal-900/30',
      description: 'Banking with Chime'
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

  const handleWithdraw = () => {
    if (!withdrawAmount || !withdrawMethod || !withdrawDescription) {
      alert('Please fill in all fields');
      return;
    }
    
    const amount = parseFloat(withdrawAmount);
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (amount > netAmount) {
      alert('Insufficient funds for withdrawal');
      return;
    }
    
    // Here you would typically make an API call to process the withdrawal
    console.log('Processing withdrawal:', {
      amount,
      method: withdrawMethod,
      description: withdrawDescription
    });
    
    // Reset form and close modal
    setWithdrawAmount('');
    setWithdrawDescription('');
    setWithdrawMethod('');
    setShowWithdrawModal(false);
    
    // Show success message
    alert('Withdrawal request submitted successfully!');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Total de Depósitos</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
              ${totalDeposits.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">De todos los tiempos</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Total de Retiros</CardTitle>
            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 dark:text-red-400">
              ${totalWithdrawals.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">De todos los tiempos</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Cantidad Neta</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${netAmount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${netAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Posición neta</p>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Selection */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="flex items-center text-gray-900 dark:text-white text-sm sm:text-base">
            <Wallet className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Elegir Método de Pago
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Selecciona tu método de pago preferido para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => setSelectedWallet(wallet.id)}
                className={`p-3 sm:p-4 lg:p-6 border-2 rounded-lg text-center transition-all duration-200 ${wallet.color} dark:${wallet.color.replace('50', '900/20').replace('200', '800')} ${wallet.hoverColor} dark:hover:bg-opacity-30 ${
                  selectedWallet === wallet.id ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-1 sm:ring-offset-2' : ''
                }`}
              >
                <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{wallet.icon}</div>
                <div className="font-semibold text-xs sm:text-sm">{wallet.name}</div>
                <div className="text-xs opacity-75 mt-1 hidden sm:block">{wallet.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Actions */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center text-gray-900 dark:text-white text-sm sm:text-lg lg:text-xl">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                Payment Management
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base">
                Manage your payments and view transaction history
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
                <span className="sm:hidden">Export</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowWithdrawModal(true)}
                className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Withdraw</span>
                <span className="sm:hidden">Withdraw</span>
              </Button>
              <Button onClick={() => setShowNewPayment(true)} disabled={!selectedWallet} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">New Payment</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 sm:pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm h-8 sm:h-10"
              />
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-7 sm:h-8 ${
                  filterStatus === 'all' 
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('completed')}
                size="sm"
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-7 sm:h-8 ${
                  filterStatus === 'completed' 
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="hidden sm:inline">Completed</span>
                <span className="sm:hidden">Done</span>
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
                size="sm"
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-7 sm:h-8 ${
                  filterStatus === 'pending' 
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'failed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('failed')}
                size="sm"
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-7 sm:h-8 ${
                  filterStatus === 'failed' 
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Failed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-sm sm:text-base">Payment History</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Your recent payment transactions and status
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="space-y-3 sm:space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {getTypeIcon(payment.type)}
                    {getStatusIcon(payment.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm lg:text-base truncate">{payment.description}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {payment.method} • {payment.reference}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-2">
                  <div className="text-left sm:text-right">
                    <div className={`font-semibold text-xs sm:text-sm lg:text-base ${
                      payment.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {payment.type === 'deposit' ? '+' : '-'}${payment.amount.toLocaleString()}
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="p-1.5 sm:p-2">
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1.5 sm:p-2">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
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

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <ArrowUpRight className="h-5 w-5 mr-2" />
                Withdraw Funds
              </CardTitle>
              <CardDescription>
                Withdraw money from your account balance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Available Balance Display */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-green-800">Available Balance</div>
                    <div className="text-lg font-bold text-green-900">
                      ${netAmount.toLocaleString()}
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Withdrawal Amount</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                >
                  <option value="">Select payment method</option>
                  {walletOptions.map((wallet) => (
                    <option key={wallet.id} value={wallet.id}>
                      {wallet.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input
                  placeholder="Withdrawal description"
                  value={withdrawDescription}
                  onChange={(e) => setWithdrawDescription(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleWithdraw}
                >
                  Process Withdrawal
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawAmount('');
                    setWithdrawDescription('');
                    setWithdrawMethod('');
                  }}
                >
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
                {t('client.payments.need_help')}
              </h3>
              <p className="text-blue-700">
                {t('client.payments.contact_support_desc')}
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              {t('client.payments.contact_support')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
