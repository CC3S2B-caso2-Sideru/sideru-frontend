import { Container, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/AuthPages.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    ruc: "",
    razonSocial: "",
    telefono: "",
    direccion: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e, setter) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Completa todos los campos");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        email: form.email,
        password: form.password,
        username: form.username,
        persona: {
          ...persona,
          documentoValido: true,
        },
      };
      await register(payload);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Registrarse</h2>

      <div className="mb-4 d-flex justify-content-center gap-3">
        <span className={`badge ${step >= 1 ? "bg-dark" : "bg-light text-dark border"}`}>1. Cuenta</span>
        <span className={`badge ${step >= 2 ? "bg-dark" : "bg-light text-dark border"}`}>2. Datos Personales</span>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {step === 1 && (
        <Form onSubmit={handleNext} className="auth-form">
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              name="username"
              value={form.username}
              onChange={(e) => handleChange(e, setForm)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => handleChange(e, setForm)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => handleChange(e, setForm)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={(e) => handleChange(e, setForm)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Siguiente →
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form onSubmit={handleSubmit} className="auth-form">
          <div className="border rounded p-3 mb-3">
            <p className="fw-bold mb-3">Datos Personales</p>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                value={persona.nombre}
                onChange={(e) => handleChange(e, setPersona)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                name="apellido"
                value={persona.apellido}
                onChange={(e) => handleChange(e, setPersona)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                name="dni"
                value={persona.dni}
                onChange={(e) => handleChange(e, setPersona)}
                placeholder="Opcional"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>RUC</Form.Label>
              <Form.Control
                name="ruc"
                value={persona.ruc}
                onChange={(e) => handleChange(e, setPersona)}
                placeholder="Opcional"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                name="razonSocial"
                value={persona.razonSocial}
                onChange={(e) => handleChange(e, setPersona)}
                placeholder="Opcional"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                name="telefono"
                value={persona.telefono}
                onChange={(e) => handleChange(e, setPersona)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                name="direccion"
                value={persona.direccion}
                onChange={(e) => handleChange(e, setPersona)}
              />
            </Form.Group>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={() => setStep(1)} className="w-50">
              ← Atrás
            </Button>
            <Button variant="primary" type="submit" className="w-50" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </div>
        </Form>
      )}

      <p className="mt-3 text-center">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </Container>
  );
};

export default RegisterPage;