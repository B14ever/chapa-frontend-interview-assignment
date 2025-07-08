import { User, Transaction, PaymentSummary, SystemStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    isActive: true,
    walletBalance: 2500.75,
    joinedAt: '2024-01-15',
    lastLogin: '2024-12-20'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    isActive: true,
    walletBalance: 1800.50,
    joinedAt: '2024-02-10',
    lastLogin: '2024-12-19'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    isActive: false,
    walletBalance: 150.00,
    joinedAt: '2024-03-05',
    lastLogin: '2024-12-15'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'admin',
    isActive: true,
    walletBalance: 0,
    joinedAt: '2024-01-01',
    lastLogin: '2024-12-20'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'admin',
    isActive: true,
    walletBalance: 0,
    joinedAt: '2024-01-01',
    lastLogin: '2024-12-18'
  },
  {
    id: '6',
    name: 'Admin User',
    email: 'admin@chapa.com',
    role: 'super_admin',
    isActive: true,
    walletBalance: 0,
    joinedAt: '2023-12-01',
    lastLogin: '2024-12-20'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'credit',
    amount: 500.00,
    description: 'Payment received from Alice',
    status: 'completed',
    createdAt: '2024-12-20T10:30:00Z',
    recipient: 'Alice Johnson'
  },
  {
    id: '2',
    userId: '1',
    type: 'debit',
    amount: 150.25,
    description: 'Payment to Bob Store',
    status: 'completed',
    createdAt: '2024-12-19T14:15:00Z',
    recipient: 'Bob Store'
  },
  {
    id: '3',
    userId: '1',
    type: 'credit',
    amount: 1200.50,
    description: 'Salary deposit',
    status: 'completed',
    createdAt: '2024-12-18T09:00:00Z'
  },
  {
    id: '4',
    userId: '2',
    type: 'debit',
    amount: 75.00,
    description: 'Grocery payment',
    status: 'completed',
    createdAt: '2024-12-17T16:45:00Z',
    recipient: 'Fresh Market'
  },
  {
    id: '5',
    userId: '2',
    type: 'credit',
    amount: 800.00,
    description: 'Freelance payment',
    status: 'pending',
    createdAt: '2024-12-16T11:20:00Z'
  }
];

export const mockPaymentSummaries: PaymentSummary[] = [
  {
    userId: '1',
    userName: 'John Doe',
    totalAmount: 1550.25,
    transactionCount: 3,
    lastPayment: '2024-12-20'
  },
  {
    userId: '2',
    userName: 'Jane Smith',
    totalAmount: 875.00,
    transactionCount: 2,
    lastPayment: '2024-12-17'
  },
  {
    userId: '3',
    userName: 'Mike Johnson',
    totalAmount: 350.00,
    transactionCount: 1,
    lastPayment: '2024-12-10'
  }
];

export const mockSystemStats: SystemStats = {
  totalPayments: 2775.25,
  activeUsers: 3,
  totalAdmins: 2,
  monthlyRevenue: 15420.75,
  successRate: 98.5
};

export const mockCredentials = {
  'john@example.com': { password: 'user123', userId: '1' },
  'jane@example.com': { password: 'user123', userId: '2' },
  'mike@example.com': { password: 'user123', userId: '3' },
  'sarah@example.com': { password: 'admin123', userId: '4' },
  'david@example.com': { password: 'admin123', userId: '5' },
  'admin@chapa.com': { password: 'super123', userId: '6' }
};