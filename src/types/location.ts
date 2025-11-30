import { Location as PrismaLocation } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type Location = PrismaLocation;

export interface LocationFormProps {
  location?: Location;
  open?: boolean;
  openChange?: (open: boolean) => void;
}

export interface LocationTableProps {
  columns: ColumnDef<Location>[];
  data: Location[];
}




