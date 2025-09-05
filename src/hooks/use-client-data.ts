import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
  avatar: string | null;
  updatedAt: string;
  nextUpdate: string;
  lastMessageAt: string;
  lastUploadAt: string;
  unreadMessages: number;
  newUploads: number;
}

interface ClientResponse {
  success: boolean;
  client: ClientData;
}

interface TriggerUpdateResponse {
  success: boolean;
  message: string;
  updatedAt: string;
  nextUpdate: string;
}

export function useClientData(clientId: string, refreshInterval: number = 60000) {
  return useQuery({
    queryKey: ['client', clientId],
    queryFn: async (): Promise<ClientData> => {
      const response = await axios.get<ClientResponse>(`/api/clients/${clientId}`);
      if (!response.data.success) {
        throw new Error('Failed to fetch client data');
      }
      return response.data.client;
    },
    refetchInterval: refreshInterval,
    refetchIntervalInBackground: true,
    staleTime: 30000, // 30 seconds
  });
}

export function useTriggerUpdate(clientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<TriggerUpdateResponse> => {
      const response = await axios.post<TriggerUpdateResponse>(`/api/clients/${clientId}/trigger-update`);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to trigger update');
      }
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch client data
      queryClient.invalidateQueries({ queryKey: ['client', clientId] });
      
      // Show success toast
      toast.success('Update requested successfully', {
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to trigger update', {
        duration: 4000,
      });
    },
  });
}

export function useClientMessages(clientId: string, refreshInterval: number = 30000) {
  return useQuery({
    queryKey: ['client-messages', clientId],
    queryFn: async () => {
      // Mock messages data
      return [
        {
          id: 'msg-1',
          content: 'Hello! How can I help you today?',
          sender: 'admin' as const,
          timestamp: '2024-01-15T10:30:00Z',
          read: true,
        },
        {
          id: 'msg-2',
          content: 'I need help with my account balance',
          sender: 'client' as const,
          timestamp: '2024-01-15T10:32:00Z',
          read: true,
        },
        {
          id: 'msg-3',
          content: 'I can help you with that. Your current balance is $150.00. Is there anything specific you\'d like to know?',
          sender: 'admin' as const,
          timestamp: '2024-01-15T10:35:00Z',
          read: true,
        },
      ];
    },
    refetchInterval: refreshInterval,
    refetchIntervalInBackground: true,
    staleTime: 15000, // 15 seconds
  });
}

export function useClientUploads(clientId: string, refreshInterval: number = 45000) {
  return useQuery({
    queryKey: ['client-uploads', clientId],
    queryFn: async () => {
      // Mock uploads data
      return [
        {
          id: 'file-1',
          name: 'invoice-january.pdf',
          url: '/uploads/file-1.pdf',
          type: 'application/pdf',
          size: 1024000,
          uploadedAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
        },
        {
          id: 'file-2',
          name: 'chart-analysis.png',
          url: '/uploads/file-2.png',
          type: 'image/png',
          size: 512000,
          uploadedAt: '2024-01-14T15:45:00Z',
          updatedAt: '2024-01-14T15:45:00Z',
        },
      ];
    },
    refetchInterval: refreshInterval,
    refetchIntervalInBackground: true,
    staleTime: 20000, // 20 seconds
  });
}
