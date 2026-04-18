const ORDERS_KEY = "ordenes_tienda";

export const getStoredOrders = () => {
  const saved = localStorage.getItem(ORDERS_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const addOrder = (order) => {
  const currentOrders = getStoredOrders();
  const updatedOrders = [order, ...currentOrders];
  saveOrders(updatedOrders);
  return updatedOrders;
};

export const getOrderById = (orderId) => {
  const orders = getStoredOrders();
  return orders.find((order) => order.id === orderId) || null;
};

export const getLatestOrder = () => {
  const orders = getStoredOrders();
  return orders[0] || null;
};

