"use server";
import { prisma } from "../lib/prisma";
import { actionClient } from "../lib/safeAction";
import {
  locationSchema,
  getLocationById,
  updateLocationSchema,
} from "../schemas/location-schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getAllLocations = async () => {
  return await prisma.location.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
};

export const getLocationDropdown = async () => {
  const locations = await getAllLocations();
  return locations.map((l) => ({ id: l.id, name: l.name }));
};

export const createLocation = actionClient
  .inputSchema(locationSchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof locationSchema> }) => {
    try {
      const location = await prisma.location.create({
        data: parsedInput,
      });
      revalidatePath("/locations");
      revalidatePath("/news");
      return { data: location };
    } catch (error) {
      console.log("Created location Error :", error);
      return { error: "Something went wrong" };
    }
  });

export const getLocationList = actionClient.action(async () => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { name: "asc" },
    });

    return { locations };
  } catch (error) {
    console.log("Get location Error :", error);
    return { error: "Something went wrong" };
  }
});

export const updateLocation = actionClient
  .inputSchema(updateLocationSchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof updateLocationSchema> }) => {
    const { id, ...data } = parsedInput;
    try {
      const location = await prisma.location.update({
        where: { id },
        data,
      });
      revalidatePath("/locations");
      revalidatePath("/news");
      return { data: location };
    } catch (error) {
      console.log("Error on location Updating :", error);
      return { error: "Something went wrong" };
    }
  });

export const deleteLocation = actionClient
  .inputSchema(getLocationById)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof getLocationById> }) => {
    const { id } = parsedInput;
    if (!ObjectId.isValid(id)) {
      return null;
    }
    revalidatePath("/locations");
    revalidatePath("/news");
    return await prisma.location.delete({
      where: { id },
    });
  });

