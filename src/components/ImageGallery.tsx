'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { 
  Image as ImageIcon, 
  Calendar, 
  Download, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Upload,
  FileImage,
  Search,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageItem {
  id: string;
  url: string;
  title: string;
  description?: string;
  uploadDate: Date;
  size?: string;
  type?: string;
  tags?: string[];
}

export interface ImageGalleryProps {
  images: ImageItem[];
  title?: string;
  description?: string;
  className?: string;
  showUploadButton?: boolean;
  onUpload?: () => void;
  onImageClick?: (image: ImageItem) => void;
  onImageDelete?: (imageId: string) => void;
  onImageDownload?: (image: ImageItem) => void;
  onImageUpload?: (files: FileList) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  filterTags?: string[];
  onFilterChange?: (tags: string[]) => void;
}

export function ImageGallery({
  images,
  title = "Image Gallery",
  description = "Browse and manage your images",
  className = "",
  showUploadButton = true,
  onUpload,
  onImageClick,
  onImageDelete,
  onImageDownload,
  onImageUpload,
  viewMode = 'grid',
  onViewModeChange,
  searchTerm = '',
  onSearchChange,
  filterTags = [],
  onFilterChange,
}: ImageGalleryProps) {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter and search images
  const filteredImages = images.filter(image => {
    const matchesSearch = !searchTerm || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterTags.length === 0 || 
      image.tags?.some(tag => filterTags.includes(tag));
    
    return matchesSearch && matchesFilter;
  });

  // Lazy loading setup
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.getAttribute('data-image-id');
            if (imageId) {
              setLoadedImages(prev => new Set([...prev, imageId]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe images for lazy loading
  useEffect(() => {
    if (observerRef.current) {
      // Disconnect previous observers
      observerRef.current.disconnect();
      
      // Observe new images
      imageRefs.current.forEach((ref) => {
        if (ref) {
          observerRef.current?.observe(ref);
        }
      });
    }
    
    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredImages]); // Changed dependency to filteredImages

  const handleImageClick = (image: ImageItem, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
    onImageClick?.(image);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleCloseModal();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  const handleUploadClick = () => {
    if (onUpload) {
      onUpload();
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFiles(files);
    }
  };

  const processFiles = async (files: FileList) => {
    setIsUploading(true);
    try {
      if (onImageUpload) {
        await onImageUpload(files);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFiles(files);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatFileSize = (size?: string) => {
    if (!size) return '';
    const bytes = parseInt(size);
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getUniqueTags = () => {
    const allTags = images.flatMap(img => img.tags || []);
    return [...new Set(allTags)];
  };

  if (images.length === 0) {
    return (
      <Card className={`${className} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 dark:border-gray-700 shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900 dark:text-white">
            <ImageIcon className="h-5 w-5 mr-2" />
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileImage className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Images Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
              Upload your first image to get started. Images will appear here once uploaded.
            </p>
            {showUploadButton && (
              <Button 
                onClick={handleUploadClick} 
                className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200" 
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`${className} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 dark:border-gray-700 shadow-lg transition-all duration-300 ${
        isDragOver ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50/80 dark:bg-blue-900/20' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardHeader>
        <div className="flex flex-col 425px:flex-row 425px:items-center 425px:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <ImageIcon className="h-5 w-5 mr-2" />
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {onViewModeChange && (
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
            {showUploadButton && (
              <Button 
                onClick={handleUploadClick} 
                size="sm" 
                disabled={isUploading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? t('gallery.uploading') : t('gallery.upload')}
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col 425px:flex-row gap-4 mt-4">
          {onSearchChange && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          )}
          
          {onFilterChange && getUniqueTags().length > 0 && (
            <div className="flex flex-wrap gap-2">
              {getUniqueTags().map(tag => (
                <Badge
                  key={tag}
                  variant={filterTags.includes(tag) ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    filterTags.includes(tag) 
                      ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    const newTags = filterTags.includes(tag)
                      ? filterTags.filter(t => t !== tag)
                      : [...filterTags, tag];
                    onFilterChange(newTags);
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* Drag and Drop Overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-blue-600">Drop files here to upload</p>
              <p className="text-sm text-blue-500">Images and PDFs are supported</p>
            </div>
          </div>
        )}

        {filteredImages.length === 0 ? (
          <div className="text-center py-8">
            <Search className="h-8 w-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No images found matching your search.</p>
          </div>
        ) : (
          <div className={cn(
            viewMode === 'grid' 
              ? 'grid grid-cols-1 425px:grid-cols-2 sm:grid-cols-2 725px:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-4'
          )}>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                ref={(el) => {
                  if (el) {
                    imageRefs.current.set(image.id, el);
                  }
                }}
                data-image-id={image.id}
                className={cn(
                  'group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-400 hover:scale-[1.02]',
                  viewMode === 'list' && 'flex'
                )}
              >
                {/* Image Container */}
                <div className={cn(
                  'relative overflow-hidden',
                  viewMode === 'grid' ? 'aspect-square' : 'w-32 h-24 flex-shrink-0'
                )}>
                  {loadedImages.has(image.id) ? (
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleImageClick(image, index)}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {onImageDownload && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onImageDownload(image)}
                          className="bg-white/90 hover:bg-white"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={cn(
                  'p-4',
                  viewMode === 'list' && 'flex-1'
                )}>
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{image.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(image.uploadDate)}
                    </div>
                    {image.size && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(image.size)}
                      </span>
                    )}
                  </div>

                  {image.tags && image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {image.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                      {image.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          +{image.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-gray-600 mt-1">{selectedImage.description}</p>
                )}
                
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Uploaded {formatDate(selectedImage.uploadDate)}
                  </div>
                  <div className="flex items-center space-x-4">
                    {selectedImage.size && (
                      <span>{formatFileSize(selectedImage.size)}</span>
                    )}
                    {onImageDownload && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onImageDownload(selectedImage)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>

                {selectedImage.tags && selectedImage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedImage.tags.map(tag => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image Counter */}
            {filteredImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} of {filteredImages.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />
    </Card>
  );
}
