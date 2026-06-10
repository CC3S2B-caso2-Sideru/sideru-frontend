import {
  required,
  minLength,
  maxLength,
  min,
  positive,
  notNegative,
  composite,
  notOnlyRepeatedDigits,
  maxConsecutiveSameDigits,
  noRepeatedChars,
} from "./validators";

describe("required", () => {
  it("returns error for empty string", () => {
    expect(required("")).toBe("Campo obligatorio");
  });

  it("returns error for whitespace only", () => {
    expect(required("   ")).toBe("Campo obligatorio");
  });

  it("returns null for non-empty value", () => {
    expect(required("hola")).toBeNull();
  });

  it("returns error for zero (falsy value)", () => {
    expect(required(0)).toBe("Campo obligatorio");
  });
});

describe("minLength", () => {
  const validator = minLength(3);

  it("returns null when length >= min", () => {
    expect(validator("abc")).toBeNull();
  });

  it("returns error when too short", () => {
    expect(validator("ab")).toBe("Mínimo 3 caracteres");
  });

  it("returns null for empty (handled by required)", () => {
    expect(validator("")).toBeNull();
  });
});

describe("positive", () => {
  it("returns error for zero", () => {
    expect(positive("0")).toBe("Debe ser mayor a 0");
  });

  it("returns error for negative", () => {
    expect(positive("-5")).toBe("Debe ser mayor a 0");
  });

  it("returns null for positive", () => {
    expect(positive("100")).toBeNull();
  });

  it("returns null for empty", () => {
    expect(positive("")).toBeNull();
  });
});

describe("notNegative", () => {
  it("returns error for negative", () => {
    expect(notNegative("-5")).toBe("No puede ser negativo");
  });

  it("returns null for zero", () => {
    expect(notNegative("0")).toBeNull();
  });

  it("returns null for positive", () => {
    expect(notNegative("10")).toBeNull();
  });
});

describe("composite", () => {
  const validator = composite(required, positive);

  it("returns first error (required)", () => {
    expect(validator("")).toBe("Campo obligatorio");
  });

  it("returns second error (positive) when first passes", () => {
    expect(validator("0")).toBe("Debe ser mayor a 0");
  });

  it("returns null when all pass", () => {
    expect(validator("50")).toBeNull();
  });
});

describe("maxLength", () => {
  const validator = maxLength(5);

  it("returns null when within limit", () => {
    expect(validator("abcde")).toBeNull();
  });

  it("returns error when too long", () => {
    expect(validator("abcdef")).toBe("Máximo 5 caracteres");
  });
});

describe("min", () => {
  const validator = min(10);

  it("returns error when below min", () => {
    expect(validator("5")).toBe("Debe ser al menos 10");
  });

  it("returns null when at or above min", () => {
    expect(validator("10")).toBeNull();
  });
});

describe("notOnlyRepeatedDigits", () => {
  it("returns error when all digits are the same", () => {
    expect(notOnlyRepeatedDigits(7)("1111111")).toBe(
      "No pueden ser todos los dígitos iguales"
    );
  });

  it("returns null for mixed digits", () => {
    expect(notOnlyRepeatedDigits(7)("1234567")).toBeNull();
  });

  it("returns null for short value", () => {
    expect(notOnlyRepeatedDigits(7)("111")).toBeNull();
  });
});

describe("maxConsecutiveSameDigits", () => {
  it("returns error when 4+ consecutive same digits", () => {
    expect(maxConsecutiveSameDigits(3)("111100")).toBe(
      "No más de 4 dígitos iguales consecutivos"
    );
  });

  it("returns null when no long consecutive run", () => {
    expect(maxConsecutiveSameDigits(3)("1234567")).toBeNull();
  });
});

describe("noRepeatedChars", () => {
  it("returns error when 3+ consecutive same chars", () => {
    expect(noRepeatedChars(2)("aaab")).toBe(
      "No más de 3 caracteres iguales consecutivos"
    );
  });

  it("returns null when no repeats", () => {
    expect(noRepeatedChars(2)("abab")).toBeNull();
  });

  it("is case insensitive", () => {
    expect(noRepeatedChars(2)("AAab")).toBe(
      "No más de 3 caracteres iguales consecutivos"
    );
  });
});
