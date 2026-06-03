import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [redirectMessage, setRedirectMessage] = useState("");
  const [redirectHiding, setRedirectHiding] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      setRedirectMessage(message);
      setRedirectHiding(false);
      const timer = setTimeout(() => {
        setRedirectHiding(true);
        setTimeout(() => {
          setRedirectMessage("");
          setRedirectHiding(false);
        }, 400);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 mx-auto max-w-md">
      <h2 className="mb-4 text-center text-2xl font-bold">Iniciar Sesión</h2>

      {redirectMessage && (
        <div
          className={clsx("relative mb-4 rounded border border-yellow-300 bg-yellow-50 p-3 text-yellow-800 animate-fade-slide-in", redirectHiding && "animate-fade-slide-out")}
        >
          <span>{redirectMessage}</span>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-800 opacity-50 hover:opacity-100"
            onClick={() => {
              setRedirectHiding(true);
              setTimeout(() => { setRedirectMessage(""); setRedirectHiding(false); }, 400);
            }}
          >
            ✕
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-gray-700">Usuario</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary focus:ring-4 focus:ring-blue-900/15 focus:outline-none"
          />
        </div>
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary focus:ring-4 focus:ring-blue-900/15 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-2 font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="mt-3 text-center text-sm text-gray-600">
        ¿No tienes cuenta? <Link to="/register" className="font-medium text-primary hover:underline">Regístrate</Link>
      </p>
    </div>
  );
};

export default LoginPage;
