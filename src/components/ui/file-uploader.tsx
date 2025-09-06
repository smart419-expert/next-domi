'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Crop, RotateCcw, Check } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface FileUploaderProps {
  onUploadComplete?: (fileUrl: string) => void;
  onUploadProgress?: (progress: number) => void;
  className?: string;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxSize?: number; // in bytes
}

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function FileUploader({
  onUploadComplete,
  onUploadProgress,
  className,
  maxFiles = 1,
  acceptedFileTypes = ['image/*'],
  maxSize = 10 * 1024 * 1024, // 10MB
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCrop, setShowCrop] = useState(false);
  const [cropArea, setCropArea] = useState<CroppedArea | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, maxFiles - files.length);
    setFiles(prev => [...prev, ...newFiles]);
    
    // Create previews
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, [files.length, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    maxFiles: maxFiles - files.length,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const startCrop = (index: number) => {
    setShowCrop(true);
    // Set up crop area for the selected image
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        }
      }
    };
    img.src = previews[index];
  };

  const applyCrop = () => {
    if (!cropArea || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y, width, height } = cropArea;
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');
    
    if (croppedCtx) {
      croppedCanvas.width = width;
      croppedCanvas.height = height;
      croppedCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
      
      // Convert to blob and update the file
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], files[0].name, { type: files[0].type });
          setFiles([file]);
          setPreviews([croppedCanvas.toDataURL()]);
        }
      });
    }
    
    setShowCrop(false);
    setCropArea(null);
  };

  const uploadFile = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await axios.post('/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(progress);
          onUploadProgress?.(progress);
        },
      });

      onUploadComplete?.(response.data.url);
      
      // Reset state
      setFiles([]);
      setPreviews([]);
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive || isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400',
          files.length > 0 && 'border-green-500 bg-green-50'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or click to browse files
        </p>
        <p className="text-xs text-gray-400">
          Max file size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>

      {/* File Previews */}
      {previews.length > 0 && (
        <div className="mt-6 space-y-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="flex items-center space-x-4 p-4 border rounded-lg bg-white">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{files[index]?.name}</p>
                  <p className="text-sm text-gray-500">
                    {files[index] && Math.round(files[index].size / 1024)} KB
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startCrop(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Crop className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFile(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Uploading...</span>
            <span className="text-sm text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && !isUploading && (
        <div className="mt-6 flex justify-end">
          <Button onClick={uploadFile} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload {files.length} file{files.length > 1 ? 's' : ''}
          </Button>
        </div>
      )}

      {/* Crop Modal */}
      {showCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Crop Image</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCrop(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto border rounded-lg"
                style={{ cursor: 'crosshair' }}
                onMouseDown={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  setCropArea({ x, y, width: 0, height: 0 });
                }}
                onMouseMove={(e) => {
                  if (cropArea) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const width = e.clientX - rect.left - cropArea.x;
                    const height = e.clientY - rect.top - cropArea.y;
                    setCropArea(prev => prev ? { ...prev, width, height } : null);
                  }
                }}
                onMouseUp={() => {
                  // Crop area is set
                }}
              />
              
              {cropArea && (
                <div
                  className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20"
                  style={{
                    left: cropArea.x,
                    top: cropArea.y,
                    width: Math.abs(cropArea.width),
                    height: Math.abs(cropArea.height),
                  }}
                />
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowCrop(false)}
              >
                Cancel
              </Button>
              <Button onClick={applyCrop}>
                <Check className="h-4 w-4 mr-2" />
                Apply Crop
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}