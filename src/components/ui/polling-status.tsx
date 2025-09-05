'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PollingStatusProps {
  isConnected: boolean;
  isPolling: boolean;
  lastUpdate?: string;
  nextUpdate?: string;
  refreshInterval: number;
  onForceUpdate: () => void;
  isUpdating?: boolean;
  className?: string;
}

export function PollingStatus({
  isConnected,
  isPolling,
  lastUpdate,
  nextUpdate,
  refreshInterval,
  onForceUpdate,
  isUpdating = false,
  className
}: PollingStatusProps) {
  const formatNextUpdate = (timestamp?: string) => {
    if (!timestamp) return 'Unknown';
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Invalid date';
    }
  };

  const formatLastUpdate = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusColor = () => {
    if (!isConnected) return 'destructive';
    if (isPolling) return 'default';
    return 'secondary';
  };

  const getStatusText = () => {
    if (!isConnected) return 'Disconnected';
    if (isPolling) return 'Polling Active';
    return 'Polling Paused';
  };

  const getStatusIcon = () => {
    if (!isConnected) return <WifiOff className="h-4 w-4" />;
    if (isPolling) return <Wifi className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <Badge variant={getStatusColor()}>
                {getStatusText()}
              </Badge>
            </div>
            
            <div className="text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Last: {formatLastUpdate(lastUpdate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <RefreshCw className="h-3 w-3" />
                <span>Next: {formatNextUpdate(nextUpdate)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500">
              Interval: {Math.round(refreshInterval / 1000)}s
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={onForceUpdate}
              disabled={isUpdating || !isConnected}
              className="flex items-center space-x-1"
            >
              <RefreshCw className={`h-3 w-3 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>{isUpdating ? 'Updating...' : 'Force Update'}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
