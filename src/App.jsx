import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import CategoryProducts from "./pages/CategoryProducts"; // <-- IMPORTAR
import UserProfile from "./pages/UserProfile";
import UserOrders from "./pages/UserOrders";
import OrderDetail from "./pages/OrderDetail";
import { getStoredCart, saveCart } from "./utils/cartStorage";
import { addOrder, getLatestOrder } from "./utils/ordersStorage";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => getStoredCart());
  const [latestOrder, setLatestOrder] = useState(() => getLatestOrder());

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const navigateToCategory = (cat) => {
    navigate(`/category/${encodeURIComponent(cat)}`);
  };

  const handleAddToCart = (product) => {
    if (!product || !product.id) return;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);

      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };

  const handleUpdateQuantity = (productId, nextQuantity) => {
    const quantity = Number(nextQuantity);

    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleConfirmOrder = ({
    customer,
    shippingMethod,
    paymentMethod,
    shippingCost,
    subtotal,
    total,
  }) => {
    if (!cartItems.length) return;

    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer,
      items: cartItems,
      shippingMethod,
      paymentMethod,
      shippingCost,
      subtotal,
      total,
    };

    addOrder(order);
    setLatestOrder(order);
    handleClearCart();
    navigate("/order-confirmation");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      <Header cartCount={cartCount} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onCategoryClick={navigateToCategory}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/products"
            element={<ProductList onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/category/:categoryName"
            element={<CategoryProducts onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
                onProceedToCheckout={handleProceedToCheckout}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                onBackToCart={() => navigate("/cart")}
                onConfirmOrder={handleConfirmOrder}
              />
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <OrderConfirmation
                order={latestOrder}
                onGoHome={() => navigate("/")}
                onGoProducts={() => navigate("/products")}
                onGoAccount={() => navigate("/account")}
              />
            }
          />
          <Route
            path="/account"
            element={
              <>
                <UserProfile />
                <UserOrders />
              </>
            }
          />
          <Route path="/account/orders/:orderId" element={<OrderDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
