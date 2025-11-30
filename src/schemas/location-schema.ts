import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
});

export const updateLocationSchema = locationSchema.extend({
  id: z.string(),
});

export const getLocationById = z.object({
  id: z.string(),
});

export type LocationInput = z.infer<typeof locationSchema>;

