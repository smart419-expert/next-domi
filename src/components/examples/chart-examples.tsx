'use client';

import { ChartCard, ChartData } from '@/components/ChartCard';

// Example usage of ChartCard component
export function ChartExamples() {
  // Example 1: Portfolio Performance Chart
  const portfolioData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    series: [
      {
        label: 'Portfolio Value',
        data: [25000, 26500, 27200, 26800, 27500, 28200, 28900, 29500],
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F620',
        fill: true,
      },
    ],
  };

  // Example 2: Multi-series Chart
  const multiSeriesData: ChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      {
        label: 'Revenue',
        data: [120000, 135000, 142000, 158000],
        borderColor: '#10B981',
        backgroundColor: '#10B98120',
        fill: true,
      },
      {
        label: 'Expenses',
        data: [80000, 85000, 92000, 98000],
        borderColor: '#EF4444',
        backgroundColor: '#EF444420',
        fill: true,
      },
      {
        label: 'Profit',
        data: [40000, 50000, 50000, 60000],
        borderColor: '#F59E0B',
        backgroundColor: '#F59E0B20',
        fill: true,
      },
    ],
  };

  // Example 3: Empty Data Chart
  const emptyData: ChartData = {
    labels: [],
    series: [
      {
        label: 'No Data',
        data: [],
        borderColor: '#6B7280',
        backgroundColor: '#6B728020',
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Chart.js Examples</h1>
      
      {/* Portfolio Chart */}
      <ChartCard
        title="Portfolio Performance"
        config={portfolioData}
        lastUpdated={new Date()}
        height={300}
      />

      {/* Multi-series Chart */}
      <ChartCard
        title="Financial Overview"
        config={multiSeriesData}
        lastUpdated={new Date(Date.now() - 2 * 60 * 60 * 1000)} // 2 hours ago
        height={400}
      />

      {/* Empty State Chart */}
      <ChartCard
        title="Empty Data Example"
        config={emptyData}
        lastUpdated={new Date(Date.now() - 24 * 60 * 60 * 1000)} // 1 day ago
        height={300}
      />
    </div>
  );
}
