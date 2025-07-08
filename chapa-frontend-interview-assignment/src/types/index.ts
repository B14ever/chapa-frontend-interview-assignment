export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
  isActive: boolean;
  walletBalance: number;
  joinedAt: string;
  lastLogin: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  recipient?: string;
}

export interface PaymentSummary {
  userId: string;
  userName: string;
  totalAmount: number;
  transactionCount: number;
  lastPayment: string;
}

export interface SystemStats {
  totalPayments: number;
  activeUsers: number;
  totalAdmins: number;
  monthlyRevenue: number;
  successRate: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface AppContextType {
  users: User[];
  transactions: Transaction[];
  paymentSummaries: PaymentSummary[];
  systemStats: SystemStats;
  updateUser: (user: User) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  addAdmin: (user: Omit<User, 'id' | 'joinedAt' | 'lastLogin'>) => void;
  removeAdmin: (userId: string) => void;
  refreshData: () => void;
}