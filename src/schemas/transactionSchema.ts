
import * as z from "zod";
import { Category } from "@/types/types";

const categories: Category[] = [
  "Food & Dining",
  "Transportation", 
  "Shopping",
  "Bills & Utilities", 
  "Entertainment", 
  "Healthcare", 
  "Other"
];

export const transactionSchema = z.object({
  amount: z.number()
    .min(0.01, { message: "Amount must be greater than zero" })
    .max(1000000, { message: "Amount is too large" }),
  date: z.string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      }, 
      { message: "Invalid date format" }
    ),
  description: z.string()
    .min(1, { message: "Description is required" })
    .max(200, { message: "Description is too long" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Invalid category selected" })
  })
});

// Type for creating a new transaction (without ID)
export type NewTransaction = z.infer<typeof transactionSchema>;

// Type for existing transaction (with ID)
export type ExistingTransaction = NewTransaction & {
  id: string;
};

