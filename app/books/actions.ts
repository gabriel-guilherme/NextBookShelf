"use server";

import { prisma } from "@/lib/prisma";
import { ReadingStatus } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";

export async function createBook(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const totalPagesRaw = formData.get("totalPages") as string;
  const statusRaw = formData.get("status");
  const status = Object.values(ReadingStatus).includes(
    statusRaw as ReadingStatus,
  )
    ? (statusRaw as ReadingStatus)
    : ReadingStatus.WANT_TO_READ;
  const ratingRaw = formData.get("rating") as string;
  const rating = Number(ratingRaw);
  const currentPageRaw = formData.get("currentPage") as string;
  const currentPage = Number(currentPageRaw);
  const category = formData.get("category") as string;
  const notes = formData.get("notes") as string;

  if (!title || !author) {
    throw new Error("Título e autor são obrigatórios");
  }

  await prisma.book.create({
    data: {
      title,
      author,
      totalPages: totalPagesRaw ? Number(totalPagesRaw) : null,
      status,
      rating,
      currentPage,
      category,
      notes,
    },
  });

  redirect("/books");
}
