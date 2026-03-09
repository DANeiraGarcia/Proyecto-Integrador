import { useState } from 'react';
import { getStoredProducts } from '../utils/productsStorage';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import styles from '../styles/Home.module.css';

// Recibimos onCategoryClick desde App.jsx para la navegación
const Home = ({ onCategoryClick }) => {
  const products = getStoredProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 1. Extraemos las categorías únicas (ej: Gaming, Periféricos, Hardware)
  const categories = [...new Set(products.map(p => p.categoria))];

  // 2. Función para obtener productos destacados por categoría (Top 4 por Rating)
  const getProductsByCategory = (cat) => {
    return products
      .filter(p => p.categoria === cat)
      .sort((a, b) => b.rating - a.rating) // Ordenamos: los mejores primero
      .slice(0, 4); // Solo mostramos los 4 más destacados en el Home
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.hero}>
        <h1>Tecnología de Vanguardia</h1>
        <p>Los gadgets y componentes mejor calificados por expertos</p>
      </header>

      {/* Modal que se dispara al hacer clic en ver detalles de cualquier tarjeta */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {categories.map(category => (
        <section key={category} className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <h2>{category}</h2>
            {/* Este botón ahora activa la navegación a la página de categoría */}
            <button 
              className={styles.viewMoreBtn}
              onClick={() => onCategoryClick(category)}
            >
              Ver todo en {category}
            </button>
          </div>
          
          <div className={styles.productsGrid}>
            {getProductsByCategory(category).map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onShowDetails={() => setSelectedProduct(product)}
                // No pasamos onEdit ni onDelete aquí para mantener el Home limpio
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;