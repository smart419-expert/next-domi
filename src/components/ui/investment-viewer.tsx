'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DynamicChart } from './dynamic-chart';
import { InvestmentGallery } from './investment-gallery';
import { useLanguage } from '@/contexts/language-context';
import { BarChart3, Image as ImageIcon, ToggleLeft, ToggleRight } from 'lucide-react';

interface InvestmentViewerProps {
  className?: string;
}

export function InvestmentViewer({ className }: InvestmentViewerProps) {
  const { t } = useLanguage();
  const [useDynamicChart, setUseDynamicChart] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleDataChange = (data: any[]) => {
    setChartData(data);
  };

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file.name);
    // Handle image upload logic here
  };

  const handleImageDelete = (imageId: string) => {
    console.log('Image deleted:', imageId);
    // Handle image deletion logic here
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {useDynamicChart ? (
                <BarChart3 className="h-5 w-5" />
              ) : (
                <ImageIcon className="h-5 w-5" />
              )}
{t('investments.data_visualization')}
            </CardTitle>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Label htmlFor="chart-toggle" className="text-sm font-medium">
{t('investments.dynamic_chart')}
                </Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{t('investments.images')}</span>
                  <Switch
                    id="chart-toggle"
                    checked={useDynamicChart}
                    onCheckedChange={setUseDynamicChart}
                  />
                  <span className="text-sm text-gray-600">{t('investments.charts')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {useDynamicChart ? (
            <DynamicChart
              data={chartData}
              onDataChange={handleDataChange}
              className="border-0 shadow-none"
            />
          ) : (
            <InvestmentGallery
              onImageUpload={handleImageUpload}
              onImageDelete={handleImageDelete}
              className="border-0 shadow-none"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
