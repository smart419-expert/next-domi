'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { AppLayout, PageTitle } from '@/components/layout';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';
import { Search, Plus, MoreHorizontal, MessageSquare, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';

// Mock data
const clients = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1234567890',
    balance: 150.00,
    status: 'active' as const,
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    avatar: null,
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1234567891',
    balance: 75.50,
    status: 'active' as const,
    lastLogin: '2024-01-14T15:45:00Z',
    createdAt: '2024-01-02T00:00:00Z',
    avatar: null,
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    phone: '+1234567892',
    balance: 0.00,
    status: 'inactive' as const,
    lastLogin: '2024-01-10T09:20:00Z',
    createdAt: '2024-01-03T00:00:00Z',
    avatar: null,
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '+1234567893',
    balance: 250.75,
    status: 'active' as const,
    lastLogin: '2024-01-15T08:15:00Z',
    createdAt: '2024-01-05T00:00:00Z',
    avatar: null,
  },
];

export default function ClientsPage() {
  const { t } = useLanguage();
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalBalance = clients.reduce((sum, c) => sum + c.balance, 0);

  return (
    <AppLayout>
      <div className="py-8">
        <PageTitle
          title={t('admin.clients.title')}
          description={t('admin.clients.description')}
          size="lg"
        >
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link href="/admin/clients/new">
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.clients.add_client')}
            </Link>
          </Button>
        </PageTitle>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('admin.clients.total_clients')}</p>
                <div className="text-2xl font-bold text-slate-900 mt-1">{totalClients}</div>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('admin.clients.active_clients')}</p>
                <div className="text-2xl font-bold text-slate-900 mt-1">{activeClients}</div>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('admin.clients.total_balance')}</p>
                <div className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(totalBalance)}</div>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <DollarSign className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder={t('admin.clients.search_placeholder')}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 shadow-md">{t('admin.clients.filter')}</Button>
              <Button variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 shadow-md">{t('admin.clients.export')}</Button>
            </div>
          </div>
        </Card>

        {/* Clients Table */}
        <Card className="p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('admin.clients.title')}</h3>
            <p className="text-sm text-slate-600">{t('admin.clients.description')}</p>
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px] text-slate-900">{t('admin.clients.client')}</TableHead>
                  <TableHead className="w-[250px] text-slate-900">{t('admin.clients.contact')}</TableHead>
                  <TableHead className="w-[120px] text-slate-900">{t('admin.clients.balance')}</TableHead>
                  <TableHead className="w-[100px] text-slate-900">{t('admin.clients.status')}</TableHead>
                  <TableHead className="w-[180px] text-slate-900">{t('admin.clients.last_login')}</TableHead>
                  <TableHead className="w-[150px] text-slate-900">{t('admin.clients.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className="table-row">
                    <TableCell className="py-6">
                      <div className="flex items-center space-x-4">
                        <Avatar name={client.name} className="bg-blue-100 text-blue-700 avatar-text" />
                        <div>
                          <div className="font-medium text-slate-900">{client.name}</div>
                          <div className="text-sm text-slate-500">ID: {client.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <div>
                        <div className="text-sm text-slate-900">{client.email}</div>
                        <div className="text-sm text-slate-500">{client.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="font-medium text-slate-900">
                        {formatCurrency(client.balance)}
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <span className={`status-badge ${
                        client.status === 'active'
                          ? 'status-active'
                          : 'status-inactive'
                      }`}>
                        {client.status === 'active' ? t('admin.clients.active') : t('admin.clients.inactive')}
                      </span>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="text-sm text-slate-900">
                        {formatDate(client.lastLogin)}
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="flex items-center space-x-2">
                        <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                          <Link href={`/admin/clients/${client.id}`}>
                            <MessageSquare className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300">
                          <DollarSign className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
