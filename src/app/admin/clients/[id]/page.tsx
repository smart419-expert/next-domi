'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { FileManager } from '@/components/ui/file-manager';
import { ChatWindow } from '@/components/ui/chat-window';
import { ChartCard } from '@/components/ui/chart-card';
import { BalanceDisplay } from '@/components/ui/balance-display';
import { BalanceEditModal, BalanceEditData } from '@/components/ui/balance-edit-modal';
import { TransactionsTable, Transaction } from '@/components/ui/transactions-table';
import { PollingStatus } from '@/components/ui/polling-status';
import { AdminOnly } from '@/components/ui/role-guard';
import { AppLayout, PageTitle } from '@/components/layout';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, MessageSquare, DollarSign, FileText, Settings, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useClientData, useTriggerUpdate, useClientMessages, useClientUploads } from '@/hooks/use-client-data';

// Mock data
const client = {
  id: '1',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  phone: '+1234567890',
  balance: 150.00,
  status: 'active' as const,
  lastLogin: '2024-01-15T10:30:00Z',
  createdAt: '2024-01-01T00:00:00Z',
  avatar: null,
};

const transactions = [
  {
    id: 'txn-1',
    amount: 50.00,
    type: 'credit' as const,
    reason: 'Payment received via PayPal',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed' as const,
  },
  {
    id: 'txn-2',
    amount: 25.00,
    type: 'debit' as const,
    reason: 'Service fee',
    timestamp: '2024-01-14T15:45:00Z',
    status: 'completed' as const,
  },
  {
    id: 'txn-3',
    amount: 100.00,
    type: 'credit' as const,
    reason: 'Initial deposit',
    timestamp: '2024-01-01T00:00:00Z',
    status: 'completed' as const,
  },
];

const files = [
  {
    id: 'file-1',
    name: 'invoice-january.pdf',
    url: '/uploads/file-1.pdf',
    type: 'application/pdf',
    size: 1024000,
    uploadedAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'file-2',
    name: 'chart-analysis.png',
    url: '/uploads/file-2.png',
    type: 'image/png',
    size: 512000,
    uploadedAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-14T15:45:00Z',
  },
];

const messages = [
  {
    id: 'msg-1',
    content: 'Hello! How can I help you today?',
    sender: 'admin' as const,
    timestamp: '2024-01-15T10:30:00Z',
    read: true,
  },
  {
    id: 'msg-2',
    content: 'I need help with my account balance',
    sender: 'client' as const,
    timestamp: '2024-01-15T10:32:00Z',
    read: true,
  },
  {
    id: 'msg-3',
    content: 'I can help you with that. Your current balance is $150.00. Is there anything specific you\'d like to know?',
    sender: 'admin' as const,
    timestamp: '2024-01-15T10:35:00Z',
    read: true,
  },
];

interface ClientPageProps {
  params: {
    id: string;
  };
}

export default function ClientPage({ params }: ClientPageProps) {
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(60000); // 60 seconds default

  // Use TanStack Query hooks for data fetching with polling
  const { 
    data: clientData, 
    isLoading: isClientLoading, 
    error: clientError,
    isFetching: isClientFetching 
  } = useClientData(params.id, refreshInterval);

  const { 
    data: messages, 
    isLoading: isMessagesLoading 
  } = useClientMessages(params.id, 30000); // 30 seconds for messages

  const { 
    data: uploads, 
    isLoading: isUploadsLoading 
  } = useClientUploads(params.id, 45000); // 45 seconds for uploads

  const triggerUpdateMutation = useTriggerUpdate(params.id);

  // Mock transactions data (in real app, this would also use polling)
  const transactions: Transaction[] = [
    {
      id: 'txn-1',
      amount: 50.00,
      type: 'credit' as const,
      reason: 'Payment received via PayPal',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed' as const,
    },
    {
      id: 'txn-2',
      amount: 25.00,
      type: 'debit' as const,
      reason: 'Service fee',
      timestamp: '2024-01-14T15:45:00Z',
      status: 'completed' as const,
    },
    {
      id: 'txn-3',
      amount: 100.00,
      type: 'credit' as const,
      reason: 'Initial deposit',
      timestamp: '2024-01-01T00:00:00Z',
      status: 'completed' as const,
    },
  ];

  const handleBalanceUpdate = async (data: BalanceEditData) => {
    try {
      // In a real app, this would call an API
      console.log('Balance update:', data);
      setIsBalanceModalOpen(false);
    } catch (error) {
      console.error('Error updating balance:', error);
      throw error;
    }
  };

  const handleForceUpdate = () => {
    triggerUpdateMutation.mutate();
  };

  // Use client data from API or fallback to mock data
  const currentClient = clientData || client;

  if (isClientLoading) {
    return (
      <AppLayout>
        <div className="py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading client data...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (clientError) {
    return (
      <AppLayout>
        <div className="py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading client data</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Button asChild variant="gradient" size="sm">
            <Link href="/admin/clients">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Link>
          </Button>
        </div>
        
        <PageTitle
          title={currentClient.name}
          description="Client Portal"
          size="lg"
        >
          <div className="flex items-center space-x-4">
            <Avatar name={currentClient.name} size="lg" />
          </div>
        </PageTitle>

        {/* Polling Status */}
        <PollingStatus
          isConnected={!clientError}
          isPolling={isClientFetching}
          lastUpdate={currentClient.updatedAt}
          nextUpdate={currentClient.nextUpdate}
          refreshInterval={refreshInterval}
          onForceUpdate={handleForceUpdate}
          isUpdating={triggerUpdateMutation.isPending}
          className="mb-6"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Client Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{currentClient.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{currentClient.phone}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-500">Status</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    currentClient.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {currentClient.status}
                  </span>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-500">Last Login</div>
                  <div className="text-sm text-gray-900">{formatDate(currentClient.lastLogin)}</div>
                </div>
                {currentClient.unreadMessages > 0 && (
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-500">Unread Messages</div>
                    <div className="text-sm text-blue-600 font-semibold">{currentClient.unreadMessages}</div>
                  </div>
                )}
                {currentClient.newUploads > 0 && (
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-500">New Uploads</div>
                    <div className="text-sm text-green-600 font-semibold">{currentClient.newUploads}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Balance Display */}
            <AdminOnly>
              <BalanceDisplay
                balance={currentClient.balance}
                clientName={currentClient.name}
                onEditClick={() => setIsBalanceModalOpen(true)}
              />
            </AdminOnly>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="gradient-blue" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="gradient" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
                <Button variant="gradient-purple" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Client Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chat Window */}
            <ChatWindow
              clientId={currentClient.id}
              clientName={currentClient.name}
              className="h-[600px]"
            />

            {/* Files Section */}
            <Card>
              <CardContent className="p-6">
                <FileManager clientId={currentClient.id} />
              </CardContent>
            </Card>

            {/* Transaction History */}
            <TransactionsTable 
              transactions={transactions}
              className="lg:col-span-2"
            />
          </div>
        </div>
      </div>

      {/* Balance Edit Modal */}
      <AdminOnly>
        <BalanceEditModal
          isOpen={isBalanceModalOpen}
          onClose={() => setIsBalanceModalOpen(false)}
          currentBalance={currentClient.balance}
          clientName={currentClient.name}
          onSave={handleBalanceUpdate}
        />
      </AdminOnly>
    </AppLayout>
  );
}
