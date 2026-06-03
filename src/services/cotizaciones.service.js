import apiClient from "../api/client";

export const submitCotizacion = (items, token) =>
  apiClient.post(
    "/cotizaciones",
    {
      observaciones: "Cotización solicitada",
      items,
    },
    {
      headers: {
        Authorization: `Bearer ${token}` // Aquí inyectas el token
      }
    }
  );

export const fetchMisCotizaciones = (token) =>
  apiClient.get("/cotizaciones/mis-cotizaciones", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });