import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AppContextType, PaymentSummary, SystemStats, Transaction, User } from "../types";
import { mockApi } from "../service/mockApi";


const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentSummaries, setPaymentSummaries] = useState<PaymentSummary[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalPayments: 0,
    activeUsers: 0,
    totalAdmins: 0,
    monthlyRevenue: 0,
    successRate: 0
  });

  const refreshData = async () => {
    try {
      const [usersData, transactionsData, paymentSummariesData, systemStatsData] = await Promise.all([
        mockApi.getUsers(),
        mockApi.getTransactions(),
        mockApi.getPaymentSummaries(),
        mockApi.getSystemStats()
      ]);

      setUsers(usersData);
      setTransactions(transactionsData);
      setPaymentSummaries(paymentSummariesData);
      setSystemStats(systemStatsData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const updateUser = async (user: User) => {
    try {
      const updatedUser = await mockApi.updateUser(user);
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    try {
      const newTransaction = await mockApi.addTransaction(transaction);
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Update user wallet balance in local state
      if (transaction.type === 'credit') {
        setUsers(prev => prev.map(u => 
          u.id === transaction.userId 
            ? { ...u, walletBalance: u.walletBalance + transaction.amount }
            : u
        ));
      } else {
        setUsers(prev => prev.map(u => 
          u.id === transaction.userId 
            ? { ...u, walletBalance: u.walletBalance - transaction.amount }
            : u
        ));
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const addAdmin = async (user: Omit<User, 'id' | 'joinedAt' | 'lastLogin'>) => {
    try {
      const newAdmin = await mockApi.addUser(user);
      setUsers(prev => [...prev, newAdmin]);
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const removeAdmin = async (userId: string) => {
    try {
      await mockApi.removeUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Error removing admin:', error);
    }
  };

  const value: AppContextType = {
    users,
    transactions,
    paymentSummaries,
    systemStats,
    updateUser,
    addTransaction,
    addAdmin,
    removeAdmin,
    refreshData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};