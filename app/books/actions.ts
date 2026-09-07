"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createBook(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const totalPagesRaw = formData.get("totalPages") as string;

  if (!title || !author) {
    throw new Error("Título e autor são obrigatórios");
  }

  await prisma.book.create({
    data: {
      title,
      author,
      totalPages: totalPagesRaw ? Number(totalPagesRaw) : null,
    },
  });

  redirect("/books");
}
