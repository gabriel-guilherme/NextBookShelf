"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBook(id: number) {
  await prisma.book.delete({ where: { id } });

  revalidatePath("/");
}
