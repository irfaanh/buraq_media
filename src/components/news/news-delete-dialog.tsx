"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { FC } from "react";
import { News } from "@prisma/client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteNews } from "../../actions/news-actions";
import { useRouter } from "next/navigation";

export const NewsDeleteDialog: FC<{
  news: News,
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ news, open, setOpen }) => {

  const router = useRouter()
  const handleDelete = async () => {
    try {
      await deleteNews({ id: news.id });
      toast.success(`News "${news.title}" deleted.`)
      setOpen(!open)
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete news.")
      console.log(error, "Error on deleting news");
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold">{news.title}</span> news
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

