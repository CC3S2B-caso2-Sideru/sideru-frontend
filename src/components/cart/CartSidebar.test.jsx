import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartSidebar from './CartSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import { submitCotizacion } from '../../services/cotizaciones.service';

/**
 * Pruebas unitarias para el componente CartSidebar usando Vitest y React Testing Library.
 * Mockeamos los módulos externos de contexto y servicio para aislar y simular el comportamiento de la barra del carrito.
 */

// Simulación del contexto de Autenticación
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Simulación del contexto del Carrito de Compras
vi.mock('../../contexts/CartContext', () => ({
  useCart: vi.fn(),
}));

// Simulación del contexto de Alertas (Toasts)
vi.mock('../../contexts/ToastContext', () => ({
  useToast: vi.fn(),
}));

// Simulación de la navegación de React Router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Simulación del servicio de API que conecta con el backend
vi.mock('../../services/cotizaciones.service', () => ({
  submitCotizacion: vi.fn(),
}));

describe('Componente CartSidebar', () => {
  // Declaración de funciones mock locales reutilizables
  const mockClearCart = vi.fn();
  const mockIncreaseQuantity = vi.fn();
  const mockDecreaseQuantity = vi.fn();
  const mockRemoveFromCart = vi.fn();
  const mockOnClose = vi.fn();
  const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useToast.mockReturnValue(mockToast);
  });

  /**
   * Prueba 1: Renderizado del carrito vacío.
   * Verifica que se muestre el texto de carrito vacío y que no se exponga la opción de enviar solicitud.
   */
  it('renderiza "Tu carrito esta vacio" cuando el carrito esta vacio', () => {
    // --- 1. ARRANGE ---
    useAuth.mockReturnValue({ token: null });
    useCart.mockReturnValue({
      cart: [],
      totalPrice: 0,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    // ACT ---
    render(<CartSidebar isOpen={true} onClose={mockOnClose} />);

    // ASSERT ---
    expect(screen.getByText('Tu carrito esta vacio.')).toBeInTheDocument();
    expect(screen.queryByText('Solicitar cotizacion')).not.toBeInTheDocument();
  });

  /**
   * Prueba 2: Visualización de productos cargados.
   * Comprueba el renderizado del nombre del producto, cantidades, precio unitario y total.
   */
  it('renderiza los items del carrito y muestra el nombre, cantidad, precio unitario y total correctos', () => {
    // ARRANGE ---
    useAuth.mockReturnValue({ token: 'mock-token' });
    const cartItems = [
      { sku: 'SKU001', nombre: 'Clavo de Acero 2"', precio: 15.5, cantidad: 3, imagen: null },
      { sku: 'SKU002', nombre: 'Tubo de Fierro 1"', precio: 45.0, cantidad: 1, imagen: null },
    ];
    useCart.mockReturnValue({
      cart: cartItems,
      totalPrice: 91.5,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    // ACT ---
    render(<CartSidebar isOpen={true} onClose={mockOnClose} />);

    // ASSERT ---
    expect(screen.getByText('Clavo de Acero 2"')).toBeInTheDocument();
    expect(screen.getByText('Tubo de Fierro 1"')).toBeInTheDocument();
    expect(screen.getByText('Total: S/ 91.50')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // Valida cantidad del clavo
    expect(screen.getByText('1')).toBeInTheDocument(); // Valida cantidad del tubo
    expect(screen.getByRole('button', { name: 'Solicitar cotizacion' })).toBeInTheDocument();
  });

  /**
   * Prueba 3: Interacciones del usuario (Botones de control del carrito).
   * Comprueba que al hacer clic en +, - y eliminar, se llame a las funciones correspondientes del CartContext.
   */
  it('dispara las acciones del CartContext al hacer clic en los botones de incrementar, decrementar o eliminar', () => {
    // ARRANGE ---
    useAuth.mockReturnValue({ token: 'mock-token' });
    const cartItems = [
      { sku: 'SKU001', nombre: 'Clavo de Acero 2"', precio: 15.5, cantidad: 3, imagen: null },
    ];
    useCart.mockReturnValue({
      cart: cartItems,
      totalPrice: 46.5,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    // ACT ---
    render(<CartSidebar isOpen={true} onClose={mockOnClose} />);

    // ACT & ASSERT (Aumentar) ---
    const increaseBtns = screen.getAllByText('+');
    fireEvent.click(increaseBtns[0]);
    expect(mockIncreaseQuantity).toHaveBeenCalledWith('SKU001');

    // ACT & ASSERT (Disminuir) ---
    const decreaseBtns = screen.getAllByText('-');
    fireEvent.click(decreaseBtns[0]);
    expect(mockDecreaseQuantity).toHaveBeenCalledWith('SKU001');

    // ACT & ASSERT (Eliminar) ---
    const removeBtn = screen.getByText('Eliminar');
    fireEvent.click(removeBtn);
    expect(mockRemoveFromCart).toHaveBeenCalledWith('SKU001');
  });

  /**
   * Prueba 4: Redirección si el usuario no ha iniciado sesión.
   * Caso: Cliente invitado (sin token) pulsa "Solicitar cotizacion".
   * Debe cerrar el sidebar y redirigir al Login pidiéndole iniciar sesión.
   */
  it('redirige a /login si el usuario no esta autenticado y hace clic en "Solicitar cotizacion"', async () => {
    // ARRANGE ---
    useAuth.mockReturnValue({ token: null }); // Sin sesión activa
    const cartItems = [
      { sku: 'SKU001', nombre: 'Clavo de Acero 2"', precio: 15.5, cantidad: 2, imagen: null },
    ];
    useCart.mockReturnValue({
      cart: cartItems,
      totalPrice: 31.0,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    // ACT ---
    render(<CartSidebar isOpen={true} onClose={mockOnClose} />);
    const checkoutBtn = screen.getByRole('button', { name: 'Solicitar cotizacion' });
    fireEvent.click(checkoutBtn);

    // ASSERT ---
    expect(mockOnClose).toHaveBeenCalled(); // Debe cerrar el carrito
    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { message: 'Iniciar sesion para cotizar' }, // Pasa estado para mostrar alerta en Login
    });
    expect(submitCotizacion).not.toHaveBeenCalled(); // No debe disparar la llamada HTTP de cotización
  });

  /**
   * Prueba 5: Flujo completo exitoso.
   * Caso: Cliente autenticado pulsa "Solicitar cotizacion" y la llamada API responde exitosamente.
   * Debe enviar la cotización, avisar al usuario, limpiar el carrito y redirigir a solicitudes.
   */
  it('envia la cotizacion, muestra toast de exito, limpia el carrito y redirige a /solicitudes tras un envio exitoso', async () => {
    // ARRANGE ---
    useAuth.mockReturnValue({ token: 'mock-token' }); // Sesión activa
    const cartItems = [
      { sku: 'SKU001', nombre: 'Clavo de Acero 2"', precio: 10.0, cantidad: 5, imagen: null },
    ];
    useCart.mockReturnValue({
      cart: cartItems,
      totalPrice: 50.0,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });
    submitCotizacion.mockResolvedValueOnce({ data: { id: 1 } }); // API mock responde éxito

    // ACT ---
    render(<CartSidebar isOpen={true} onClose={mockOnClose} />);
    const checkoutBtn = screen.getByRole('button', { name: 'Solicitar cotizacion' });
    fireEvent.click(checkoutBtn);

    // ASSERT (Espera asíncrona usando waitFor) ---
    await waitFor(() => {
      // Verifica que mapea los campos de carro al formato de request backend: [{sku, cantidad}]
      expect(submitCotizacion).toHaveBeenCalledWith([
        { sku: 'SKU001', cantidad: 5 },
      ]);
      expect(mockToast.success).toHaveBeenCalledWith('Solicitud enviada'); // Mensaje flotante de éxito
      expect(mockClearCart).toHaveBeenCalled(); // Carrito queda vacío
      expect(mockOnClose).toHaveBeenCalled(); // Se cierra sidebar
      expect(mockNavigate).toHaveBeenCalledWith('/solicitudes'); // Redirección al historial
    });
  });
});
