'use client';

import React, { useState, useEffect } from 'react';
import { FileUploader } from './file-uploader';
import { FileGallery } from './file-gallery';
import { Button } from './button';
import { Upload, FolderOpen } from 'lucide-react';
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

interface FileManagerProps {
  clientId: string;
  className?: string;
}

export function FileManager({ clientId, className }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load client files
  const loadFiles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/clients/${clientId}/uploads`);
      setFiles(response.data.uploads || []);
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [clientId]);

  const handleUploadComplete = async (fileUrl: string) => {
    try {
      // Get file info from the URL (in a real app, you'd get this from the upload response)
      const fileName = fileUrl.split('/').pop() || 'Unknown file';
      
      // Attach file to client
      const response = await axios.post(`/api/clients/${clientId}/uploads`, {
        url: fileUrl,
        fileName,
        size: 0, // Would be provided by upload API
        type: 'image/jpeg', // Would be determined from file
      });

      // Add to local state
      setFiles(prev => [...prev, response.data.upload]);
      setShowUploader(false);
    } catch (error) {
      console.error('Failed to attach file to client:', error);
    }
  };

  const handleFileUpdate = (updatedFile: FileItem) => {
    setFiles(prev => 
      prev.map(file => file.id === updatedFile.id ? updatedFile : file)
    );
  };

  const handleFileDelete = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleFileReplace = (fileId: string, newFile: File) => {
    // The FileGallery component handles the replacement logic
    // This is just for any additional local state updates if needed
    console.log('File replaced:', fileId, newFile.name);
  };

  if (isLoading) {
    return (
      <div className={`p-8 text-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading files...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FolderOpen className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">File Manager</h2>
            <p className="text-sm text-gray-500">
              Manage files and documents for this client
            </p>
          </div>
        </div>
        
        <Button
          onClick={() => setShowUploader(!showUploader)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Upload className="h-4 w-4 mr-2" />
          {showUploader ? 'Hide Uploader' : 'Upload Files'}
        </Button>
      </div>

      {/* Upload Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Uploading...</span>
            <span className="text-sm text-blue-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* File Uploader */}
      {showUploader && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Files</h3>
          <FileUploader
            onUploadComplete={handleUploadComplete}
            onUploadProgress={setUploadProgress}
            maxFiles={5}
            acceptedFileTypes={['image/*', 'application/pdf']}
            maxSize={10 * 1024 * 1024} // 10MB
          />
        </div>
      )}

      {/* File Gallery */}
      <FileGallery
        files={files}
        clientId={clientId}
        onFileUpdate={handleFileUpdate}
        onFileDelete={handleFileDelete}
        onFileReplace={handleFileReplace}
      />

      {/* Stats */}
      {files.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{files.length}</div>
              <div className="text-sm text-gray-500">Total Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {files.filter(f => f.isFeatured).length}
              </div>
              <div className="text-sm text-gray-500">Featured</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {files.filter(f => f.type.startsWith('image/')).length}
              </div>
              <div className="text-sm text-gray-500">Images</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024 * 100) / 100} MB
              </div>
              <div className="text-sm text-gray-500">Total Size</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
