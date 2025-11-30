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
import { newsSchema } from "../../schemas/news-schema";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { DialogClose } from "../ui/dialog";
import { createNews, updateNews } from "../../actions/news-actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useEffect, useState } from "react";
import { NewsFormProps } from "../../types/news";
import { getAllLocations } from "../../actions/location-actions";
import { getAllCategories } from "../../actions/category-actions";
import { Textarea } from "../../components/ui/textarea";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "../../components/ui/checkbox";

export const NewsFormDialog = ({
  news,
  open,
  openChange,
}: NewsFormProps) => {

  const { execute: createNewsAction, isExecuting: isCreating, result: createResult } = useAction(createNews);
  const { execute: updateNewsAction, isExecuting: isUpdating, result: updateResult } = useAction(updateNews);

  const [locationList, setLocationList] = useState<{ name: string; id: string; }[]>([]);
  const [categoryList, setCategoryList] = useState<{ name: string; id: string; }[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const locations = await getAllLocations();
      setLocationList(locations.map((l) => ({ id: l.id, name: l.name })));
      const categories = await getAllCategories();
      setCategoryList(categories.map((c) => ({ id: c.id, name: c.name })));
    };
    fetchOptions();
  }, []);

  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(news?.image || null);

  const form = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: news?.title || "",
      content: news?.content || "",
      date: news?.date ? new Date(news.date) : new Date(),
      image: news?.image || "",
      link: news?.link || "",
      whatsappLink: news?.whatsappLink || "",
      contactPhone: news?.contactPhone || "",
      contactWhatsApp: news?.contactWhatsApp || "",
      special: news?.special || false,
      locationId: news?.locationId || "",
      categoryId: news?.categoryId || "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload image');
      }

      const data = await response.json();
      form.setValue('image', data.url);
      setPreviewImage(data.url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    form.setValue('image', '');
    setPreviewImage(null);
  };

  const handleSubmit = async (
    data: z.infer<typeof newsSchema>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _close: () => void,
  ) => {
    if (news) {
      await updateNewsAction({ id: news.id, ...data });
    } else {
      await createNewsAction(data);
    }
  };

  // Handle update results
  useEffect(() => {
    if (!updateResult) return;
    
    if (updateResult.serverError) {
      toast.error(updateResult.serverError);
    } else if (updateResult.data) {
      toast.success("News updated successfully");
      form.reset();
      if (openChange) openChange(false);
    }
  }, [updateResult, openChange, form]);

  // Handle create results
  useEffect(() => {
    if (!createResult) return;
    
    if (createResult.serverError) {
      toast.error(createResult.serverError);
    } else if (createResult.data) {
      toast.success("News created successfully");
      form.reset();
      if (openChange) openChange(false);
    }
  }, [createResult, openChange, form]);

  return (
    <FormDialog open={open} openChange={openChange} form={form} onSubmit={handleSubmit}>
      <FormDialogTrigger asChild>
        <Button>
          <Plus className="size-4 mr-2" />
          New News
        </Button>
      </FormDialogTrigger>

      <FormDialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <FormDialogHeader>
          <FormDialogTitle>{news ? "Edit News" : "New News"}</FormDialogTitle>
          <FormDialogDescription>
            Fill out the news details. Click save when you&apos;re done.
          </FormDialogDescription>
        </FormDialogHeader>

        <div className="grid gap-4 py-4">

        <div className="grid grid-cols-2 gap-4">
          {/* Location */}
          <FormField control={form.control} name="locationId" render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select Location" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locationList.map(location => (
                    <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          {/* Category */}
          <FormField control={form.control} name="categoryId" render={({ field }) => (
            <FormItem>
              <FormLabel>Category (optional)</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(value === "none" ? "" : value)} 
                value={field.value || "none"}
              >
                <FormControl>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select Category" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryList.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="News Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="News content..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image (optional)</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {previewImage ? (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Button
                            type="button"
                            variant="outline"
                            disabled={uploading}
                            className="w-full"
                            asChild
                          >
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              {uploading ? "Uploading..." : "Upload Image"}
                            </span>
                          </Button>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                    <input type="hidden" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Link */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Link (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.example.com/article" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* WhatsApp Link */}
          <FormField
            control={form.control}
            name="whatsappLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Group Link (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://chat.whatsapp.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Phone */}
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="9846716777" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact WhatsApp */}
          <FormField
            control={form.control}
            name="contactWhatsApp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact WhatsApp (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="wa.me/918086115777" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Special News Checkbox */}
          <FormField
            control={form.control}
            name="special"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Mark as Special News
                  </FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Special news will appear in the Special News card on the right sidebar
                  </p>
                </div>
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

