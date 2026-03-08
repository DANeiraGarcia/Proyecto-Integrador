import { useState } from 'react';
import styles from '../styles/ProductCard.module.css';
import { formatCOP } from '../utils/formatCOP';

const ProductCard = ({ product }) => {
  const [likes, setLikes] = useState(0);

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p><strong>{formatCOP(product.price)}</strong></p>
      
      <button className={styles.likeButton} onClick={() => setLikes(likes + 1)}>
        ❤️ {likes}
      </button>
    </div>
  );
};

export default ProductCard;