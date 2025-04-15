import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction, Budget } from "@/types/types";
import { Progress } from "@/components/ui/progress";

interface SpendingInsightsProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export function SpendingInsights({ transactions, budgets }: SpendingInsightsProps) {
  // Get current month's data
  const currentDate = new Date();
  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentDate.getMonth() && 
           date.getFullYear() === currentDate.getFullYear();
  });

  // Calculate insights
  const insights = budgets.map(budget => {
    const spent = currentMonthTransactions
      .filter(t => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const percentUsed = Math.min((spent / budget.amount) * 100, 100);
    const remaining = Math.max(budget.amount - spent, 0);
    const status = percentUsed >= 90 ? "danger" : percentUsed >= 75 ? "warning" : "success";

    return {
      category: budget.category,
      spent,
      remaining,
      percentUsed,
      status
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.category} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{insight.category}</span>
              <span className={`font-medium ${
                insight.status === "danger" ? "text-red-500" :
                insight.status === "warning" ? "text-yellow-500" :
                "text-green-500"
              }`}>
                ${insight.spent.toFixed(2)} / ${(insight.spent + insight.remaining).toFixed(2)}
              </span>
            </div>
            <Progress 
              value={insight.percentUsed} 
              className={`${
                insight.status === "danger" ? "bg-red-200" :
                insight.status === "warning" ? "bg-yellow-200" :
                "bg-green-200"
              }`}
            />
            <p className="text-xs text-muted-foreground">
              ${insight.remaining.toFixed(2)} remaining
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}