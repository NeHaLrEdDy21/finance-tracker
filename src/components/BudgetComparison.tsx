import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Budget, Transaction } from "@/types/types";

interface BudgetComparisonProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export function BudgetComparison({ budgets, transactions }: BudgetComparisonProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const data = budgets.map(budget => {
    const spent = monthlyTransactions
      .filter(t => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);

    const remaining = Math.max(budget.amount - spent, 0);
    
    return {
      category: budget.category,
      Budget: budget.amount,
      Spent: spent,
      Remaining: remaining
    };
  });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#8884d8" />
          <Bar dataKey="Spent" fill="#82ca9d" />
          <Bar dataKey="Remaining" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}