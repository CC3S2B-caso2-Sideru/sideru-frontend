import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../contexts/AuthContext";
import { required, composite, minLength, pattern } from "../../utils/validators";

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

  const validateStep1 = () => {
    const fields = { ...form };
    const rules = {
      username: composite(required),
      email: composite(required),
      password: composite(required, minLength(6)),
      confirmPassword: composite(required),
    };
    for (const [field, rule] of Object.entries(rules)) {
      const err = rule(fields[field]);
      if (err) return err;
    }
    if (form.password !== form.confirmPassword)
      return "Las contraseñas no coinciden";
    return null;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep(2);
  };

  const validatePersona = () => {
    const rules = {
      nombre: composite(required, minLength(2)),
      apellido: composite(required, minLength(2)),
    };
    for (const [field, rule] of Object.entries(rules)) {
      const err = rule(persona[field]);
      if (err) return err;
    }
    if (persona.dni && !/^\d{8}$/.test(persona.dni))
      return "El DNI debe tener 8 dígitos";
    if (persona.ruc && !/^\d{11}$/.test(persona.ruc))
      return "El RUC debe tener 11 dígitos";
    if (persona.telefono && !/^\d{9}$/.test(persona.telefono))
      return "El teléfono debe tener 9 dígitos";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personaError = validatePersona();
    if (personaError) {
      setError(personaError);
      return;
    }
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

  const inputClass =
    "w-full rounded-lg border-2 border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-blue-900/15";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700";
  const stepClass = (active) =>
    clsx(
      "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
      active
        ? "bg-primary text-white"
        : "border border-gray-300 bg-white text-gray-700"
    );

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10 sm:py-14">
      <h2 className="mb-7 text-center text-2xl font-bold text-slate-950 sm:mb-8 sm:text-3xl">
        Registrarse
      </h2>

      <div className="mb-6 flex flex-wrap justify-center gap-3">
        <span className={stepClass(step >= 1)}>1. Cuenta</span>
        <span className={stepClass(step >= 2)}>2. Datos Personales</span>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-800">
          {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleNext}>
          <div className="mb-3">
            <label className={labelClass}>Usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={(e) => handleChange(e, setForm)}
              required
              className={inputClass}
            />
          </div>
          <div className="mb-3">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => handleChange(e, setForm)}
              required
              className={inputClass}
            />
          </div>
          <div className="mb-3">
            <label className={labelClass}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => handleChange(e, setForm)}
              required
              className={inputClass}
            />
          </div>
          <div className="mb-3">
            <label className={labelClass}>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={(e) => handleChange(e, setForm)}
              required
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-medium text-white transition hover:bg-primary-light"
          >
            Siguiente →
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 rounded-lg border border-gray-200 p-4">
            <p className="mb-3 mt-0 font-bold">Datos Personales</p>
            <div className="mb-3">
              <label className={labelClass}>Nombre</label>
              <input
                name="nombre"
                value={persona.nombre}
                onChange={(e) => handleChange(e, setPersona)}
                required
                className={inputClass}
              />
            </div>
            <div className="mb-3">
              <label className={labelClass}>Apellido</label>
              <input
                name="apellido"
                value={persona.apellido}
                onChange={(e) => handleChange(e, setPersona)}
                required
                className={inputClass}
              />
            </div>
            <div className="mb-3">
              <label className={labelClass}>DNI</label>
              <input
                name="dni"
                value={persona.dni}
                onChange={(e) => handleChange(e, setPersona)}
                placeholder="Opcional"
                className={inputClass}
              />
            </div>
            <div className="mb-3">
              <label className={labelClass}>RUC</label>
              <input
                name="ruc"
                value={persona.ruc}
                onChange={(e) => handleChange(e, setPersona)}
                placeholder="Opcional"
                className={inputClass}
              />
            </div>
            <div className="mb-3">
              <label className={labelClass}>Razón Social</label>
              <input
                name="razonSocial"
                value={persona.razonSocial}
                onChange={(e) => handleChange(e, setPersona)}
                placeholder="Opcional"
                className={inputClass}
              />
            </div>
            <div className="mb-3">
              <label className={labelClass}>Teléfono</label>
              <input
                name="telefono"
                value={persona.telefono}
                onChange={(e) => handleChange(e, setPersona)}
                className={inputClass}
              />
            </div>
            <div className="mb-3">
              <label className={labelClass}>Dirección</label>
              <input
                name="direccion"
                value={persona.direccion}
                onChange={(e) => handleChange(e, setPersona)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50 sm:w-1/2"
            >
              ← Atrás
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70 sm:w-1/2"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </div>
        </form>
      )}

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
