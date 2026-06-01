import apiClient from "../api/client";

export const submitCotizacion = (items) =>
  apiClient.post("/cotizaciones", {
    observaciones: "Cotización solicitada",
    items,
  });
