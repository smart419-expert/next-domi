'use client';

import React, { useState, useRef } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Download, Upload, BarChart3, TrendingUp } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ChartData {
  date: string;
  value: number;
  [key: string]: any;
}

interface DynamicChartProps {
  data?: ChartData[];
  onDataChange?: (data: ChartData[]) => void;
  className?: string;
}

export function DynamicChart({ data: initialData, onDataChange, className }: DynamicChartProps) {
  const [data, setData] = useState<ChartData[]>(initialData || []);
  const [chartType, setChartType] = useState<'line' | 'area'>('line');
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Sample data for demonstration
  const sampleData: ChartData[] = [
    { date: '2024-01-01', value: 1000, portfolio: 1000, benchmark: 1000 },
    { date: '2024-01-02', value: 1020, portfolio: 1020, benchmark: 1005 },
    { date: '2024-01-03', value: 1015, portfolio: 1015, benchmark: 1010 },
    { date: '2024-01-04', value: 1030, portfolio: 1030, benchmark: 1015 },
    { date: '2024-01-05', value: 1045, portfolio: 1045, benchmark: 1020 },
    { date: '2024-01-06', value: 1035, portfolio: 1035, benchmark: 1025 },
    { date: '2024-01-07', value: 1050, portfolio: 1050, benchmark: 1030 },
    { date: '2024-01-08', value: 1065, portfolio: 1065, benchmark: 1035 },
    { date: '2024-01-09', value: 1070, portfolio: 1070, benchmark: 1040 },
    { date: '2024-01-10', value: 1080, portfolio: 1080, benchmark: 1045 },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const text = await file.text();
      let parsedData: ChartData[] = [];

      if (file.name.endsWith('.csv')) {
        parsedData = parseCSV(text);
      } else if (file.name.endsWith('.json')) {
        parsedData = JSON.parse(text);
      }

      if (parsedData.length > 0) {
        setData(parsedData);
        onDataChange?.(parsedData);
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Error parsing file. Please check the format.');
    } finally {
      setIsLoading(false);
    }
  };

  const parseCSV = (csvText: string): ChartData[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data: ChartData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length === headers.length) {
        const row: ChartData = {
          date: '',
          value: 0
        };
        headers.forEach((header, index) => {
          const value = values[index];
          if (header.toLowerCase().includes('date')) {
            row.date = value;
          } else if (header.toLowerCase().includes('value') || header.toLowerCase().includes('price')) {
            row.value = parseFloat(value) || 0;
          } else {
            row[header] = parseFloat(value) || value;
          }
        });
        if (row.date && row.value !== undefined) {
          data.push(row);
        }
      }
    }

    return data;
  };

  const loadSampleData = () => {
    setData(sampleData);
    onDataChange?.(sampleData);
  };

  const exportAsPNG = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = 'investment-chart.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error exporting PNG:', error);
    }
  };

  const exportAsPDF = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('investment-chart.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const currentData = data.length > 0 ? data : sampleData;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Investment Performance
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={chartType} onValueChange={(value: string) => setChartType(value as 'line' | 'area')} className="w-32">
              <option value="line">Line Chart</option>
              <option value="area">Area Chart</option>
            </Select>
            <Button onClick={loadSampleData} variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Sample Data
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm" disabled={isLoading}>
                <Upload className="h-4 w-4 mr-2" />
                {isLoading ? 'Loading...' : 'Upload Data'}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                {currentData.some(d => d.portfolio && d.benchmark) && (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="portfolio" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </>
                )}
              </LineChart>
            ) : (
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            {currentData.length} data points • {chartType === 'line' ? 'Line' : 'Area'} Chart
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={exportAsPNG} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PNG
            </Button>
            <Button onClick={exportAsPDF} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
