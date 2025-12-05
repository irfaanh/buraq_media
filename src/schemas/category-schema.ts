import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const updateCategorySchema = categorySchema.extend({
  id: z.string(),
});

export const getCategoryById = z.object({
  id: z.string(),
});

export type CategoryInput = z.infer<typeof categorySchema>;






