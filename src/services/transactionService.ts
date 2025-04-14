
import axios from 'axios';
import { Transaction, Category } from '@/types/types';

// API base URL - update this to your actual backend URL
const API_URL = 'http://localhost:5000/api';

// Interface for the transaction data from MongoDB
interface MongoTransaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: Category;
}

// Convert MongoDB transaction to frontend transaction
const mapToTransaction = (data: MongoTransaction): Transaction => ({
  id: data._id,
  amount: data.amount,
  date: data.date,
  description: data.description,
  category: data.category,
});

// Get all transactions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data.map(mapToTransaction);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Create a new transaction
export const createTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return {
      id: response.data.id,
      amount: response.data.amount,
      date: response.data.date,
      description: response.data.description,
      category: response.data.category,
    };
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

// Update an existing transaction
export const updateTransaction = async (transaction: Transaction): Promise<Transaction> => {
  try {
    const { id, ...transactionData } = transaction;
    const response = await axios.put(`${API_URL}/transactions/${id}`, transactionData);
    return {
      id: response.data.id,
      amount: response.data.amount,
      date: response.data.date,
      description: response.data.description,
      category: response.data.category,
    };
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// Delete a transaction
export const deleteTransaction = async (id: string): Promise<string> => {
  try {
    await axios.delete(`${API_URL}/transactions/${id}`);
    return id;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};
