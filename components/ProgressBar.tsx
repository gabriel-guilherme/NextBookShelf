function bookProgress(currentPage: number, totalPages: number | null) {
  return totalPages ? ((currentPage / totalPages) * 100).toFixed(2) : "0.00";
}

export default function ProgressBar({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number | null;
}) {
  const progress = bookProgress(currentPage, totalPages);
  return (
    <div className="text-xs text-contrast/70">
      <div className="mb-1 flex justify-between">
        <span>
          {currentPage} / {totalPages} páginas
        </span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-contrast/30">
        <div
          className="h-2 rounded-full bg-interaction transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
