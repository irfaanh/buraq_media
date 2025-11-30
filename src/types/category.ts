import { Category as PrismaCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type Category = PrismaCategory;

export interface CategoryFormProps {
  category?: Category;
  open?: boolean;
  openChange?: (open: boolean) => void;
}

export interface CategoryTableProps {
  columns: ColumnDef<Category>[];
  data: Category[];
}



