import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductoFormModal from "./ProductoFormModal";

vi.mock("../../../services/productos.service", () => ({
  fetchCategorias: vi.fn().mockResolvedValue({
    data: [{ id: 1, nombre: "Aceros" }],
  }),
}));

describe("ProductoFormModal", () => {
  const defaultProps = {
    producto: null,
    onSave: vi.fn(),
    onClose: vi.fn(),
  };

  it("renders create form with required fields", async () => {
    render(<ProductoFormModal {...defaultProps} />);

    expect(await screen.findByText("Nuevo producto")).toBeInTheDocument();
    expect(screen.getByText("SKU *")).toBeInTheDocument();
    expect(screen.getByText("Nombre *")).toBeInTheDocument();
    expect(screen.getByText("Precio (S/) *")).toBeInTheDocument();
    expect(screen.getByText("Categoría *")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /crear/i })
    ).toBeInTheDocument();
  });

  it("renders edit form with pre-filled title", () => {
    const producto = {
      sku: "TUB-001",
      nombre: "Tubo",
      precio: "100",
      stock: "50",
      stockMinimo: "10",
      categoria: "Aceros",
    };
    render(<ProductoFormModal {...defaultProps} producto={producto} />);

    expect(screen.getByText("Editar producto")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /actualizar/i })
    ).toBeInTheDocument();
  });

  it("closes when clicking overlay", async () => {
    const onClose = vi.fn();
    render(<ProductoFormModal {...defaultProps} onClose={onClose} />);

    const user = userEvent.setup();
    // The overlay is the first fixed button
    const buttons = screen.getAllByRole("button");
    const overlay = buttons.find(
      (b) =>
        b.className.includes("fixed") && b.className.includes("inset-0")
    );
    await user.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });
});
