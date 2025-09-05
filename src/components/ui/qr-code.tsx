'use client';

import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  className?: string;
}

// Simple QR Code fallback component
export function QRCode({ 
  value, 
  size = 200, 
  level = 'M', 
  includeMargin = true,
  className = ''
}: QRCodeProps) {
  // For now, we'll create a simple placeholder
  // In a real implementation, you might want to use a different QR library
  // or implement a canvas-based QR code generator
  
  const qrSize = includeMargin ? size + 20 : size;
  
  return (
    <div 
      className={`inline-block bg-white border-2 border-gray-200 rounded-lg p-4 ${className}`}
      style={{ width: qrSize, height: qrSize }}
    >
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-gray-400 rounded"></div>
          <div className="text-xs text-gray-500">QR Code</div>
          <div className="text-xs text-gray-400 font-mono break-all">
            {value.substring(0, 20)}...
          </div>
        </div>
      </div>
    </div>
  );
}

