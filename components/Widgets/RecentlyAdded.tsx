import { prisma } from "@/lib/prisma";
import BookCard from "../BookCard";

export default async function RecentlyAdded() {
  const [recentlyAdded] = await Promise.all([
    prisma.book.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-contrast">
        Adicionados recentemente
      </h2>
      <ul className="flex flex-col gap-3">
        {recentlyAdded.map((book) => (
          <li key={book.id}>
            <BookCard
              book={{
                ...book,
                totalPages: book.totalPages,
                coverUrl: book.coverUrl ?? "",
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
