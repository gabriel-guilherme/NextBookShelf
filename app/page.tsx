import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const [
    total,
    reading,
    read,
    wantToRead,
    //ratingAgg,
    currentlyReading,
    recentlyAdded,
  ] = await Promise.all([
    prisma.book.count(),
    prisma.book.count({ where: { status: "READING" } }),
    prisma.book.count({ where: { status: "READ" } }),
    prisma.book.count({ where: { status: "WANT_TO_READ" } }),
    /*prisma.book.aggregate({
      _avg: { rating: true },
      where: { rating: { not: null } },
    }),*/
    prisma.book.findMany({
      where: { status: "READING" },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.book.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  //const avgRating = ratingAgg._avg.rating;

  const stats = [
    { label: "Total de livros", value: total },
    { label: "Lendo agora", value: reading },
    { label: "Já lidos", value: read },
    { label: "Quero ler", value: wantToRead },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold text-amber-600">Aga um</h1>
      <p className="mb-8 text-gray-500">Alguma frase bacana...</p>

      {/* Grid de estatísticas */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {total === 0 ? (
        <Link
          href="/books/new"
          className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          + Adicionar meu primeiro livro
        </Link>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Lendo agora */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Lendo agora
            </h2>
            {currentlyReading.length === 0 && (
              <p className="text-sm text-gray-400">
                Nenhum livro em andamento.
              </p>
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
                    <Link
                      href={`/books/${book.id}`}
                      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      <p className="font-medium text-gray-900">{book.title}</p>
                      {progress !== null && (
                        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                          <div
                            className="h-1.5 rounded-full bg-blue-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Adicionados recentemente */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Adicionados recentemente
            </h2>
            <ul className="flex flex-col gap-3">
              {recentlyAdded.map((book) => (
                <li key={book.id}>
                  <Link
                    href={`/books/${book.id}`}
                    className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <p className="font-medium text-gray-900">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
