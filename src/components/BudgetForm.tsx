import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Budget } from "@/types/types";

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Bills & Utilities",
  "Entertainment",
  "Healthcare",
  "Other"
] as const;

const budgetFormSchema = z.object({
  category: z.enum(categories, {
    required_error: "Please select a category",
  }),
  amount: z.number().min(0, "Amount must be positive")
});

type BudgetFormData = z.infer<typeof budgetFormSchema>;

interface BudgetFormProps {
  onSubmit: (data: Budget) => void;
  initialData?: Budget;
}

export function BudgetForm({ onSubmit, initialData }: BudgetFormProps) {
  const form = useForm<BudgetFormData>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      category: initialData?.category || categories[0],
      amount: initialData?.amount || 0
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter budget amount"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                  value={field.value === 0 ? '' : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Update" : "Set"} Budget
        </Button>
      </form>
    </Form>
  );
}