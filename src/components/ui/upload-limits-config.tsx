'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/contexts/role-context';
import { Upload, Shield, Settings, File, Image, FileText, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadLimits {
  maxFileSize: number; // in MB
  maxFilesPerUpload: number;
  allowedMimeTypes: string[];
  maxStoragePerUser: number; // in MB
  enableVirusScanning: boolean;
  enableImageCompression: boolean;
  maxImageDimensions: {
    width: number;
    height: number;
  };
}

const defaultLimits: UploadLimits = {
  maxFileSize: 10,
  maxFilesPerUpload: 5,
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  maxStoragePerUser: 100,
  enableVirusScanning: true,
  enableImageCompression: true,
  maxImageDimensions: {
    width: 2048,
    height: 2048,
  },
};

const commonMimeTypes = [
  { value: 'image/jpeg', label: 'JPEG Images', icon: <Image className="h-4 w-4" /> },
  { value: 'image/png', label: 'PNG Images', icon: <Image className="h-4 w-4" /> },
  { value: 'image/gif', label: 'GIF Images', icon: <Image className="h-4 w-4" /> },
  { value: 'image/webp', label: 'WebP Images', icon: <Image className="h-4 w-4" /> },
  { value: 'application/pdf', label: 'PDF Documents', icon: <FileText className="h-4 w-4" /> },
  { value: 'text/plain', label: 'Text Files', icon: <FileText className="h-4 w-4" /> },
  { value: 'application/msword', label: 'Word Documents', icon: <File className="h-4 w-4" /> },
  { value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Word Documents (DOCX)', icon: <File className="h-4 w-4" /> },
  { value: 'application/vnd.ms-excel', label: 'Excel Spreadsheets', icon: <File className="h-4 w-4" /> },
  { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'Excel Spreadsheets (XLSX)', icon: <File className="h-4 w-4" /> },
  { value: 'application/zip', label: 'ZIP Archives', icon: <File className="h-4 w-4" /> },
  { value: 'video/mp4', label: 'MP4 Videos', icon: <File className="h-4 w-4" /> },
  { value: 'audio/mpeg', label: 'MP3 Audio', icon: <File className="h-4 w-4" /> },
];

export function UploadLimitsConfig() {
  const { hasPermission } = useRole();
  const [limits, setLimits] = useState<UploadLimits>(defaultLimits);
  const [isEditing, setIsEditing] = useState(false);
  const [newMimeType, setNewMimeType] = useState('');

  const handleLimitChange = (field: keyof UploadLimits, value: string | number | object | boolean) => {
    setLimits(prev => ({ ...prev, [field]: value }));
  };

  const handleMimeTypeToggle = (mimeType: string) => {
    setLimits(prev => ({
      ...prev,
      allowedMimeTypes: prev.allowedMimeTypes.includes(mimeType)
        ? prev.allowedMimeTypes.filter(type => type !== mimeType)
        : [...prev.allowedMimeTypes, mimeType]
    }));
  };

  const handleAddCustomMimeType = () => {
    if (newMimeType && !limits.allowedMimeTypes.includes(newMimeType)) {
      setLimits(prev => ({
        ...prev,
        allowedMimeTypes: [...prev.allowedMimeTypes, newMimeType]
      }));
      setNewMimeType('');
    }
  };

  const handleRemoveMimeType = (mimeType: string) => {
    setLimits(prev => ({
      ...prev,
      allowedMimeTypes: prev.allowedMimeTypes.filter(type => type !== mimeType)
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast.success('Upload limits configuration saved');
    setIsEditing(false);
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const getMimeTypeInfo = (mimeType: string) => {
    return commonMimeTypes.find(type => type.value === mimeType) || {
      value: mimeType,
      label: mimeType,
      icon: <File className="h-4 w-4" />
    };
  };

  if (!hasPermission('system_settings')) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>You don&apos;t have permission to configure upload limits.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Limits & File Types
        </CardTitle>
        <CardDescription>
          Configure file upload limits, allowed file types, and security settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* File Size Limits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="maxFileSize" className="text-sm font-medium">
                Max File Size
              </Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="maxFileSize"
                  type="number"
                  value={limits.maxFileSize}
                  onChange={(e) => handleLimitChange('maxFileSize', parseInt(e.target.value) || 0)}
                  className="flex-1"
                  min="1"
                  max="1000"
                />
                <span className="text-sm text-gray-500">MB</span>
              </div>
            </div>
            <div>
              <Label htmlFor="maxFilesPerUpload" className="text-sm font-medium">
                Max Files Per Upload
              </Label>
              <Input
                id="maxFilesPerUpload"
                type="number"
                value={limits.maxFilesPerUpload}
                onChange={(e) => handleLimitChange('maxFilesPerUpload', parseInt(e.target.value) || 0)}
                className="mt-1"
                min="1"
                max="50"
              />
            </div>
            <div>
              <Label htmlFor="maxStoragePerUser" className="text-sm font-medium">
                Max Storage Per User
              </Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="maxStoragePerUser"
                  type="number"
                  value={limits.maxStoragePerUser}
                  onChange={(e) => handleLimitChange('maxStoragePerUser', parseInt(e.target.value) || 0)}
                  className="flex-1"
                  min="1"
                  max="10000"
                />
                <span className="text-sm text-gray-500">MB</span>
              </div>
            </div>
          </div>

          {/* Image Dimensions */}
          <div>
            <Label className="text-sm font-medium">Max Image Dimensions</Label>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                <Label htmlFor="maxWidth" className="text-xs text-gray-500">Width (px)</Label>
                <Input
                  id="maxWidth"
                  type="number"
                  value={limits.maxImageDimensions.width}
                  onChange={(e) => handleLimitChange('maxImageDimensions', {
                    ...limits.maxImageDimensions,
                    width: parseInt(e.target.value) || 0
                  })}
                  min="100"
                  max="4096"
                />
              </div>
              <div>
                <Label htmlFor="maxHeight" className="text-xs text-gray-500">Height (px)</Label>
                <Input
                  id="maxHeight"
                  type="number"
                  value={limits.maxImageDimensions.height}
                  onChange={(e) => handleLimitChange('maxImageDimensions', {
                    ...limits.maxImageDimensions,
                    height: parseInt(e.target.value) || 0
                  })}
                  min="100"
                  max="4096"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Security Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="virusScanning" className="text-sm font-medium">
                    Enable Virus Scanning
                  </Label>
                  <p className="text-xs text-gray-500">Scan uploaded files for malware</p>
                </div>
                <Switch
                  id="virusScanning"
                  checked={limits.enableVirusScanning}
                  onCheckedChange={(checked) => handleLimitChange('enableVirusScanning', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="imageCompression" className="text-sm font-medium">
                    Enable Image Compression
                  </Label>
                  <p className="text-xs text-gray-500">Automatically compress large images</p>
                </div>
                <Switch
                  id="imageCompression"
                  checked={limits.enableImageCompression}
                  onCheckedChange={(checked) => handleLimitChange('enableImageCompression', checked)}
                />
              </div>
            </div>
          </div>

          {/* Allowed File Types */}
          <div>
            <Label className="text-sm font-medium">Allowed File Types</Label>
            <p className="text-xs text-gray-500 mb-3">Select which file types are allowed for upload</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              {commonMimeTypes.map((mimeType) => {
                const isSelected = limits.allowedMimeTypes.includes(mimeType.value);
                return (
                  <div
                    key={mimeType.value}
                    className={`flex items-center space-x-2 p-2 border rounded cursor-pointer transition-colors ${
                      isSelected 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleMimeTypeToggle(mimeType.value)}
                  >
                    <Switch
                      checked={isSelected}
                      onChange={() => {}} // Handled by parent click
                    />
                    {mimeType.icon}
                    <span className="text-sm">{mimeType.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Custom MIME Type */}
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add custom MIME type (e.g., application/json)"
                value={newMimeType}
                onChange={(e) => setNewMimeType(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAddCustomMimeType}
                disabled={!newMimeType || limits.allowedMimeTypes.includes(newMimeType)}
                size="sm"
              >
                Add
              </Button>
            </div>

            {/* Selected MIME Types */}
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Currently Allowed Types:</h5>
              <div className="flex flex-wrap gap-2">
                {limits.allowedMimeTypes.map((mimeType) => {
                  const info = getMimeTypeInfo(mimeType);
                  return (
                    <Badge
                      key={mimeType}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      {info.icon}
                      <span>{info.label}</span>
                      <button
                        onClick={() => handleRemoveMimeType(mimeType)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Current Configuration Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Max file size:</span>
                <span className="ml-2 font-medium">{formatFileSize(limits.maxFileSize)}</span>
              </div>
              <div>
                <span className="text-gray-600">Max files per upload:</span>
                <span className="ml-2 font-medium">{limits.maxFilesPerUpload}</span>
              </div>
              <div>
                <span className="text-gray-600">Max storage per user:</span>
                <span className="ml-2 font-medium">{formatFileSize(limits.maxStoragePerUser)}</span>
              </div>
              <div>
                <span className="text-gray-600">Allowed file types:</span>
                <span className="ml-2 font-medium">{limits.allowedMimeTypes.length}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">
              <strong>Total allowed file types:</strong> {limits.allowedMimeTypes.length}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              {isEditing && (
                <Button onClick={handleSave}>
                  Save Configuration
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
