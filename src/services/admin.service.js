import apiClient from "../api/client";

export const fetchTodasCotizaciones = () =>
  apiClient.get("/cotizaciones/admin/todas");

export const aceptarCotizacion = (id) =>
  apiClient.patch(`/cotizaciones/${id}/aceptar`);

export const rechazarCotizacion = (id) =>
  apiClient.patch(`/cotizaciones/${id}/rechazar`);

export const fetchProductos = ({ search, categoriaId, activo, page, size } = {}) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (categoriaId) params.set("categoriaId", categoriaId);
  if (activo !== "" && activo !== undefined && activo !== null)
    params.set("activo", activo);
  if (page !== undefined) params.set("page", page);
  if (size !== undefined) params.set("size", size);
  return apiClient.get(`/admin/productos?${params}`);
};

export const fetchProductoPorSku = (sku) =>
  apiClient.get(`/admin/productos/${sku}`);

export const createProducto = (data) =>
  apiClient.post("/admin/productos", data);

export const updateProducto = (sku, data) =>
  apiClient.put(`/admin/productos/${sku}`, data);

export const toggleProductoActivo = (sku) =>
  apiClient.patch(`/admin/productos/${sku}/activar`);

export const adjustStock = (sku, cantidad) =>
  apiClient.patch(`/admin/productos/${sku}/stock`, { cantidad });
