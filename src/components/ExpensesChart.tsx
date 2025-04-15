import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Transaction } from "@/types/types";

interface ExpensesChartProps {
  transactions: Transaction[];
}

export function ExpensesChart({ transactions }: ExpensesChartProps) {
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    const existingMonth = acc.find(item => item.month === monthYear);
    if (existingMonth) {
      existingMonth[transaction.category] = (existingMonth[transaction.category] || 0) + transaction.amount;
      existingMonth.total += transaction.amount;
    } else {
      const newMonth = {
        month: monthYear,
        total: transaction.amount,
        [transaction.category]: transaction.amount,
      };
      acc.push(newMonth);
    }
    
    return acc;
  }, []);

  // Get unique categories from transactions
  const categories = [...new Set(transactions.map(t => t.category))];

  // Custom colors for each category
  const categoryColors = {
    "Food & Dining": "#FF6B6B",
    "Transportation": "#4ECDC4",
    "Shopping": "#45B7D1",
    "Bills & Utilities": "#96CEB4",
    "Entertainment": "#FFEEAD",
    "Healthcare": "#D4A5A5",
    "Other": "#9A9EAB"
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Legend />
          {categories.map((category) => (
            <Bar 
              key={category}
              dataKey={category}
              stackId="a"
              fill={categoryColors[category as keyof typeof categoryColors] || "#8884d8"}
              name={category}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
