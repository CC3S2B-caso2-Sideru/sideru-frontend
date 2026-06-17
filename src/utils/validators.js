export const required = (value) =>
  !value || !String(value).trim() ? "Campo obligatorio" : null;

export const minLength = (min) => (value) =>
  value && value.trim().length < min ? `Mínimo ${min} caracteres` : null;

export const maxLength = (max) => (value) =>
  value && value.trim().length > max ? `Máximo ${max} caracteres` : null;

export const pattern = (regex, message) => (value) =>
  value && !regex.test(value) ? message : null;

export const min = (min) => (value) =>
  value && Number(value) < min ? `Debe ser al menos ${min}` : null;

export const positive = (value) =>
  value && Number(value) <= 0 ? "Debe ser mayor a 0" : null;

export const notNegative = (value) =>
  value !== "" && Number(value) < 0 ? "No puede ser negativo" : null;

export const composite =
  (...validators) =>
  (value) => {
    for (const v of validators) {
      const error = v(value);
      if (error) return error;
    }
    return null;
  };

export const validateForm = (fields, validators) => {
  const errors = {};
  for (const [name, validator] of Object.entries(validators)) {
    errors[name] = validator(fields[name]);
  }
  return errors;
};

export const firstError = (errors) =>
  Object.values(errors).find(Boolean) || null;

export const hasErrors = (errors) =>
  Object.values(errors).some(Boolean);

export const notOnlyRepeatedDigits = (minLength = 7) => (value) => {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length < minLength) return null;
  return new Set(digits).size === 1
    ? "No pueden ser todos los dígitos iguales"
    : null;
};

export const maxConsecutiveSameDigits = (max) => (value) => {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  const regex = new RegExp(`(.)\\1{${max},}`);
  return regex.test(digits)
    ? `No más de ${max + 1} dígitos iguales consecutivos`
    : null;
};

export const noRepeatedChars = (max) => (value) => {
  if (!value) return null;
  const regex = new RegExp(`(.)\\1{${max},}`, "i");
  return regex.test(value)
    ? `No más de ${max + 1} caracteres iguales consecutivos`
    : null;
};
