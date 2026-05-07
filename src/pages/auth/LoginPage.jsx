import { Container, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/AuthPages.css";

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
    <Container className="py-5" style={{ maxWidth: "450px" }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      {redirectMessage && (
        <Alert
          variant="warning"
          className={`auth-alert ${redirectHiding ? "hiding" : ""}`}
          onClose={() => {
            setRedirectHiding(true);
            setTimeout(() => { setRedirectMessage(""); setRedirectHiding(false); }, 400);
          }}
          dismissible
        >
          {redirectMessage}
        </Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="auth-form">
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </Form>
      <p className="mt-3 text-center">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </Container>
  );
};

export default LoginPage;