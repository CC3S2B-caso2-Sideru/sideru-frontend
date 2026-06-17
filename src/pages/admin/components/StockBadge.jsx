import clsx from "clsx";

const stockVariant = (stock, stockMinimo) => {
  if (stock === 0) return "bg-red-100 text-red-800 border border-red-200";
  if (stockMinimo != null && stock <= stockMinimo)
    return "bg-yellow-100 text-yellow-800 border border-yellow-200";
  return "bg-green-100 text-green-800 border border-green-200";
};

const StockBadge = ({ stock, stockMinimo }) => (
  <span
    className={clsx(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
      stockVariant(stock, stockMinimo)
    )}
  >
    {stock}
  </span>
);

export default StockBadge;
