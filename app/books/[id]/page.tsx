import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateBook, deleteBook } from "./actions";
import { SubmitButton } from "@/components/SubmitButton";
import Link from "next/link";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await prisma.book.findUnique({ where: { id: Number(id) } });

  if (!book) {
    notFound();
  }

  const progress =
    book.totalPages && book.totalPages > 0
      ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100))
      : null;

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <Link
        href="/books"
        className="mb-6 inline-block text-sm text-gray-500 hover:text-gray-800"
      >
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
      <p className="mb-6 text-gray-500">{book.author}</p>

      {progress !== null && (
        <div className="mb-6">
          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>
              {book.currentPage} / {book.totalPages} páginas
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-gray-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <form
        action={updateBook}
        className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <input type="hidden" name="id" value={book.id} />

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Status
          <select
            name="status"
            defaultValue={book.status}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
          >
            <option value="WANT_TO_READ">Quero ler</option>
            <option value="READING">Lendo</option>
            <option value="READ">Lido</option>
            <option value="ABANDONED">Abandonado</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Página atual {book.totalPages ? `(de ${book.totalPages})` : ""}
          <input
            type="number"
            name="currentPage"
            defaultValue={book.currentPage}
            min={0}
            max={book.totalPages ?? undefined}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Nota (1 a 5)
          <input
            type="number"
            name="rating"
            defaultValue={book.rating ?? ""}
            min={1}
            max={5}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Notas
          <textarea
            name="notes"
            defaultValue={book.notes ?? ""}
            rows={4}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
          />
        </label>

        <SubmitButton>Salvar</SubmitButton>
      </form>

      <form action={deleteBook} className="mt-4">
        <input type="hidden" name="id" value={book.id} />
        <button
          type="submit"
          className="w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Excluir livro
        </button>
      </form>
    </main>
  );
}
