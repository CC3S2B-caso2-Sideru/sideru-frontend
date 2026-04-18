import { useEffect } from "react";

const Filters = ({ inputValue, setInputValue, setSearch, categoria, setCategoria, categorias, categoriasLoading }) => {
  // Timer de 400ms para actualizar el estado de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  return (
    <div className="products-filters">
      <div className="search-box">
        <span className="search-icon"></span>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
        />
        {inputValue && (
          <button className="clear-btn" onClick={() => { setInputValue(""); setSearch(""); }}>✕</button>
        )}
      </div>

      <select
        className="category-select"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        disabled={categoriasLoading}
      >
        {categorias.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;