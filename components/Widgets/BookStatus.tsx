import { prisma } from "@/lib/prisma";

export default async function BookStatus() {
  const [total, reading, read, wantToRead] = await Promise.all([
    prisma.book.count(),
    prisma.book.count({ where: { status: "READING" } }),
    prisma.book.count({ where: { status: "READ" } }),
    prisma.book.count({ where: { status: "WANT_TO_READ" } }),
    prisma.book.findMany({
      where: { status: "READING" },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Total de livros", value: total },
    { label: "Lendo agora", value: reading },
    { label: "Já lidos", value: read },
    { label: "Quero ler", value: wantToRead },
  ];
  return (
    <div className="mb-10 grid grid-cols-2 gap-10 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl bg-contrast p-7 text-center shadow-md shadow-black/50"
        >
          <p className="text-4xl font-bold text-primary">{stat.value}</p>
          <p className="text-xs text-primary opacity-50">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
