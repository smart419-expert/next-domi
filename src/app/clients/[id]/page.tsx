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
import { AppLayout, PageTitle } from '@/components/layout';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, MessageSquare, DollarSign, FileText, Settings, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  params: Promise<{
    id: string;
  }>;
}

export default function ClientPage({ params }: ClientPageProps) {
  const [clientData, setClientData] = useState(client);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    params.then(({ id }) => setClientId(id));
  }, [params]);

  // Load transactions on component mount
  useEffect(() => {
    loadTransactions();
  }, [clientId]);

  const loadTransactions = async () => {
    if (!clientId) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/clients/${clientId}/transactions`);
      if (response.data.success) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBalanceUpdate = async (data: BalanceEditData) => {
    if (!clientId) return;
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/clients/${clientId}/balance`, {
        balance: data.newBalance,
        note: data.changeReason
      });

      if (response.data.success) {
        // Update client balance
        setClientData(prev => ({ ...prev, balance: data.newBalance }));
        
        // Add new transaction to the list
        const newTransaction = response.data.transaction;
        setTransactions(prev => [newTransaction, ...prev]);
        
        // Close modal
        setIsBalanceModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      throw error; // Re-throw to let the modal handle the error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Button asChild variant="gradient" size="sm">
            <Link href="/clients">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Link>
          </Button>
        </div>
        
        <PageTitle
          title={client.name}
          description="Client Portal"
          size="lg"
        >
          <div className="flex items-center space-x-4">
            <Avatar name={client.name} size="lg" />
          </div>
        </PageTitle>
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
                  <span className="text-sm text-gray-900">{client.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{client.phone}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-500">Status</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    client.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-500">Last Login</div>
                  <div className="text-sm text-gray-900">{formatDate(client.lastLogin)}</div>
                </div>
              </CardContent>
            </Card>

            {/* Balance Display */}
            <BalanceDisplay
              balance={clientData.balance}
              clientName={clientData.name}
              onEditClick={() => setIsBalanceModalOpen(true)}
            />

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
              clientId={client.id}
              clientName={client.name}
              className="h-[600px]"
            />

            {/* Files Section */}
            <Card>
              <CardContent className="p-6">
                <FileManager clientId={client.id} />
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
      <BalanceEditModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        currentBalance={clientData.balance}
        clientName={clientData.name}
        onSave={handleBalanceUpdate}
      />
    </AppLayout>
  );
}
