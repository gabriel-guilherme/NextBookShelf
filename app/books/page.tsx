import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Prisma } from "@/src/generated/prisma/client";

import { FilterForm } from "@/components/FilterForm";

import { statusLabel, statusColor } from "./types";
import BookPoster from "@/components/BookPoster";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;

  const where: Prisma.BookWhereInput = {
    status: status
      ? (status as Prisma.EnumReadingStatusFilter["equals"])
      : undefined,
    OR: q
      ? [
          { title: { contains: q, mode: "insensitive" } },
          { author: { contains: q, mode: "insensitive" } },
        ]
      : undefined,
  };

  const books = await prisma.book.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-contrast">Meus Livros</h1>
        {/*<Link
          href="/books/new"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Adicionar livro
        </Link>*/}
      </div>

      <FilterForm q={q} status={status} />

      {books.length === 0 && (
        <p className="text-gray-500">
          {q || status
            ? "Nenhum livro encontrado com esse filtro."
            : "Nenhum livro cadastrado ainda."}
        </p>
      )}

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 overflow-y-auto max-h-200">
        {books.map((book) => (
          <li key={book.id}>
            <BookPoster
              book={{
                id: book.id,
                title: book.title,
                author: book.author,
                currentPage: book.currentPage,
                totalPages: book.totalPages ?? 0,
                status: book.status,
              }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
