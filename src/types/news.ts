import { News as PrismaNews, Location, Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type News = PrismaNews & {
  location?: Location;
  category?: Category | null;
  image?: string | null;
};

export interface NewsFormProps {
  news?: News;
  open?: boolean;
  openChange?: (open: boolean) => void;
}

export interface NewsTableProps {
  columns: ColumnDef<News>[];
  data: News[];
}

