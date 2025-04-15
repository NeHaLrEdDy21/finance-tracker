import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpensesChart } from "@/components/ExpensesChart";

export default function Analysis() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Spending Analysis</h1>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpensesChart transactions={[]} />
        </CardContent>
      </Card>
    </div>
  );
}