'use client';

import { useState } from 'react';
import { ImageGallery, ImageItem } from '@/components/ImageGallery';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  BarChart3,
  PieChart,
  TrendingUp,
  Upload
} from 'lucide-react';

export function ClientImageGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: '1',
      url: '/api/placeholder/400/300',
      title: 'Q3 2024 Investment Performance Report',
      description: 'Comprehensive analysis of portfolio performance for Q3 2024',
      uploadDate: new Date('2024-10-15'),
      size: '2457600', // 2.4 MB in bytes
      type: 'pdf',
      tags: ['Performance', 'Quarterly', 'Report']
    },
    {
      id: '2',
      url: '/api/placeholder/400/300',
      title: 'Asset Allocation Chart',
      description: 'Visual representation of current asset allocation',
      uploadDate: new Date('2024-10-10'),
      size: '1228800', // 1.2 MB in bytes
      type: 'image',
      tags: ['Charts', 'Allocation', 'Visual']
    },
    {
      id: '3',
      url: '/api/placeholder/400/300',
      title: 'Monthly Statement - September 2024',
      description: 'Detailed monthly account statement',
      uploadDate: new Date('2024-10-01'),
      size: '876544', // 856 KB in bytes
      type: 'pdf',
      tags: ['Statements', 'Monthly', 'Account']
    },
    {
      id: '4',
      url: '/api/placeholder/400/300',
      title: 'Risk Assessment Analysis',
      description: 'Risk profile and assessment recommendations',
      uploadDate: new Date('2024-09-28'),
      size: '1884160', // 1.8 MB in bytes
      type: 'pdf',
      tags: ['Analysis', 'Risk', 'Assessment']
    },
    {
      id: '5',
      url: '/api/placeholder/400/300',
      title: 'Portfolio Growth Chart',
      description: 'Historical portfolio growth visualization',
      uploadDate: new Date('2024-09-25'),
      size: '968320', // 945 KB in bytes
      type: 'image',
      tags: ['Charts', 'Growth', 'Historical']
    },
    {
      id: '6',
      url: '/api/placeholder/400/300',
      title: 'Tax Document - 1099',
      description: 'Annual tax reporting document',
      uploadDate: new Date('2024-09-20'),
      size: '1126400', // 1.1 MB in bytes
      type: 'pdf',
      tags: ['Tax', 'Annual', '1099']
    },
    {
      id: '7',
      url: '/api/placeholder/400/300',
      title: 'Market Analysis - October 2024',
      description: 'Current market trends and analysis',
      uploadDate: new Date('2024-10-05'),
      size: '1536000', // 1.5 MB in bytes
      type: 'pdf',
      tags: ['Analysis', 'Market', 'Trends']
    },
    {
      id: '8',
      url: '/api/placeholder/400/300',
      title: 'Investment Strategy Overview',
      description: 'Strategic investment approach and guidelines',
      uploadDate: new Date('2024-09-15'),
      size: '2048000', // 2.0 MB in bytes
      type: 'pdf',
      tags: ['Strategy', 'Investment', 'Guidelines']
    }
  ]);

  const handleUpload = () => {
    console.log('Upload clicked');
    // This will trigger the file input via handleUploadClick
  };

  const handleImageUpload = async (files: FileList) => {
    console.log('Files to upload:', files);
    
    const newImages: ImageItem[] = [];
    
    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`Uploading file ${i + 1}:`, file.name, file.size, file.type);
      
      // Create a new image item
      const newImage: ImageItem = {
        id: `uploaded-${Date.now()}-${i}`,
        url: URL.createObjectURL(file), // Temporary URL for preview
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        description: `Uploaded on ${new Date().toLocaleDateString()}`,
        uploadDate: new Date(),
        size: file.size.toString(),
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        tags: ['Uploaded', 'New', file.type.includes('pdf') ? 'PDF' : 'Image']
      };
      
      newImages.push(newImage);
    }
    
    // Add new images to the state
    setImages(prev => [...newImages, ...prev]);
    
    console.log('Added new images:', newImages);
  };

  const handleImageClick = (image: ImageItem) => {
    console.log('Image clicked:', image.title);
    // Implement image click functionality
  };

  const handleImageDownload = (image: ImageItem) => {
    console.log('Download clicked:', image.title);
    // Implement download functionality
  };

  return (
    <div className="space-y-6">
      {/* Main Image Gallery */}
      <ImageGallery
        images={images}
        title="Reports & Documents"
        description="Access your investment reports, charts, and documents"
        showUploadButton={true}
        onUpload={handleUpload}
        onImageUpload={handleImageUpload}
        onImageClick={handleImageClick}
        onImageDownload={handleImageDownload}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterTags={filterTags}
        onFilterChange={setFilterTags}
      />

      {/* Quick Actions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-1">
                Need a specific report?
              </h3>
              <p className="text-blue-700">
                Can't find what you're looking for? Request a custom report from your advisor.
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Request Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
