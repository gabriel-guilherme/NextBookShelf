"use client";

import { statusLabel } from "@/app/books/types";

const statusOptions = ["WANT_TO_READ", "READING", "READ", "ABANDONED"];

export function FilterForm({ q, status }: { q?: string; status?: string }) {
  return (
    <form className="mb-6 flex flex-wrap gap-3">
      <input
        type="text"
        name="q"
        defaultValue={q ?? ""}
        placeholder="Buscar por título ou autor..."
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
      />
      <select
        name="status"
        defaultValue={status ?? ""}
        onChange={(e) => e.target.form?.requestSubmit()}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
      >
        <option value="">Status</option>
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {statusLabel[s]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        Filtrar
      </button>
    </form>
  );
}
