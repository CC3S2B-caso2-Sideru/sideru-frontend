import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const ProductoCard = ({ producto }) => {
  const [imgError, setImgError] = useState(false);

  // ← DENTRO del componente
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-img-wrapper">
        {!imgError && producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={() => setImgError(true)}
            className="product-img"
          />
        ) : (
          <div className="product-img-placeholder">
            <span>🔩</span>
          </div>
        )}

        <span
          className={`stock-badge ${
            producto.stock === 0
              ? "out"
              : producto.stock < 10
              ? "low"
              : "ok"
          }`}
        >
          {producto.stock === 0
            ? "Agotado"
            : producto.stock < 10
            ? `Últimas ${producto.stock} uds.`
            : "Disponible"}
        </span>
      </div>

      <div className="product-info">
        <span className="product-sku">
          {producto.sku}
        </span>

        <h3 className="product-name">
          {producto.nombre}
        </h3>

        <div className="product-footer">
          <span className="product-price">
            S/{" "}
            {Number(producto.precio).toLocaleString(
              "es-PE",
              {
                minimumFractionDigits: 2,
              }
            )}
          </span>

          <button
            className="btn-add"
            disabled={producto.stock === 0}
            onClick={() => addToCart(producto)}
          >
            {producto.stock === 0
              ? "Agotado"
              : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductoCard;