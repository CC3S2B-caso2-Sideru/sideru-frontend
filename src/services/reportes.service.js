import apiClient from "../api/client";

export const fetchCotizacionesPorEstado = () =>
  apiClient.get("/reportes/cotizaciones-por-estado");

export const fetchCotizacionesPorMes = (meses = 6) =>
  apiClient.get(`/reportes/cotizaciones-por-mes?meses=${meses}`);

export const fetchIngresoRealVsPotencial = (meses = 6) =>
  apiClient.get(`/reportes/ingreso-real-vs-potencial?meses=${meses}`);

export const fetchProductosMasCotizados = (top = 5) =>
  apiClient.get(`/reportes/productos-mas-cotizados?top=${top}`);
