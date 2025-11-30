"use client";

import {
  FormDialog,
  FormDialogContent,
  FormDialogDescription,
  FormDialogFooter,
  FormDialogHeader,
  FormDialogTitle,
  FormDialogTrigger,
    } from "../../components/common/form-dialog";
import { locationSchema } from "../../schemas/location-schema";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "../ui/dialog";
import { createLocation, updateLocation } from "../../actions/location-actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { LocationFormProps } from "../../types/location";

export const LocationFormDialog = ({
  location,
  open,
  openChange,
}: LocationFormProps) => {

  const { execute: createLocationAction, isExecuting: isCreating } = useAction(createLocation);
  const { execute: updateLocationAction, isExecuting: isUpdating } = useAction(updateLocation);

  const form = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: location?.name || "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof locationSchema>,
    close: () => void,
  ) => {
    if (location) {
      await updateLocationAction({ id: location.id, ...data });
      toast.success("Location updated successfully");
    } else {
      await createLocationAction(data);
      toast.success("Location created successfully");
    }
    close();
  };

  return (
    <FormDialog open={open} openChange={openChange} form={form} onSubmit={handleSubmit}>
      <FormDialogTrigger asChild>
        <Button>
          <Plus className="size-4 mr-2" />
          New Location
        </Button>
      </FormDialogTrigger>

      <FormDialogContent className="sm:max-w-sm">
        <FormDialogHeader>
          <FormDialogTitle>{location ? "Edit Location" : "New Location"}</FormDialogTitle>
          <FormDialogDescription>
            Fill out the location details. Click save when youre done.
          </FormDialogDescription>
        </FormDialogHeader>

        <div className="grid gap-4 py-4">
          {/* Location Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Koodathai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormDialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isCreating || isUpdating}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? "Saving..." : "Save"}
          </Button>
        </FormDialogFooter>
      </FormDialogContent>
    </FormDialog>
  );
};

