import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Prisma } from "@/src/generated/prisma/client";

import { FilterForm } from "@/components/FilterForm";

import { statusLabel, statusColor } from "./types";

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
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Meus Livros</h1>
        <Link
          href="/books/new"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Adicionar livro
        </Link>
      </div>

      <FilterForm q={q} status={status} />

      {books.length === 0 && (
        <p className="text-gray-500">
          {q || status
            ? "Nenhum livro encontrado com esse filtro."
            : "Nenhum livro cadastrado ainda."}
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {books.map((book) => (
          <li key={book.id}>
            <Link
              href={`/books/${book.id}`}
              className="flex items-center justify-between border border-gray-200 rounded-xl bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-gray-900">{book.title}</p>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 ${statusColor[book.status]} rounded-full`}
              >
                {statusLabel[book.status]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
