import apiClient from "../api/client";

export const crearPedidoDesdeCotizacion = (cotizacionId) =>
  apiClient.post(`/pedidos/desde-cotizacion/${cotizacionId}`);

export const fetchMisPedidos = () =>
  apiClient.get("/pedidos/mis-pedidos");

export const fetchTodosPedidos = () =>
  apiClient.get("/pedidos/admin/todos");

export const registrarPagoSimulado = (id, payload = {}) =>
  apiClient.patch(`/pedidos/${id}/registrar-pago`, payload);
