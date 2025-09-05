'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartCard, ChartData } from '@/components/ChartCard';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart,
  Download,
  RefreshCw,
  Calendar,
  DollarSign
} from 'lucide-react';

export function ClientChartCard() {
  const [selectedChart, setSelectedChart] = useState('portfolio');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const chartTypes = [
    { id: 'portfolio', name: 'Portfolio Performance', icon: LineChart },
    { id: 'allocation', name: 'Asset Allocation', icon: PieChart },
    { id: 'returns', name: 'Monthly Returns', icon: BarChart3 },
  ];

  // Chart data configurations
  const portfolioConfig: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        label: 'Portfolio Value',
        data: [24000, 24500, 25200, 24800, 25430, 25800],
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F620',
        fill: true,
      },
    ],
  };

  const allocationConfig: ChartData = {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
    series: [
      {
        label: 'Asset Allocation (%)',
        data: [60, 25, 10, 5],
        borderColor: '#10B981',
        backgroundColor: '#10B98120',
        fill: true,
      },
    ],
  };

  const returnsConfig: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        label: 'Monthly Returns (%)',
        data: [2.5, 2.1, 2.9, -1.6, 2.5, 1.4],
        borderColor: '#F59E0B',
        backgroundColor: '#F59E0B20',
        fill: true,
      },
    ],
  };

  const getCurrentConfig = () => {
    switch (selectedChart) {
      case 'portfolio':
        return portfolioConfig;
      case 'allocation':
        return allocationConfig;
      case 'returns':
        return returnsConfig;
      default:
        return portfolioConfig;
    }
  };

  const getChartTitle = () => {
    switch (selectedChart) {
      case 'portfolio':
        return 'Portfolio Performance';
      case 'allocation':
        return 'Asset Allocation';
      case 'returns':
        return 'Monthly Returns';
      default:
        return 'Portfolio Performance';
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Investment Analytics
              </CardTitle>
              <CardDescription>
                Visualize your portfolio performance and asset allocation
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chart Type Selector */}
            <div className="flex space-x-2">
              {chartTypes.map((chart) => (
                <Button
                  key={chart.id}
                  variant={selectedChart === chart.id ? 'default' : 'outline'}
                  onClick={() => setSelectedChart(chart.id)}
                  className="flex items-center space-x-2"
                >
                  <chart.icon className="h-4 w-4" />
                  <span>{chart.name}</span>
                </Button>
              ))}
            </div>

            {/* Chart Content */}
            <div className="min-h-[400px]">
              <ChartCard
                title={getChartTitle()}
                config={getCurrentConfig()}
                lastUpdated={new Date()}
                height={400}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Best Month</p>
                <p className="text-2xl font-bold text-gray-900">March</p>
                <p className="text-sm text-green-600">+2.9% return</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Worst Month</p>
                <p className="text-2xl font-bold text-gray-900">April</p>
                <p className="text-sm text-red-600">-1.6% return</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-gray-900">$23,600</p>
                <p className="text-sm text-blue-600">Initial capital</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
