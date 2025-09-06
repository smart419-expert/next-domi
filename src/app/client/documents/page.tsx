'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function ClientDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Monthly Statement - November 2024',
      type: 'PDF',
      size: '2.4 MB',
      date: '2024-11-30',
      status: 'new',
      category: 'Statements'
    },
    {
      id: 2,
      name: 'Investment Performance Report Q3',
      type: 'PDF',
      size: '1.8 MB',
      date: '2024-10-15',
      status: 'viewed',
      category: 'Reports'
    },
    {
      id: 3,
      name: 'Account Agreement',
      type: 'PDF',
      size: '856 KB',
      date: '2024-09-01',
      status: 'signed',
      category: 'Legal'
    },
    {
      id: 4,
      name: 'Tax Document - 1099',
      type: 'PDF',
      size: '1.2 MB',
      date: '2024-08-20',
      status: 'viewed',
      category: 'Tax'
    },
    {
      id: 5,
      name: 'Portfolio Analysis',
      type: 'PDF',
      size: '3.1 MB',
      date: '2024-07-10',
      status: 'viewed',
      category: 'Reports'
    },
    {
      id: 6,
      name: 'Risk Assessment Form',
      type: 'PDF',
      size: '945 KB',
      date: '2024-06-15',
      status: 'pending',
      category: 'Forms'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'viewed':
        return <Eye className="h-4 w-4 text-green-600" />;
      case 'signed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'viewed':
        return 'Viewed';
      case 'signed':
        return 'Signed';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
        <p className="text-gray-600">
          Access and manage your account documents and reports.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'new' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('new')}
          >
            New
          </Button>
          <Button
            variant={filterStatus === 'viewed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('viewed')}
          >
            Viewed
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      {document.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                      {document.category}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(document.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{document.type}</span>
                  <span>{document.size}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(document.date).toLocaleDateString()}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    document.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
                    document.status === 'viewed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                    document.status === 'signed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                    'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {getStatusText(document.status)}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'No documents match the selected filter.'}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-1">
                  Need a specific document?
                </h3>
                <p className="text-blue-700">
                  Can&apos;t find what you&apos;re looking for? Contact us and we&apos;ll help you locate it.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Request Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}