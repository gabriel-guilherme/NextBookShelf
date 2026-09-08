import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateBook, deleteBook } from "./actions";
import { SubmitButton } from "@/components/SubmitButton";
import BackButton from "@/components/BackButton";
import InputCover from "@/components/InputCover";
import { statusLabel } from "../types";

const stylePattern =
  "shadow shadow-black/75 opacity-30 hover:opacity-70 focus:opacity-70 bg-contrast round rounded-lg border border-gray 300 px-3 py-2 text-primary outline-none focus:border-gray-900";

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
      ? ((book.currentPage / book.totalPages) * 100).toFixed(2)
      : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <BackButton />

      <div className="flex flex-col p-4 sm:p-6 md:p-10">
        <form
          action={updateBook}
          className="grid w-full grid-cols-1 gap-8 text-sm font-medium text-contrast md:grid-cols-[40%_minmax(0,1fr)] md:gap-30"
        >
          <section className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input
                type="text"
                name="title"
                defaultValue={book.title}
                aria-label="Título"
                required
                className="border-0 bg-transparent px-0 text-2xl font-bold text-contrast shadow-none outline-none focus:opacity-70"
              />
              <input
                type="text"
                name="author"
                defaultValue={book.author}
                aria-label="Autor"
                required
                className="border-0 bg-transparent px-0 text-sm text-contrast/70 shadow-none outline-none focus:opacity-70"
              />
            </div>

            <div className="relative mx-auto aspect-[3/4] w-full max-w-64 md:mx-0 md:max-w-none">
              <InputCover />
            </div>
          </section>

          <section className="flex w-full flex-col gap-6">
            <input type="hidden" name="id" value={book.id} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[60%_minmax(0,1fr)_20%]">
              <div className="flex flex-col">
                <label>Status</label>
                <select
                  name="status"
                  defaultValue={book.status}
                  className={`${stylePattern} cursor-pointer text-center`}
                >
                  {Object.entries(statusLabel).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label>Nota</label>
                <input
                  type="number"
                  name="rating"
                  defaultValue={book.rating ?? 0}
                  min={0}
                  max={5}
                  className={`${stylePattern} text-center`}
                />
              </div>

              <div className="flex flex-col">
                <label>Pág. Lidas</label>
                <input
                  type="number"
                  name="currentPage"
                  defaultValue={book.currentPage}
                  min={0}
                  max={book.totalPages ?? undefined}
                  className={`${stylePattern} text-center`}
                />
              </div>
            </div>

            {progress !== null && (
              <div className="text-xs text-contrast/70">
                <div className="mb-1 flex justify-between">
                  <span>
                    {book.currentPage} / {book.totalPages} páginas
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-contrast/30">
                  <div
                    className="h-2 rounded-full bg-interaction transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col">
              <label>Notas</label>
              <textarea
                name="notes"
                defaultValue={book.notes ?? ""}
                rows={7}
                className={`${stylePattern} resize-y align-top`}
              />
            </div>

            <SubmitButton>Salvar</SubmitButton>
          </section>
        </form>

        <form action={deleteBook} className="mt-4 md:ml-[calc(40%+7.5rem)]">
          <input type="hidden" name="id" value={book.id} />
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-primary"
          >
            Excluir livro
          </button>
        </form>
      </div>
    </main>
  );
}
