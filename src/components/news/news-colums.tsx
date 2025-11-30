"use client";
import { News } from "../../types/news";
import { NewsFormDialog } from "./news-form";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit2,
  Trash2,
  Share2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { NewsDeleteDialog } from "./news-delete-dialog";
import { NewsShareDialog } from "./news-share-dialog";
import { useState } from "react";
import { formatDate } from "../../lib/utils";

export const newsColumns: ColumnDef<News>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      const sort = column.getIsSorted();
      const renderIcon = () => {
        if (!sort) return <ArrowUpDown className="size-4" />;
        if (sort === "asc") return <ArrowUp className="size-4" />;
        if (sort === "desc") return <ArrowDown className="size-4" />;
        return null;
      };

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sort === "asc")}
        >
          Title
          {renderIcon()}
        </Button>
      );
    },
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue('title') as string}</div>,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const content = row.getValue("content");
      return (
        <div className="max-w-[400px]">
          {content ? (
            <span className="truncate block" title={String(content)}>
              {String(content).substring(0, 100)}
              {String(content).length > 100 ? "..." : ""}
            </span>
          ) : (
            "..."
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.original.location;
      return (
        <div>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium bg-green-100 text-green-800">
            {location?.name || "-"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string | Date;
      return (
        <div>
          {date ? formatDate(date) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.getValue("link") as string | null;
      return (
        <div>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View
            </a>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) =>
      row.original && <NewsActions news={row.original} />,
  },
];

export const NewsActions = ({ news }: { news: News }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpenShare(true)}
        className="h-8 w-8 p-0"
        title="Share"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpenEdit(true)}
        className="h-8 w-8 p-0"
        title="Edit"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpenDelete(true)}
        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {/* Share Dialog */}
      <NewsShareDialog
        news={news}
        open={openShare}
        setOpen={setOpenShare}
      />

      {/* Edit Dialog */}
      <NewsFormDialog open={openEdit} openChange={setOpenEdit} news={news} />

      {/* Delete Dialog */}
      <NewsDeleteDialog
        news={news}
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </div>
  );
};

