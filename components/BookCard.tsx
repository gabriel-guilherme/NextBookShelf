import Image from "next/image";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

type BookCardProps = {
  book: {
    id: number;
    title: string;
    author: string;
    currentPage: number;
    totalPages: number;
    //coverUrl: string;
  };
};

function bookProgress(currentPage: number, totalPages: number) {
  return ((currentPage / totalPages) * 100).toFixed(2);
}

export default function BookCard({ book }: BookCardProps) {
  console.log(book);
  return (
    <Link
      href={`/books/${book.id}`}
      className="group block rounded-xl bg-primary p-4 shadow-md shadow-black/50 transition hover:shadow-sm"
    >
      <div className="grid grid-cols-[70px_1fr_30px] items-center gap-4">
        <div className="relative h-25 w-[70px]">
          <Image
            src="/Capa_do_livro_Coração_de_Aço.jpg"
            alt={`Capa do livro ${book.title}`}
            fill
            className="rounded-md object-cover shadow-md shadow-black/50"
          />
        </div>
        <div className="grid grid-rows-[1fr_1fr_30px] gap-1">
          <h3 className="text-lg font-bold text-contrast">{book.title}</h3>
          <p className="text-base text-contrast">{book.author}</p>
          <p className="flex text-sm text-contrast opacity-75 items-end">
            Livro - {bookProgress(book.currentPage, book.totalPages)}%
          </p>
        </div>
        <span
          aria-label={`Opções do livro ${book.title}`}
          className="flex items-center justify-center rounded-md p-1 text-contrast transition hover:bg-interaction hover:text-primary"
        >
          <Ellipsis size={24} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}
