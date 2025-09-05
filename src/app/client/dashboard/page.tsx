'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import { 
  TrendingUp,
  FileText,
  CreditCard,
  MessageSquare,
  Clock,
  RefreshCw,
  Bell
} from 'lucide-react';
import { ClientChartCard } from '@/components/client/chart-card';
import { ClientImageGallery } from '@/components/client/image-gallery';
import { Payments } from '@/components/client/payments';
import { ClientChatWidget } from '@/components/client/chat-widget';
import { LoadingSkeleton } from '@/components/client/loading-skeleton';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('charts');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setLastUpdate(new Date());
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || 'Client'}!
            </h1>
            <p className="text-gray-600">
              Here's an overview of your account and recent activity.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Clock className="h-3 w-3" />
              <span>Last updated: {formatLastUpdate(lastUpdate)}</span>
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$25,430.00</div>
            <p className="text-xs text-gray-500">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-gray-500">3 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-xs text-gray-500">2 unread</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">3</div>
            <p className="text-xs text-gray-500">New alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton type="charts" />
          ) : (
            <ClientChartCard />
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton type="gallery" />
          ) : (
            <ClientImageGallery />
          )}
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton type="payments" />
          ) : (
            <Payments />
          )}
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton type="chat" />
          ) : (
            <ClientChatWidget />
          )}
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}