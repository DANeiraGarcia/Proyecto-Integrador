import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import CategoryProducts from "./pages/CategoryProducts"; // <-- IMPORTAR
import { getStoredCart, saveCart } from "./utils/cartStorage";
import { addOrder } from "./utils/ordersStorage";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  // Nuevo estado para saber qué categoría mostrar
  const [activeCategory, setActiveCategory] = useState(null);
  const [cartItems, setCartItems] = useState(() => getStoredCart());
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  // Función para navegar a una categoría específica
  const navigateToCategory = (cat) => {
    setActiveCategory(cat);
    setPage("category");
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
    setPage("checkout");
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
    setPage("order-confirmation");
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <Home
            onCategoryClick={navigateToCategory}
            onAddToCart={handleAddToCart}
          />
        );
      case "category":
        return (
          <CategoryProducts
            category={activeCategory}
            onBack={() => setPage("home")}
            onAddToCart={handleAddToCart}
          />
        );
      case "products":
        return <ProductList onAddToCart={handleAddToCart} />;
      case "cart":
        return (
          <Cart
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onProceedToCheckout={handleProceedToCheckout}
          />
        );
      case "checkout":
        return (
          <Checkout
            cartItems={cartItems}
            onBackToCart={() => setPage("cart")}
            onConfirmOrder={handleConfirmOrder}
          />
        );
      case "order-confirmation":
        return (
          <OrderConfirmation
            order={latestOrder}
            onGoHome={() => setPage("home")}
            onGoProducts={() => setPage("products")}
          />
        );
      default:
        return (
          <Home
            onCategoryClick={navigateToCategory}
            onAddToCart={handleAddToCart}
          />
        );
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      <Header setPage={setPage} cartCount={cartCount} />
      <main className="main-content">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
