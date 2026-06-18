import { useEffect } from "react";

const Filters = ({
  inputValue,
  setInputValue,
  setSearch,
  categoria,
  setCategoria,
  categorias,
  categoriasLoading,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
      <div className="flex min-w-0 items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 transition focus-within:border-slate-950 sm:min-w-64">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border-none bg-transparent py-3 text-sm outline-none"
        />
        {inputValue && (
          <button
            type="button"
            className="text-sm text-gray-500 transition hover:text-slate-950"
            onClick={() => {
              setInputValue("");
              setSearch("");
            }}
            aria-label="Limpiar búsqueda"
          >
            x
          </button>
        )}
      </div>

      <select
        className="w-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-slate-950 disabled:cursor-not-allowed sm:w-auto"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        disabled={categoriasLoading}
      >
        {categorias.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
