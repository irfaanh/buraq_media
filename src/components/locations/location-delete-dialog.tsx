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
import { Location } from "@prisma/client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteLocation } from "../../actions/location-actions";
import { useRouter } from "next/navigation";

export const LocationDeleteDialog: FC<{
  location: Location,
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ location, open, setOpen }) => {

  const router = useRouter()
  const handleDelete = async () => {
    try {
      await deleteLocation({ id: location.id });
      toast.success(`Location "${location.name}" deleted.`)
      setOpen(!open)
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete location.")
      console.log(error, "Error on deleting location");
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold">{location.name}</span> location.
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

