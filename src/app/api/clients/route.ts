import { NextRequest, NextResponse } from 'next/server';

// Mock client data
const mockClients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    currentBalance: 2450.50,
    lastActive: '2024-01-15T10:30:00Z',
    status: 'active',
    joinDate: '2023-06-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    currentBalance: 1890.25,
    lastActive: '2024-01-14T16:45:00Z',
    status: 'active',
    joinDate: '2023-08-22T00:00:00Z',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mike.brown@email.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    currentBalance: 3200.75,
    lastActive: '2024-01-13T09:15:00Z',
    status: 'active',
    joinDate: '2023-04-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    currentBalance: 1560.00,
    lastActive: '2024-01-12T14:20:00Z',
    status: 'inactive',
    joinDate: '2023-09-05T00:00:00Z',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+1 (555) 567-8901',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    currentBalance: 4200.30,
    lastActive: '2024-01-15T11:00:00Z',
    status: 'active',
    joinDate: '2023-03-18T00:00:00Z',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 678-9012',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    currentBalance: 980.45,
    lastActive: '2024-01-11T08:30:00Z',
    status: 'active',
    joinDate: '2023-11-12T00:00:00Z',
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert.taylor@email.com',
    phone: '+1 (555) 789-0123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
    currentBalance: 2750.80,
    lastActive: '2024-01-10T15:45:00Z',
    status: 'active',
    joinDate: '2023-07-30T00:00:00Z',
  },
  {
    id: '8',
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@email.com',
    phone: '+1 (555) 890-1234',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer',
    currentBalance: 1890.25,
    lastActive: '2024-01-09T12:15:00Z',
    status: 'inactive',
    joinDate: '2023-05-14T00:00:00Z',
  },
  {
    id: '9',
    name: 'Christopher Lee',
    email: 'chris.lee@email.com',
    phone: '+1 (555) 901-2345',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chris',
    currentBalance: 3500.60,
    lastActive: '2024-01-15T13:30:00Z',
    status: 'active',
    joinDate: '2023-02-28T00:00:00Z',
  },
  {
    id: '10',
    name: 'Amanda White',
    email: 'amanda.white@email.com',
    phone: '+1 (555) 012-3456',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amanda',
    currentBalance: 2100.15,
    lastActive: '2024-01-14T17:20:00Z',
    status: 'active',
    joinDate: '2023-10-08T00:00:00Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const status = searchParams.get('status') || '';

    // Filter clients based on search
    let filteredClients = mockClients;
    
    if (search) {
      filteredClients = mockClients.filter(client =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.phone.includes(search)
      );
    }

    // Filter by status
    if (status) {
      filteredClients = filteredClients.filter(client => client.status === status);
    }

    // Sort clients
    filteredClients.sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a];
      let bValue = b[sortBy as keyof typeof b];

      if (sortBy === 'currentBalance') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Calculate pagination
    const total = filteredClients.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      data: paginatedClients,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      filters: {
        search,
        sortBy,
        sortOrder,
        status,
      },
    });
  } catch (error) {
    console.error('Clients API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}