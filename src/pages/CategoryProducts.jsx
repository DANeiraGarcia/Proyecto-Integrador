import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStoredProducts } from "../utils/productsStorage";
import ProductCard from "../components/ProductCard";
import ProductDetailsModal from "../components/ProductDetailsModal";
import styles from "../styles/CategoryProducts.module.css";

const CategoryProducts = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const allProducts = getStoredProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  let decodedCategory = "";
  try {
    decodedCategory = decodeURIComponent(categoryName || "");
  } catch {
    decodedCategory = categoryName || "";
  }

  // 1. Filtramos por la categoría seleccionada y por el buscador
  const filteredProducts = allProducts.filter(
    (p) =>
      p.categoria === decodedCategory &&
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          ← Volver al Home
        </button>
        <h1>Explorando: {decodedCategory}</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder={`Buscar en ${decodedCategory}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}

      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onShowDetails={() => setSelectedProduct(product)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No se encontraron productos que coincidan con "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
