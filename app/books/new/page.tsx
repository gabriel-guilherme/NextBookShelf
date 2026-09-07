import { createBook } from "../actions";
import { SubmitButton } from "@/components/SubmitButton";
import Link from "next/link";

export default function NewBookPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <Link
        href={"/books"}
        className="mb-6 inline-block text-sm text-gray-500 hover:text-gray-800"
      >
        Voltar
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Adicionar livro</h1>

      <form action={createBook} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Título
          <input
            type="text"
            name="title"
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Autor
          <input
            type="text"
            name="author"
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Total de páginas
          <input
            type="number"
            name="totalPages"
            min={1}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
          />
        </label>

        <SubmitButton>Salvar</SubmitButton>
      </form>
    </main>
  );
}
