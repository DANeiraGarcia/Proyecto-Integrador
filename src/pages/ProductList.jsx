import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import styles from '../styles/ProductList.module.css';

const ProductList = () => {
  return (
    <div className={styles.container}>
      <h1>Listado de Productos</h1>
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;