"use server";
import { prisma } from "../lib/prisma";
import { actionClient } from "../lib/safeAction";
import {
  newsSchema,
  getNewsById,
  updateNewsSchema,
} from "../schemas/news-schema";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createNews = actionClient
  .inputSchema(newsSchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof newsSchema> }) => {
    try {
      // Clean up empty strings to null for optional fields
      const data: {
        title: string;
        content: string;
        date: Date;
        locationId: string;
        categoryId: string | null;
        image: string | null;
        link: string | null;
        whatsappLink: string | null;
        contactPhone: string | null;
        contactWhatsApp: string | null;
        special: boolean;
      } = {
        title: parsedInput.title,
        content: parsedInput.content,
        date: parsedInput.date,
        locationId: parsedInput.locationId,
        categoryId: parsedInput.categoryId && parsedInput.categoryId !== "" ? parsedInput.categoryId : null,
        image: parsedInput.image && parsedInput.image !== "" ? parsedInput.image : null,
        link: parsedInput.link && parsedInput.link !== "" ? parsedInput.link : null,
        whatsappLink: parsedInput.whatsappLink && parsedInput.whatsappLink !== "" ? parsedInput.whatsappLink : null,
        contactPhone: parsedInput.contactPhone && parsedInput.contactPhone !== "" ? parsedInput.contactPhone : null,
        contactWhatsApp: parsedInput.contactWhatsApp && parsedInput.contactWhatsApp !== "" ? parsedInput.contactWhatsApp : null,
        special: parsedInput.special || false,
      };
      
      const news = await prisma.news.create({
        data,
      });
      revalidatePath("/news");
      revalidatePath("/public-news");
      return { data: news };
    } catch (error) {
      console.error("Created news Error :", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create news. Please check all required fields.";
      return { 
        serverError: errorMessage
      };
    }
  });

export const getNewsList = actionClient.action(async () => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: "desc" },
      include: { location: true, category: true },
    });

    return { news };
  } catch (error) {
    console.log("Get news Error :", error);
    return { error: "Something went wrong" };
  }
});

export const getPublicNewsList = actionClient.action(async () => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: "desc" },
      take: 50, // Limit to latest 50 news items
      include: { location: true, category: true },
    });

    return { news };
  } catch (error) {
    console.log("Get public news Error :", error);
    return { error: "Something went wrong" };
  }
});

export const updateNews = actionClient
  .inputSchema(updateNewsSchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof updateNewsSchema> }) => {
    const { id, ...rest } = parsedInput;
    try {
      // Clean up empty strings to null for optional fields
      const data: {
        title: string;
        content: string;
        date: Date;
        locationId: string;
        categoryId: string | null;
        image: string | null;
        link: string | null;
        whatsappLink: string | null;
        contactPhone: string | null;
        contactWhatsApp: string | null;
        special: boolean;
      } = {
        title: rest.title,
        content: rest.content,
        date: rest.date,
        locationId: rest.locationId,
        categoryId: rest.categoryId && rest.categoryId !== "" ? rest.categoryId : null,
        image: rest.image && rest.image !== "" ? rest.image : null,
        link: rest.link && rest.link !== "" ? rest.link : null,
        whatsappLink: rest.whatsappLink && rest.whatsappLink !== "" ? rest.whatsappLink : null,
        contactPhone: rest.contactPhone && rest.contactPhone !== "" ? rest.contactPhone : null,
        contactWhatsApp: rest.contactWhatsApp && rest.contactWhatsApp !== "" ? rest.contactWhatsApp : null,
        special: rest.special || false,
      };
      
      const news = await prisma.news.update({
        where: { id },
        data,
      });
      revalidatePath("/news");
      revalidatePath("/public-news");
      return { data: news };
    } catch (error) {
      console.error("Error on news Updating :", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update news. Please check all required fields.";
      return { 
        serverError: errorMessage
      };
    }
  });

export const deleteNews = actionClient
  .inputSchema(getNewsById)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof getNewsById> }) => {
    const { id } = parsedInput;
    if (!ObjectId.isValid(id)) {
      return null;
    }
    revalidatePath("/news");
    revalidatePath("/");
    return await prisma.news.delete({
      where: { id },
    });
  });

export const getSpecialNews = actionClient.action(async () => {
  try {
    const news = await prisma.news.findMany({
      where: { special: true },
      orderBy: { date: "desc" },
      take: 5, // Limit to latest 5 special news items
      include: { location: true, category: true },
    });

    return { news };
  } catch (error) {
    console.log("Get special news Error :", error);
    return { error: "Something went wrong" };
  }
});

