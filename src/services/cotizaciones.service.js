import apiClient from "../api/client";

export const submitCotizacion = (items) =>
  apiClient.post("/cotizaciones", {
    observaciones: "Cotización solicitada",
    items,
  });

export const fetchMisCotizaciones = () =>
  apiClient.get("/cotizaciones/mis-cotizaciones");