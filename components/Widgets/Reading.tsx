import { prisma } from "@/lib/prisma";
import BookCard from "../BookCard";

export default async function Reading() {
  const [currentlyReading] = await Promise.all([
    prisma.book.findMany({
      where: { status: "READING" },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-contrast">
        Lendo agora
      </h2>
      {currentlyReading.length === 0 && (
        <p className="text-sm text-contrast">Nenhum livro em andamento.</p>
      )}
      <ul className="flex flex-col gap-3">
        {currentlyReading.map((book) => {
          const progress =
            book.totalPages && book.totalPages > 0
              ? Math.min(
                  100,
                  Math.round((book.currentPage / book.totalPages) * 100),
                )
              : null;
          return (
            <li key={book.id}>
              <BookCard book={{ ...book, totalPages: book.totalPages ?? 0 }} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
