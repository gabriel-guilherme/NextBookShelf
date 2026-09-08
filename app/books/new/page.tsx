import { createBook } from "../actions";
import { SubmitButton } from "@/components/SubmitButton";

import { statusLabel } from "../types";
import InputCover from "@/components/InputCover";
import BackButton from "@/components/BackButton";

const statusOptions = ["WANT_TO_READ", "READING", "READ", "ABANDONED"];

const stylePattern =
  "shadow shadow-black/75 opacity-30 hover:opacity-70 focus:opacity-70 bg-contrast round rounded-lg border border-gray 300 px-3 py-2 text-primary outline-none focus:border-gray-900";

export default function NewBookPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4">
      <BackButton />
      <div className="flex flex-col p-4 sm:p-6 md:p-10">
        <h1 className="mb-6 text-2xl font-bold text-contrast">
          Adicionar livro
        </h1>

        <form
          action={createBook}
          className="grid w-full grid-cols-1 gap-8 md:grid-cols-[40%_minmax(0,1fr)] md:gap-30"
        >
          <section className="relative mx-auto aspect-[3/4] w-full max-w-64 md:mx-0 md:max-w-none">
            <InputCover />
          </section>
          <section className="flex flex-col w-full text-sm font-medium text-contrast gap-6">
            <div className="flex flex-col">
              <label>Título</label>
              <input
                type="text"
                name="title"
                required
                className={stylePattern}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[80%_minmax(0,1fr)]">
              <div className="flex flex-col">
                <label>Autor</label>
                <input
                  type="text"
                  name="author"
                  required
                  className={stylePattern}
                />
              </div>

              <div className="flex flex-col">
                <label>Qtd. Páginas</label>
                <input
                  type="number"
                  name="totalPages"
                  required
                  className={`${stylePattern} text-center`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[60%_minmax(0,1fr)_18%]">
              <div className="flex flex-col">
                <label>Status</label>
                <select
                  name="status"
                  className={`${stylePattern} cursor-pointer text-center`}
                >
                  <option value="">Status</option>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label>Nota</label>
                <input
                  type="number"
                  name="rating"
                  defaultValue={0}
                  className={`${stylePattern} text-center`}
                />
              </div>
              <div className="flex flex-col">
                <label>Pág. Lidas</label>
                <input
                  type="number"
                  defaultValue={0}
                  name="currentPage"
                  className={`${stylePattern} text-center`}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label>Categoria</label>
              <input type="text" name="category" className={stylePattern} />
            </div>

            <div className="flex flex-col">
              <label>Notas</label>
              <textarea
                name="notes"
                rows={7}
                className={`${stylePattern} resize-y align-top`}
              />
            </div>
            <SubmitButton>Salvar</SubmitButton>
          </section>
        </form>
      </div>
    </main>
  );
}
