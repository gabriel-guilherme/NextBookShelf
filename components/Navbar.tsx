"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Início" },
  { href: "/books", label: "Meus livros" },
  { href: "/books/new", label: "+ Adicionar" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-800 bg-black">
      <div className="mx-auto flex max-w-3xl items-center gap-6 px-4 py-4">
        <span className="font-bold text-white">📚 Books Manager</span>
        <div className="flex gap-4">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive ? "text-gray-600" : "text-white hover:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
