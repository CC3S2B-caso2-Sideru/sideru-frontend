import apiClient from "../api/client";

export const fetchTodasCotizaciones = () =>
  apiClient.get("/cotizaciones/admin/todas");

export const aceptarCotizacion = (id) =>
  apiClient.patch(`/cotizaciones/${id}/aceptar`);

export const rechazarCotizacion = (id) =>
  apiClient.patch(`/cotizaciones/${id}/rechazar`);
