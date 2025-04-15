export type Category = 
  | "Food & Dining"
  | "Transportation"
  | "Shopping"
  | "Bills & Utilities"
  | "Entertainment"
  | "Healthcare"
  | "Other";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: Category;
}

export interface Budget {
  category: Category;
  amount: number;
}
