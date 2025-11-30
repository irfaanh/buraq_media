import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// Expense type - Note: Expense model doesn't exist in Prisma schema yet
export type Expense = {
  id: string;
  category: Category;
  // Add other expense fields as needed
};

export interface ExpenseFormProps {
  expense?: Expense;
  open?: boolean;
  openChange?: (open: boolean) => void;
}

export interface ExpenseTableProps {
  columns: ColumnDef<Expense>[];
  data: Expense[];
}



