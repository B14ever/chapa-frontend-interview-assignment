import { mockCredentials, mockPaymentSummaries, mockSystemStats, mockTransactions, mockUsers } from "../data/mockData";
import type { PaymentSummary, SystemStats, Transaction, User } from "../types";


// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Authentication
  login: async (email: string, password: string): Promise<User | null> => {
    await delay(1000);
    const credentials = mockCredentials[email as keyof typeof mockCredentials];
    if (credentials && credentials.password === password) {
      const user = mockUsers.find(u => u.id === credentials.userId);
      return user || null;
    }
    return null;
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    await delay(500);
    return [...mockUsers];
  },

  updateUser: async (user: User): Promise<User> => {
    await delay(300);
    const index = mockUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      mockUsers[index] = user;
    }
    return user;
  },

  addUser: async (user: Omit<User, 'id' | 'joinedAt' | 'lastLogin'>): Promise<User> => {
    await delay(500);
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0]
    };
    mockUsers.push(newUser);
    return newUser;
  },

  removeUser: async (userId: string): Promise<void> => {
    await delay(300);
    const index = mockUsers.findIndex(u => u.id === userId);
    if (index !== -1) {
      mockUsers.splice(index, 1);
    }
  },

  // Transactions
  getTransactions: async (userId?: string): Promise<Transaction[]> => {
    await delay(500);
    if (userId) {
      return mockTransactions.filter(t => t.userId === userId);
    }
    return [...mockTransactions];
  },

  addTransaction: async (transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> => {
    await delay(800);
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    mockTransactions.unshift(newTransaction);
    
    // Update user wallet balance
    const user = mockUsers.find(u => u.id === transaction.userId);
    if (user) {
      if (transaction.type === 'credit') {
        user.walletBalance += transaction.amount;
      } else {
        user.walletBalance -= transaction.amount;
      }
    }
    
    return newTransaction;
  },

  // Payment summaries
  getPaymentSummaries: async (): Promise<PaymentSummary[]> => {
    await delay(500);
    return [...mockPaymentSummaries];
  },

  // System stats
  getSystemStats: async (): Promise<SystemStats> => {
    await delay(300);
    return { ...mockSystemStats };
  }
};