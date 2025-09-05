'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Upload, Download, Trash2, Eye, Calendar, FileImage } from 'lucide-react';
import Image from 'next/image';

interface InvestmentImage {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  description?: string;
  tags?: string[];
}

interface InvestmentGalleryProps {
  images?: InvestmentImage[];
  onImageUpload?: (file: File) => void;
  onImageDelete?: (imageId: string) => void;
  className?: string;
}

export function InvestmentGallery({ 
  images: initialImages = [], 
  onImageUpload, 
  onImageDelete,
  className 
}: InvestmentGalleryProps) {
  const [images, setImages] = useState<InvestmentImage[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<InvestmentImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Sample images for demonstration
  const sampleImages: InvestmentImage[] = [
    {
      id: 'img-1',
      name: 'Portfolio Performance Q1 2024',
      url: '/api/placeholder/400/300',
      uploadedAt: '2024-01-15T10:30:00Z',
      description: 'Quarterly performance analysis showing 15% growth',
      tags: ['Q1', 'Performance', 'Analysis']
    },
    {
      id: 'img-2',
      name: 'Market Trends Analysis',
      url: '/api/placeholder/400/300',
      uploadedAt: '2024-01-14T15:45:00Z',
      description: 'Market trend analysis with sector breakdown',
      tags: ['Market', 'Trends', 'Sectors']
    },
    {
      id: 'img-3',
      name: 'Risk Assessment Chart',
      url: '/api/placeholder/400/300',
      uploadedAt: '2024-01-13T09:20:00Z',
      description: 'Risk vs return analysis for portfolio optimization',
      tags: ['Risk', 'Assessment', 'Optimization']
    }
  ];

  const currentImages = images.length > 0 ? images : sampleImages;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newImage: InvestmentImage = {
        id: `img-${Date.now()}`,
        name: file.name,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
        description: `Uploaded ${file.name}`,
        tags: ['Uploaded']
      };

      setImages(prev => [newImage, ...prev]);
      onImageUpload?.(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageDelete = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
    onImageDelete?.(imageId);
    
    if (selectedImage?.id === imageId) {
      setSelectedImage(null);
    }
  };

  const downloadImage = (image: InvestmentImage) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.name;
    link.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Investment Charts & Images
            </CardTitle>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <Button variant="outline" size="sm" disabled={isUploading}>
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentImages.length === 0 ? (
            <div className="text-center py-12">
              <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No images uploaded</h3>
              <p className="text-gray-600 mb-4">Upload investment charts, graphs, or analysis images</p>
              <div className="relative inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload First Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentImages.map((image) => (
                <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        onClick={() => setSelectedImage(image)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => handleImageDelete(image.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 truncate">{image.name}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(image.uploadedAt)}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => downloadImage(image)}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                    {image.tags && image.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {image.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{selectedImage.name}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadImage(selectedImage)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full h-96">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  fill
                  className="object-contain"
                />
              </div>
              {selectedImage.description && (
                <div className="p-4 border-t">
                  <p className="text-sm text-gray-600">{selectedImage.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Uploaded {formatDate(selectedImage.uploadedAt)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
