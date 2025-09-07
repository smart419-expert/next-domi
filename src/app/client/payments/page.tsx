'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/language-context';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Eye,
  Filter,
  Search
} from 'lucide-react';

export default function ClientPayments() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const payments = [
    {
      id: 1,
      amount: 1500.00,
      description: 'Monthly Investment Contribution',
      date: '2024-12-01',
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'TXN-001234'
    },
    {
      id: 2,
      amount: 2500.00,
      description: 'Additional Investment',
      date: '2024-11-15',
      status: 'completed',
      method: 'Credit Card',
      reference: 'TXN-001235'
    },
    {
      id: 3,
      amount: 500.00,
      description: 'Account Maintenance Fee',
      date: '2024-11-01',
      status: 'completed',
      method: 'Auto Debit',
      reference: 'TXN-001236'
    },
    {
      id: 4,
      amount: 2000.00,
      description: 'Investment Withdrawal',
      date: '2024-10-20',
      status: 'pending',
      method: 'Bank Transfer',
      reference: 'TXN-001237'
    },
    {
      id: 5,
      amount: 750.00,
      description: 'Service Fee',
      date: '2024-10-01',
      status: 'failed',
      method: 'Credit Card',
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
        return t('client.payments.status.completed');
      case 'pending':
        return t('client.payments.status.pending');
      case 'failed':
        return t('client.payments.status.failed');
      default:
        return t('client.payments.status.unknown');
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

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalAmount = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('client.payments.title')}</h1>
        <p className="text-gray-600">
          {t('client.payments.description')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('client.payments.total_paid')}</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">{t('client.payments.all_time')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('client.payments.pending')}</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {payments.filter(p => p.status === 'pending').length}
            </div>
            <p className="text-xs text-gray-500">{t('client.payments.transactions')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('client.payments.this_month')}</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${payments
                .filter(p => p.status === 'completed' && p.date.startsWith('2024-12'))
                .reduce((sum, p) => sum + p.amount, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">{t('client.payments.december_2024')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('client.payments.search_placeholder')}
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
            {t('client.payments.filter.all')}
          </Button>
          <Button
            variant={filterStatus === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('completed')}
          >
            {t('client.payments.filter.completed')}
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('pending')}
          >
            {t('client.payments.filter.pending')}
          </Button>
          <Button
            variant={filterStatus === 'failed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('failed')}
          >
            {t('client.payments.filter.failed')}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-1">
                  {t('client.payments.make_payment')}
                </h3>
                <p className="text-blue-700">
                  {t('client.payments.make_payment_desc')}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {t('client.payments.new_payment')}
                </Button>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {t('client.payments.add_funds')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('client.payments.payment_history')}</CardTitle>
          <CardDescription>
            {t('client.payments.payment_history_desc')}
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
                    <div className="font-semibold text-gray-900">
                      ${payment.amount.toLocaleString()}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('client.payments.empty.title')}</h3>
              <p className="text-gray-500">
                {searchTerm ? t('client.payments.empty.search') : t('client.payments.empty.filter')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
