import { useState } from 'react';
import { getStoredProducts } from '../utils/productsStorage';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import styles from '../styles/Home.module.css';

const Home = () => {
  const products = getStoredProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 1. Extraemos las categorías únicas
  const categories = [...new Set(products.map(p => p.categoria))];

  // 2. Función para obtener productos por categoría ordenados por Rating
  const getProductsByCategory = (cat) => {
    return products
      .filter(p => p.categoria === cat)
      .sort((a, b) => b.rating - a.rating) // Los mejores primero
      .slice(0, 4); // Mostramos solo los 4 mejores en el Home
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.hero}>
        <h1>Repuestos de Alta Calidad</h1>
        <p>Los mejores calificados por la comunidad AME</p>
      </header>

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
            <button className={styles.viewMoreBtn}>Ver todo {category}</button>
          </div>
          
          <div className={styles.productsGrid}>
            {getProductsByCategory(category).map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onShowDetails={() => setSelectedProduct(product)}
                // En el Home solemos ocultar Editar/Borrar para usuarios
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;