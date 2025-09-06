'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppLayout, PageTitle } from '@/components/layout';
import { Users, DollarSign, MessageSquare, FileText, TrendingUp, Activity } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

export default function DashboardPage() {
  const { t } = useLanguage();
  const stats = [
    {
      title: t('dashboard.total_clients'),
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: t('dashboard.total_revenue'),
      value: '$45,231',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: t('dashboard.active_conversations'),
      value: '89',
      change: '+23%',
      changeType: 'positive' as const,
      icon: MessageSquare,
    },
    {
      title: t('dashboard.files_uploaded'),
      value: '2,341',
      change: '+5.4%',
      changeType: 'positive' as const,
      icon: FileText,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'payment',
      message: t('dashboard.activity.payment_received'),
      time: t('dashboard.activity.time_2min'),
      amount: '$150.00',
    },
    {
      id: 2,
      type: 'message',
      message: t('dashboard.activity.message_sent'),
      time: t('dashboard.activity.time_5min'),
    },
    {
      id: 3,
      type: 'file',
      message: t('dashboard.activity.file_uploaded'),
      time: t('dashboard.activity.time_10min'),
    },
    {
      id: 4,
      type: 'client',
      message: t('dashboard.activity.client_registered'),
      time: t('dashboard.activity.time_15min'),
    },
  ];

  return (
    <AppLayout>
      <div className="py-8">
        <PageTitle
          title={t('dashboard.title')}
          description={t('dashboard.description')}
          size="lg"
        >
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link href="/clients">{t('dashboard.view_all')}</Link>
          </Button>
        </PageTitle>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-slate-100">
                  <stat.icon className="h-5 w-5 text-slate-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                {stat.change} from last month
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-slate-100 mr-3">
                <Activity className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{t('dashboard.recent_activity')}</h3>
                <p className="text-sm text-slate-600">{t('dashboard.recent_activity_desc')}</p>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                    {activity.amount && (
                      <p className="text-sm font-bold text-blue-600">{activity.amount}</p>
                    )}
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-white border border-slate-200 rounded-lg">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('dashboard.quick_actions')}</h3>
              <p className="text-sm text-slate-600">{t('dashboard.quick_actions_desc')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild className="h-16 flex-col bg-blue-600 text-white hover:bg-blue-700">
                <Link href="/clients">
                  <Users className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">{t('dashboard.manage_clients')}</span>
                </Link>
              </Button>
              <Button asChild className="h-16 flex-col bg-white text-slate-700 hover:bg-slate-50 border border-slate-300">
                <Link href="/clients">
                  <MessageSquare className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">{t('dashboard.view_messages')}</span>
                </Link>
              </Button>
              <Button asChild className="h-16 flex-col bg-white text-slate-700 hover:bg-slate-50 border border-slate-300">
                <Link href="/clients">
                  <FileText className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">{t('dashboard.file_manager')}</span>
                </Link>
              </Button>
              <Button asChild className="h-16 flex-col bg-white text-slate-700 hover:bg-slate-50 border border-slate-300">
                <Link href="/clients">
                  <DollarSign className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">{t('dashboard.payments')}</span>
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}