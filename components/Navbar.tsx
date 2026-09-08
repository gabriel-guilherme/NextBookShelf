"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, CloudRainWind } from "lucide-react-motion";

export default function Navbar() {
  const pathname = usePathname();

  const isHomeRoute = pathname === "/";
  const isBookRoute = pathname === "/books" || pathname.startsWith("/books/");
  const isNewBookRoute = pathname === "/books/new";

  return (
    <nav className="border-b border-gray-800 bg-primary shadow-md shadow-black/25 min-h-[96px]">
      <div className="mx-auto grid min-h-[96px] grid-cols-[1fr_auto] items-center px-2 py-4 sm:grid-cols-[1fr_auto_1fr] sm:px-4">
        <div className="hidden sm:block" />
        <div className="flex items-center gap-3 justify-self-start sm:gap-6 sm:justify-self-auto">
          <Link
            href="/"
            className={`text-sm font-medium transition sm:text-xl ${isHomeRoute ? "text-secondary" : "text-contrast hover:text-secondary"}`}
          >
            Início
          </Link>
          <Link
            href="/"
            data-motion-icon-group
            className="flex gap-2 items-center justify-center cursor-pointer order-first whitespace-nowrap text-2xl font-bold text-interaction-contrast transition text-contrast hover:text-interaction sm:order-none"
          >
            <CloudRainWind aria-hidden="true" trigger="parent-hover" />

            <span className="hidden sm:inline">Rainbound</span>
          </Link>
          <Link
            href="/books"
            className={`text-sm font-medium transition sm:text-xl ${isBookRoute ? "text-secondary" : "text-contrast hover:text-secondary"}`}
          >
            Biblioteca
          </Link>
        </div>
        <div className="mr-1 flex justify-end sm:mr-4">
          <Link
            href="/books/new"
            aria-label="Adicionar livro"
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-interaction text-xl text-contrast transition hover:bg-interaction-hover hover:text-primary hover:bg-interaction-contrast ${isNewBookRoute ? "bg-interaction-contrast text-primary" : ""}`}
          >
            <Plus />
          </Link>
        </div>
      </div>
    </nav>
  );
}
