"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBook(id: number) {
  await prisma.book.delete({ where: { id } });

  revalidatePath("/");
}
