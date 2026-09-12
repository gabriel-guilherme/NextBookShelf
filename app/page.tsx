import Collection from "@/components/Home/Collection";
import Hero from "@/components/Home/Hero";
import Thoughts from "@/components/Home/Thoughts";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const books = await prisma.book.findMany({ take: 3 });

  return (
    <main className="w-full">
      <Hero />

      <Thoughts />

      <Collection books={books} />
    </main>
  );
}
