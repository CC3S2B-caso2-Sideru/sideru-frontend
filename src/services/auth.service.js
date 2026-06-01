import apiClient from "../api/client";

export const login = (username, password) =>
  apiClient.post("/auth/login", { username, password });

export const register = (payload) =>
  apiClient.post("/auth/register", payload);
