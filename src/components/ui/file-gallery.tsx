'use client';

import React, { useState } from 'react';
import { Star, Trash2, Edit, Eye, Download, X } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface FileItem {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  isFeatured: boolean;
  uploadedAt: string;
  clientId: string;
}

interface FileGalleryProps {
  files: FileItem[];
  clientId: string;
  onFileUpdate?: (file: FileItem) => void;
  onFileDelete?: (fileId: string) => void;
  onFileReplace?: (fileId: string, newFile: File) => void;
  className?: string;
}

export function FileGallery({
  files,
  clientId,
  onFileUpdate,
  onFileDelete,
  onFileReplace,
  className,
}: FileGalleryProps) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [replaceProgress, setReplaceProgress] = useState(0);

  const toggleFeatured = async (file: FileItem) => {
    try {
      const response = await axios.put(`/api/clients/${clientId}/uploads/${file.id}`, {
        isFeatured: !file.isFeatured,
      });
      
      onFileUpdate?.(response.data);
    } catch (error) {
      console.error('Failed to update file:', error);
    }
  };

  const deleteFile = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      await axios.delete(`/api/clients/${clientId}/uploads/${fileId}`);
      onFileDelete?.(fileId);
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const replaceFile = async (fileId: string, newFile: File) => {
    setIsReplacing(true);
    setReplaceProgress(0);

    try {
      // First upload the new file
      const formData = new FormData();
      formData.append('file', newFile);

      const uploadResponse = await axios.post('/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setReplaceProgress(progress);
        },
      });

      // Then update the client's file record
      const response = await axios.put(`/api/clients/${clientId}/uploads/${fileId}`, {
        url: uploadResponse.data.url,
        name: newFile.name,
        size: newFile.size,
        type: newFile.type,
      });

      onFileUpdate?.(response.data);
      onFileReplace?.(fileId, newFile);
    } catch (error) {
      console.error('Failed to replace file:', error);
    } finally {
      setIsReplacing(false);
      setReplaceProgress(0);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedFile) {
      replaceFile(selectedFile.id, file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isImage = (type: string) => type.startsWith('image/');

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Files & Documents</h3>
        <span className="text-sm text-gray-500">{files.length} file{files.length !== 1 ? 's' : ''}</span>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No files uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className={cn(
                'relative group border rounded-lg p-4 bg-white hover:shadow-md transition-shadow',
                file.isFeatured && 'ring-2 ring-yellow-400 bg-yellow-50'
              )}
            >
              {/* Featured Badge */}
              {file.isFeatured && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full p-1">
                  <Star className="h-3 w-3 fill-current" />
                </div>
              )}

              {/* File Preview */}
              <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                {isImage(file.type) ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl text-gray-400 mb-2">📄</div>
                      <div className="text-xs text-gray-500 truncate px-2">
                        {file.name}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="space-y-1">
                <p className="font-medium text-sm text-gray-900 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(file.uploadedAt)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFeatured(file)}
                    className="h-8 w-8 p-0"
                    title={file.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <Star
                      className={cn(
                        'h-4 w-4',
                        file.isFeatured ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                      )}
                    />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedFile(file)}
                    className="h-8 w-8 p-0"
                    title="Replace file"
                  >
                    <Edit className="h-4 w-4 text-gray-400" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteFile(file.id)}
                    className="h-8 w-8 p-0"
                    title="Delete file"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>

              {/* View/Download Button */}
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Replace File Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Replace File</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Current file: {selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  Select a new file to replace it
                </p>
              </div>
              
              <input
                type="file"
                onChange={handleFileSelect}
                className="w-full p-2 border border-gray-300 rounded-lg"
                disabled={isReplacing}
              />
              
              {isReplacing && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Replacing...</span>
                    <span className="text-sm text-gray-500">{replaceProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${replaceProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedFile(null)}
                disabled={isReplacing}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
