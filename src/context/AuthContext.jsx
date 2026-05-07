import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        const extracted = { username: payload.username || payload.sub || "" };
        setUser(extracted);
        localStorage.setItem("user", JSON.stringify(extracted));
      }
    }
  }, [token]);

  const login = async (username, password) => {
    const { data } = await axios.post("/api/auth/login", { username, password });
    setToken(data.token);
    localStorage.setItem("token", data.token);
    return data.token;
  };

  const register = async (payload) => {
    const { data } = await axios.post("/api/auth/register", payload);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    return data.token;
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);