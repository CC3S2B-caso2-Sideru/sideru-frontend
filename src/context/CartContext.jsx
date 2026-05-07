import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.sku === producto.sku
      );

      if (existing) {
        return prevCart.map((item) =>
          item.sku === producto.sku
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    });
  };

  const increaseQuantity = (sku) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.sku === sku
        ? {
            ...item,
            cantidad: item.cantidad + 1,
          }
        : item
    )
  );
};

const decreaseQuantity = (sku) => {
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.sku === sku
          ? {
              ...item,
              cantidad: item.cantidad - 1,
            }
          : item
      )
      .filter((item) => item.cantidad > 0)
  );
};

  const removeFromCart = (sku) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.sku !== sku)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  const totalPrice = cart.reduce(
  (acc, item) => acc + item.precio * item.cantidad,
  0
);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
        totalPrice,
        }}
    >
      {children}
    </CartContext.Provider>
  );
};



export const useCart = () => useContext(CartContext);