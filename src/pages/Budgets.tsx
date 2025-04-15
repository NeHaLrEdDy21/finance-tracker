import React from "react";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetComparison } from "@/components/BudgetComparison";
import { SpendingInsights } from "@/components/SpendingInsights";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Budgets() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Budget Management</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Set Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetForm onSubmit={(data) => console.log(data)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetComparison budgets={[]} transactions={[]} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Spending Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <SpendingInsights budgets={[]} transactions={[]} />
        </CardContent>
      </Card>
    </div>
  );
}