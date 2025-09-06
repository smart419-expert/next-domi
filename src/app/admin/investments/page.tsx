'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppLayout, PageTitle } from '@/components/layout';
import { InvestmentViewer } from '@/components/ui/investment-viewer';
import { useLanguage } from '@/contexts/language-context';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Download,
  Upload,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';

export default function InvestmentsPage() {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <div className="py-8">
        <PageTitle
          title={t('investments.title')}
          description={t('investments.description')}
          size="lg"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('investments.total_portfolio_value')}</p>
                <div className="text-2xl font-bold text-slate-900 mt-1">$124,000</div>
                <p className="text-sm text-green-600 mt-1">{t('investments.this_month_growth')}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('investments.active_investments')}</p>
                <div className="text-2xl font-bold text-slate-900 mt-1">24</div>
                <p className="text-sm text-slate-500 mt-1">{t('investments.across_sectors')}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('investments.monthly_return')}</p>
                <div className="text-2xl font-bold text-slate-900 mt-1">+8.2%</div>
                <p className="text-sm text-green-600 mt-1">{t('investments.above_benchmark')}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('investments.risk_score')}</p>
                <div className="text-2xl font-bold text-slate-900 mt-1">6.2/10</div>
                <p className="text-sm text-slate-500 mt-1">{t('investments.moderate_risk')}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('investments.quick_actions')}</CardTitle>
            <CardDescription>{t('investments.quick_actions_desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                {t('investments.upload_data')}
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                {t('investments.export_report')}
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                {t('investments.generate_analysis')}
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                {t('investments.schedule_report')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Investment Visualization */}
        <InvestmentViewer className="mb-8" />

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('investments.portfolio_allocation')}</CardTitle>
              <CardDescription>{t('investments.current_asset_distribution')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('investments.stocks')}</span>
                  <span className="text-sm text-slate-600">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('investments.bonds')}</span>
                  <span className="text-sm text-slate-600">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('investments.cash')}</span>
                  <span className="text-sm text-slate-600">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('investments.recent_performance')}</CardTitle>
              <CardDescription>{t('investments.last_30_days_performance')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('investments.portfolio')}</span>
                  <span className="text-sm text-green-600 font-semibold">+8.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">S&P 500</span>
                  <span className="text-sm text-slate-600">+6.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">NASDAQ</span>
                  <span className="text-sm text-slate-600">+7.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dow Jones</span>
                  <span className="text-sm text-slate-600">+5.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
