'use client';

import { ImageGallery, ImageItem } from '@/components/ImageGallery';

// Example usage of ImageGallery component
export function ImageGalleryExamples() {
  // Example 1: Basic Image Gallery
  const basicImages: ImageItem[] = [
    {
      id: '1',
      url: '/api/placeholder/400/300',
      title: 'Portfolio Performance Chart',
      description: 'Monthly performance visualization',
      uploadDate: new Date('2024-10-15'),
      size: '1024000', // 1 MB
      type: 'image',
      tags: ['Performance', 'Chart']
    },
    {
      id: '2',
      url: '/api/placeholder/400/300',
      title: 'Asset Allocation Report',
      description: 'Current asset distribution analysis',
      uploadDate: new Date('2024-10-10'),
      size: '2048000', // 2 MB
      type: 'pdf',
      tags: ['Allocation', 'Report']
    },
    {
      id: '3',
      url: '/api/placeholder/400/300',
      title: 'Market Analysis',
      description: 'Q3 2024 market trends and insights',
      uploadDate: new Date('2024-10-05'),
      size: '1536000', // 1.5 MB
      type: 'pdf',
      tags: ['Analysis', 'Market']
    }
  ];

  // Example 2: Empty Gallery
  const emptyImages: ImageItem[] = [];

  // Example 3: Large Gallery with Many Images
  const largeGalleryImages: ImageItem[] = Array.from({ length: 12 }, (_, i) => ({
    id: `large-${i + 1}`,
    url: `/api/placeholder/400/300?text=Image+${i + 1}`,
    title: `Document ${i + 1}`,
    description: `This is document number ${i + 1} with some description`,
    uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
    size: `${Math.floor(Math.random() * 2000000 + 100000)}`, // Random size between 100KB and 2MB
    type: Math.random() > 0.5 ? 'image' : 'pdf',
    tags: ['Sample', 'Document', `Category${i % 3 + 1}`]
  }));

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-900">ImageGallery Examples</h1>
      
      {/* Basic Gallery */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Basic Image Gallery</h2>
        <ImageGallery
          images={basicImages}
          title="Sample Reports"
          description="A basic image gallery with a few documents"
          onUpload={() => console.log('Upload clicked')}
          onImageClick={(image) => console.log('Image clicked:', image.title)}
          onImageDownload={(image) => console.log('Download clicked:', image.title)}
        />
      </div>

      {/* Empty Gallery */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Empty Gallery</h2>
        <ImageGallery
          images={emptyImages}
          title="No Images Yet"
          description="This gallery has no images to display"
          onUpload={() => console.log('Upload clicked')}
        />
      </div>

      {/* Large Gallery with Search and Filters */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Large Gallery with Search & Filters</h2>
        <ImageGallery
          images={largeGalleryImages}
          title="Document Library"
          description="A large collection of documents with search and filtering"
          onUpload={() => console.log('Upload clicked')}
          onImageClick={(image) => console.log('Image clicked:', image.title)}
          onImageDownload={(image) => console.log('Download clicked:', image.title)}
          viewMode="grid"
          onViewModeChange={(mode) => console.log('View mode changed to:', mode)}
          searchTerm=""
          onSearchChange={(term) => console.log('Search term:', term)}
          filterTags={[]}
          onFilterChange={(tags) => console.log('Filter tags:', tags)}
        />
      </div>
    </div>
  );
}
