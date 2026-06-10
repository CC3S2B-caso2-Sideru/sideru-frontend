import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Paginacion from "./Paginacion";

describe("Paginacion", () => {
  it("returns null when only 1 page", () => {
    const { container } = render(
      <Paginacion page={0} totalPages={1} onPageChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders page buttons for 3 pages", () => {
    const { getByText } = render(
      <Paginacion page={0} totalPages={3} onPageChange={vi.fn()} />
    );
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });

  it("disables prev buttons on first page", () => {
    const { container } = render(
      <Paginacion page={0} totalPages={3} onPageChange={vi.fn()} />
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons[0]).toBeDisabled(); // ChevronsLeft
    expect(buttons[1]).toBeDisabled(); // ChevronLeft
  });

  it("disables next buttons on last page", () => {
    const { container } = render(
      <Paginacion page={2} totalPages={3} onPageChange={vi.fn()} />
    );
    const buttons = container.querySelectorAll("button");
    const last = buttons.length - 1;
    expect(buttons[last - 1]).toBeDisabled(); // ChevronRight
    expect(buttons[last]).toBeDisabled(); // ChevronsRight
  });

  it("calls onPageChange on page click", async () => {
    const onPageChange = vi.fn();
    const { getByText } = render(
      <Paginacion page={0} totalPages={5} onPageChange={onPageChange} />
    );
    const user = userEvent.setup();
    await user.click(getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("shows ellipsis for many pages", () => {
    const { getAllByText } = render(
      <Paginacion page={5} totalPages={10} onPageChange={vi.fn()} />
    );
    const ellipsis = getAllByText("...");
    expect(ellipsis.length).toBeGreaterThanOrEqual(1);
  });

  it("highlights active page with primary color", () => {
    const { getByText } = render(
      <Paginacion page={1} totalPages={3} onPageChange={vi.fn()} />
    );
    const activePage = getByText("2");
    expect(activePage).toHaveClass("bg-primary");
  });
});
