"use server";
import { prisma } from "../lib/prisma";
import { actionClient } from "../lib/safeAction";
import {
  categorySchema,
  getCategoryById,
  updateCategorySchema,
} from "../schemas/category-schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
};

export const getCategoryDropdown = async () => {
  const categories = await getAllCategories();
  return categories.map((c) => ({ id: c.id, name: c.name }));
};

export const createCategory = actionClient
  .inputSchema(categorySchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof categorySchema> }) => {
    try {
      const category = await prisma.category.create({
        data: parsedInput,
      });
      revalidatePath("/categories");
      revalidatePath("/news");
      return { data: category };
    } catch (error) {
      console.log("Created category Error :", error);
      return { error: "Something went wrong" };
    }
  });

export const getCategoryList = actionClient.action(async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return { categories };
  } catch (error) {
    console.log("Get category Error :", error);
    return { error: "Something went wrong" };
  }
});

export const updateCategory = actionClient
  .inputSchema(updateCategorySchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof updateCategorySchema> }) => {
    const { id, ...data } = parsedInput;
    try {
      const category = await prisma.category.update({
        where: { id },
        data,
      });
      revalidatePath("/categories");
      revalidatePath("/news");
      return { data: category };
    } catch (error) {
      console.log("Error on category Updating :", error);
      return { error: "Something went wrong" };
    }
  });

export const deleteCategory = actionClient
  .inputSchema(getCategoryById)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof getCategoryById> }) => {
    const { id } = parsedInput;
    if (!ObjectId.isValid(id)) {
      return null;
    }
    revalidatePath("/categories");
    revalidatePath("/news");
    return await prisma.category.delete({
      where: { id },
    });
  });



