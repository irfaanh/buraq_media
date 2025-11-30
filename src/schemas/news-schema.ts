import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  date: z.coerce.date(),
  image: z.string().url().optional().or(z.literal("")),
  link: z.union([z.string().url(), z.literal(""), z.undefined()]).optional(),
  whatsappLink: z.union([z.string().url(), z.literal(""), z.undefined()]).optional(),
  contactPhone: z.string().optional(),
  contactWhatsApp: z.string().optional(),
  special: z.boolean().default(false).optional(),
  locationId: z.string().min(1, "Location is required"),
  categoryId: z.string().optional(),
});

export const updateNewsSchema = newsSchema.extend({
  id: z.string(),
});

export const getNewsById = z.object({
  id: z.string(),
});

export type NewsInput = z.infer<typeof newsSchema>;

