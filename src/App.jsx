import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import CategoryProducts from "./pages/CategoryProducts"; // <-- IMPORTAR
import { getStoredCart, saveCart } from "./utils/cartStorage";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  // Nuevo estado para saber qué categoría mostrar
  const [activeCategory, setActiveCategory] = useState(null);
  const [cartItems, setCartItems] = useState(() => getStoredCart());

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
          <Cart cartItems={cartItems} onRemoveItem={handleRemoveFromCart} />
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
