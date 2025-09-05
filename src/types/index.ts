export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export interface File {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'admin' | 'client';
  timestamp: string;
  read: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  reason: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  type: 'message' | 'file_upload' | 'payment';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

export interface PaymentInfo {
  account: string;
  amount: number;
  reference: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
