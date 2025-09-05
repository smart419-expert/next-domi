import axios from 'axios';
import { Client, Message, Transaction, File, Notification, PaymentInfo } from '@/types';

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  sendMagicLink: async (email: string) => {
    const response = await api.post('/auth/magic-link', { email });
    return response.data;
  },

  verifyMagicLink: async (token: string) => {
    const response = await api.post('/auth/verify-magic-link', { token });
    return response.data;
  },

  sendWhatsAppInvite: async (phoneNumber: string) => {
    const response = await api.post('/auth/whatsapp-invite', { phoneNumber });
    return response.data;
  },
};

// Clients API
export const clientsApi = {
  getAll: async (): Promise<{ clients: Client[] }> => {
    const response = await api.get('/clients');
    return response.data;
  },

  getById: async (id: string): Promise<Client> => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  updateBalance: async (id: string, balance: number, reason: string) => {
    const response = await api.put(`/clients/${id}/balance`, { balance, reason });
    return response.data;
  },
};

// Messages API
export const messagesApi = {
  getByClientId: async (clientId: string): Promise<{ messages: Message[] }> => {
    const response = await api.get(`/clients/${clientId}/messages`);
    return response.data;
  },

  sendMessage: async (clientId: string, content: string) => {
    const response = await api.post(`/clients/${clientId}/messages`, { content });
    return response.data;
  },
};

// Files API
export const filesApi = {
  getByClientId: async (clientId: string): Promise<{ files: File[] }> => {
    const response = await api.get(`/clients/${clientId}/files`);
    return response.data;
  },

  uploadFile: async (clientId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    
    const response = await api.post(`/clients/${clientId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteFile: async (clientId: string, fileId: string) => {
    const response = await api.delete(`/clients/${clientId}/files/${fileId}`);
    return response.data;
  },
};

// Transactions API
export const transactionsApi = {
  getByClientId: async (clientId: string): Promise<{ transactions: Transaction[] }> => {
    const response = await api.get(`/clients/${clientId}/transactions`);
    return response.data;
  },
};

// Payments API
export const paymentsApi = {
  createPayPalOrder: async (amount: number, clientId: string, description: string) => {
    const response = await api.post('/payments/paypal/create-order', {
      amount,
      clientId,
      description,
    });
    return response.data;
  },

  capturePayPalOrder: async (orderId: string) => {
    const response = await api.post('/payments/paypal/capture-order', { orderId });
    return response.data;
  },

  generateQRCode: async (method: string, amount: number): Promise<{
    success: boolean;
    qrCode: string;
    paymentInfo: PaymentInfo;
  }> => {
    const response = await api.get(`/payments/qr/${method}?amount=${amount}`);
    return response.data;
  },
};

// Notifications API
export const notificationsApi = {
  getAll: async (): Promise<{ notifications: Notification[] }> => {
    const response = await api.get('/notifications');
    return response.data;
  },

  markAsRead: async (notificationId: string) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  },
};

// Mock data generators for development
export const mockData = {
  generateClient: (overrides: Partial<Client> = {}): Client => ({
    id: Math.random().toString(36).substr(2, 9),
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    balance: 100.00,
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    ...overrides,
  }),

  generateMessage: (overrides: Partial<Message> = {}): Message => ({
    id: Math.random().toString(36).substr(2, 9),
    content: 'Hello, how can I help you?',
    sender: 'admin',
    timestamp: new Date().toISOString(),
    read: false,
    ...overrides,
  }),

  generateTransaction: (overrides: Partial<Transaction> = {}): Transaction => ({
    id: Math.random().toString(36).substr(2, 9),
    amount: 50.00,
    type: 'credit',
    reason: 'Payment received',
    timestamp: new Date().toISOString(),
    status: 'completed',
    ...overrides,
  }),
};

export default api;
