import Image from "next/image";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

import { statusColor, statusLabel } from "@/app/books/types";

type BookCardProps = {
  book: {
    id: number;
    title: string;
    author: string;
    currentPage: number;
    totalPages: number;
    status: string;
    //coverUrl: string;
  };
};

function bookProgress(currentPage: number, totalPages: number) {
  return ((currentPage / totalPages) * 100).toFixed(0);
}

export default function BookPoster({ book }: BookCardProps) {
  console.log(book);
  return (
    <Link
      href={`/books/${book.id}`}
      className="mx-auto grid w-full max-w-[196px] grid-rows-[auto_auto_auto] gap-1"
    >
      <span
        aria-label={`Opções do livro ${book.title}`}
        className="flex items-center justify-self-end rounded-md p-1 text-contrast transition hover:bg-interaction hover:text-primary"
      >
        <Ellipsis size={12} strokeWidth={2} />
      </span>
      <div className="relative aspect-[7/10] w-full">
        <Image
          src="/Capa_do_livro_Coração_de_Aço.jpg"
          alt={`Capa do livro ${book.title}`}
          fill
          className="rounded-md object-cover shadow-md shadow-black/50"
        />
        <span
          className={`pointer-events-none absolute top-3 right-3 z-10 inline-flex w-fit whitespace-nowrap items-center justify-center rounded-md px-2 py-1 text-center text-xs font-bold text-primary ${statusColor[book.status]} shadow-md`}
        >
          {statusLabel[book.status]}
        </span>
      </div>
      <div className="flex justify-between text-contrast">
        <p>Livro</p>
        <p>{bookProgress(book.currentPage, book.totalPages)}%</p>
      </div>
    </Link>
  );
}
