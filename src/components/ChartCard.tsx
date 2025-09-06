'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface ChartData {
  labels: string[];
  series: Array<{
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }>;
}

export interface ChartCardProps {
  title: string;
  config: ChartData;
  lastUpdated: Date;
  className?: string;
  height?: number;
}

export function ChartCard({ 
  title, 
  config, 
  lastUpdated, 
  className = "",
  height = 300
}: ChartCardProps) {
  const { t } = useLanguage();
  // Check if there's any data
  const hasData = config.series.some(series => series.data.length > 0);
  
  // Default colors for series if not provided
  const defaultColors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#8B5CF6', // purple
    '#06B6D4', // cyan
  ];

  // Prepare chart data
  const chartData = {
    labels: config.labels,
    datasets: config.series.map((series, index) => ({
      label: series.label,
      data: series.data,
      borderColor: series.borderColor || defaultColors[index % defaultColors.length],
      backgroundColor: series.backgroundColor || 
        (series.fill ? `${series.borderColor || defaultColors[index % defaultColors.length]}20` : 'transparent'),
      fill: series.fill || false,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: series.borderColor || defaultColors[index % defaultColors.length],
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
    })),
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context: any) => {
            return context[0]?.label || '';
          },
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${typeof value === 'number' ? value.toLocaleString() : value}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6B7280',
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6B7280',
          callback: function(value: any) {
            return typeof value === 'number' ? value.toLocaleString() : value;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `hace ${Math.floor(diffInMinutes / 60)}h`;
    return date.toLocaleDateString();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>
          {t('client.dashboard.interactive_chart')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sin Datos Disponibles</h3>
            <p className="text-gray-500 max-w-sm">
              No hay datos para mostrar en este gráfico. Los datos aparecerán aquí una vez que estén disponibles.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div style={{ height: `${height}px` }}>
              <Line data={chartData} options={chartOptions} />
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
              </div>
              <div className="text-xs">
                {config.series.length} dataset{config.series.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
