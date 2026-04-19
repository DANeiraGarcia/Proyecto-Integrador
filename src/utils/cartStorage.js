const CART_KEY = 'carrito_tienda';

export const getStoredCart = () => {
  const saved = localStorage.getItem(CART_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) => item && item.product && item.product.id && Number(item.quantity) > 0
    );
  } catch {
    return [];
  }
};

export const saveCart = (cartItems) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};
