import React, { useState } from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { ExpensesChart } from "@/components/ExpensesChart";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { DashboardSummary } from "@/components/DashboardSummary";
import { Transaction, Budget } from "@/types/types";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetComparison } from "@/components/BudgetComparison";
import { SpendingInsights } from "@/components/SpendingInsights";
import { nanoid } from "nanoid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(
    null
  );
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const { toast } = useToast();

  const handleSubmit = (data: Omit<Transaction, "id">) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id
            ? { ...data, id: editingTransaction.id }
            : t
        )
      );
      setEditingTransaction(null);
      toast({
        title: "Transaction updated",
        description: "Your transaction has been successfully updated.",
      });
    } else {
      setTransactions([...transactions, { ...data, id: nanoid() }]);
      toast({
        title: "Transaction added",
        description: "Your transaction has been successfully added.",
      });
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast({
      title: "Transaction deleted",
      description: "Your transaction has been successfully deleted.",
    });
  };

  const handleBudgetSubmit = (data: Budget) => {
    const existingBudgetIndex = budgets.findIndex(b => b.category === data.category);
    
    if (existingBudgetIndex >= 0) {
      setBudgets(budgets.map((b, i) => 
        i === existingBudgetIndex ? data : b
      ));
    } else {
      setBudgets([...budgets, data]);
    }
    
    toast({
      title: "Budget updated",
      description: `Budget for ${data.category} has been set to $${data.amount}`,
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Personal Finance Tracker
      </h1>

      <DashboardSummary transactions={transactions} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {editingTransaction ? "Edit" : "Add"} Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm
              onSubmit={handleSubmit}
              initialData={editingTransaction || undefined}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart transactions={transactions} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpensesChart transactions={transactions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Set Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetForm onSubmit={handleBudgetSubmit} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetComparison budgets={budgets} transactions={transactions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SpendingInsights 
          transactions={transactions} 
          budgets={budgets}
        />
      </div>
    </div>
  );
};

export default Index;
