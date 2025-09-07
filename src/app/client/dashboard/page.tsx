'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
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
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('reports');
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
    
    if (diffInMinutes < 1) return t('client.dashboard.just_now');
    if (diffInMinutes < 60) return `${diffInMinutes}${t('client.dashboard.minutes_ago')}`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}${t('client.dashboard.hours_ago')}`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 break-words">
              {t('client.dashboard.welcome')}, {user?.name || t('client.dashboard.client')}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {t('client.dashboard.subtitle')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Badge variant="outline" className="flex items-center justify-center space-x-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{t('client.dashboard.last_update')}: {formatLastUpdate(lastUpdate)}</span>
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto text-xs sm:text-sm"
            >
              <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{t('client.dashboard.refresh')}</span>
              <span className="sm:hidden">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{t('client.dashboard.balance')}</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">$25,430.00</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+2.5% {t('client.dashboard.from_last_month')}</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{t('client.dashboard.documents')}</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">3 {t('client.dashboard.new_this_week')}</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{t('client.dashboard.messages')}</CardTitle>
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">5</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">2 {t('client.dashboard.unread')}</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{t('client.dashboard.notifications')}</CardTitle>
            <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('client.dashboard.new_alerts')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-blue-100 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 h-auto p-1">
          <TabsTrigger value="reports" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-white data-[state=active]:shadow-md text-blue-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium">
            <span className="hidden sm:inline">Reportes</span>
            <span className="sm:hidden">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-white data-[state=active]:shadow-md text-blue-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium">
            <span className="hidden sm:inline">{t('client.dashboard.payments')}</span>
            <span className="sm:hidden">Pay</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-white data-[state=active]:shadow-md text-blue-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium">
            Chat
          </TabsTrigger>
        </TabsList>

        {/* <TabsContent value="charts" className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton type="charts" />
          ) : (
            <ClientChartCard />
          )}
        </TabsContent> */}

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