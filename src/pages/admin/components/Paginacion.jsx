import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import clsx from "clsx";

const Paginacion = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    if (i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 2) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  const btn = "grid h-8 w-8 place-items-center rounded-lg text-sm transition disabled:opacity-40";

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        className={clsx(btn, "text-gray-400 hover:bg-gray-100")}
        disabled={page === 0}
        onClick={() => onPageChange(0)}
      >
        <ChevronsLeft size={16} />
      </button>
      <button
        type="button"
        className={clsx(btn, "text-gray-400 hover:bg-gray-100")}
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={clsx(
              btn,
              page === p
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        )
      )}

      <button
        type="button"
        className={clsx(btn, "text-gray-400 hover:bg-gray-100")}
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={16} />
      </button>
      <button
        type="button"
        className={clsx(btn, "text-gray-400 hover:bg-gray-100")}
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(totalPages - 1)}
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Paginacion;
