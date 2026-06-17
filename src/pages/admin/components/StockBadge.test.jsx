import { render } from "@testing-library/react";
import StockBadge from "./StockBadge";

describe("StockBadge", () => {
  it("shows red badge when stock is 0", () => {
    const { container } = render(<StockBadge stock={0} stockMinimo={10} />);
    const badge = container.firstChild;
    expect(badge).toHaveClass("bg-red-100", "text-red-800");
    expect(badge).toHaveTextContent("0");
  });

  it("shows yellow badge when stock <= stockMinimo but > 0", () => {
    const { container } = render(<StockBadge stock={3} stockMinimo={10} />);
    const badge = container.firstChild;
    expect(badge).toHaveClass("bg-yellow-100", "text-yellow-800");
    expect(badge).toHaveTextContent("3");
  });

  it("shows green badge when stock > stockMinimo", () => {
    const { container } = render(<StockBadge stock={50} stockMinimo={10} />);
    const badge = container.firstChild;
    expect(badge).toHaveClass("bg-green-100", "text-green-800");
    expect(badge).toHaveTextContent("50");
  });

  it("shows green badge when no stockMinimo defined", () => {
    const { container } = render(<StockBadge stock={50} />);
    const badge = container.firstChild;
    expect(badge).toHaveClass("bg-green-100", "text-green-800");
  });
});
