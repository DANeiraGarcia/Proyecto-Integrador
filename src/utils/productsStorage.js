import { initialProducts } from '../data/products';

export const getStoredProducts = () => {
  const saved = localStorage.getItem('productos_tienda');
  if (!saved) return initialProducts.map(p => normalizeProduct(p));
  
  const parsed = JSON.parse(saved);
  return parsed.map(p => normalizeProduct(p));
};

export const saveProducts = (products) => {
  localStorage.setItem('productos_tienda', JSON.stringify(products));
};

// Normalizamos para asegurar que TODOS tengan rating (Semana 05)
export const normalizeProduct = (product) => ({
  ...product,
  rating: product.rating || 0, // Si no tiene, le pone 0
  stock: product.stock || 0
});