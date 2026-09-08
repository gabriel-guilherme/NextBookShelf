"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ReadingStatus } from "@/generated/prisma/enums";

export async function updateBook(formData: FormData) {
  const id = Number(formData.get("id"));
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
  const currentPageRaw = formData.get("currentPage") as string;
  const category = formData.get("category") as string;
  const notes = formData.get("notes") as string;

  const data: Parameters<typeof prisma.book.update>[0]["data"] = {
    status,
    currentPage: currentPageRaw ? Number(currentPageRaw) : 0,
    notes: notes || null,
    rating: ratingRaw ? Number(ratingRaw) : null,
    category: category || null,
  };

  const current = await prisma.book.findUniqueOrThrow({ where: { id } });

  if (
    status === "READING" &&
    current.status !== "READING" &&
    !current.startedAt
  ) {
    data.startedAt = new Date();
  }
  if (status === "READ" && current.status !== "READ") {
    data.finishedAt = new Date();
  }

  await prisma.book.update({ where: { id }, data });

  revalidatePath("/books");
  revalidatePath(`/books/${id}`);
  redirect(`/books/${id}`);
}

export async function deleteBook(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.book.delete({ where: { id } });

  revalidatePath("/books");
  redirect("/books");
}
