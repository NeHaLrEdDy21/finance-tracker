
import { useState, useEffect } from 'react';
import { Transaction } from '@/types/types';
import { 
  fetchTransactions, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction 
} from '@/services/transactionService';
import { useToast } from '@/components/ui/use-toast';

export function useMongoTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load transactions on mount
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions();
        setTransactions(data);
        setError(null);
      } catch (err) {
        setError('Failed to load transactions from database');
        toast({
          title: 'Error',
          description: 'Could not load transactions from database',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [toast]);

  // Add a new transaction
  const addTransaction = async (data: Omit<Transaction, 'id'>) => {
    try {
      setLoading(true);
      const newTransaction = await createTransaction(data);
      setTransactions((prev) => [...prev, newTransaction]);
      toast({
        title: 'Transaction added',
        description: 'Your transaction has been successfully added to MongoDB.',
      });
      return newTransaction;
    } catch (err) {
      setError('Failed to add transaction to database');
      toast({
        title: 'Error',
        description: 'Could not add transaction to database',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing transaction
  const editTransaction = async (transaction: Transaction) => {
    try {
      setLoading(true);
      const updatedTransaction = await updateTransaction(transaction);
      setTransactions((prev) =>
        prev.map((t) => (t.id === transaction.id ? updatedTransaction : t))
      );
      toast({
        title: 'Transaction updated',
        description: 'Your transaction has been successfully updated in MongoDB.',
      });
      return updatedTransaction;
    } catch (err) {
      setError('Failed to update transaction in database');
      toast({
        title: 'Error',
        description: 'Could not update transaction in database',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a transaction
  const removeTransaction = async (id: string) => {
    try {
      setLoading(true);
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      toast({
        title: 'Transaction deleted',
        description: 'Your transaction has been successfully deleted from MongoDB.',
      });
    } catch (err) {
      setError('Failed to delete transaction from database');
      toast({
        title: 'Error',
        description: 'Could not delete transaction from database',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    editTransaction,
    removeTransaction,
  };
}
