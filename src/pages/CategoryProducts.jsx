import { useState } from 'react';
import { getStoredProducts } from '../utils/productsStorage';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import styles from '../styles/CategoryProducts.module.css';

const CategoryProducts = ({ category, onBack }) => {
  const allProducts = getStoredProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 1. Filtramos por la categoría seleccionada y por el buscador
  const filteredProducts = allProducts.filter(p => 
    p.categoria === category && 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>← Volver al Home</button>
        <h1>Explorando: {category}</h1>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder={`Buscar en ${category}...`} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onShowDetails={() => setSelectedProduct(product)}
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