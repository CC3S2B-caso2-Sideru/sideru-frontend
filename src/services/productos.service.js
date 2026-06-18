import apiClient from "../api/client";

export const fetchProductos = (search, categoria) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (categoria) params.set("categoria", categoria);
  return apiClient.get(`/productos?${params.toString()}`);
};

export const fetchCategorias = () => apiClient.get("/categorias");
