import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react-motion";
import BookPosterSimplified from "../BookPosterSimplified";

export default async function Collection() {
  const books = await prisma.book.findMany({ take: 3 });
  return (
    <section className="min-h-[90vh] w-full bg-darkest px-4 py-10 sm:px-8 lg:px-16 xl:px-24">
      <h3 className="text-lg text-contrast opacity-50">YOUR COLLECTION</h3>

      <div className="flex w-full flex-col gap-5 pt-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-3xl text-contrast sm:text-4xl">Your library</h1>

          <Link
            href="/books"
            className="flex w-fit items-center gap-2 text-lg text-contrast sm:text-2xl"
          >
            View all
            <ArrowRight />
          </Link>
        </div>
        {/* Livros */}
        <div className=" flex w-full gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3 ">
          {books.map((book) => (
            <div
              key={book.id}
              className=" w-[80%] shrink-0 snap-center sm:w-auto sm:shrink "
            >
              <BookPosterSimplified
                book={{
                  id: book.id,
                  title: book.title,
                  author: book.author,
                  currentPage: book.currentPage,
                  totalPages: book.totalPages,
                  status: book.status,
                  coverUrl: book.coverUrl || "",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
