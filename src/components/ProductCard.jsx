import { useState } from 'react';
import styles from '../styles/ProductCard.module.css';
import { formatCOP } from '../utils/formatCOP';

// 1. Agregamos onEdit y onDelete a las props
const ProductCard = ({ product, onEdit, onDelete }) => {
  // 2. Cambiamos el contador por un booleano (Like Switch)
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.card}>
      <img src={product.imagen} alt={product.nombre} className={styles.image} />
      <h3>{product.nombre}</h3>
      <p>{product.categoria}</p>
      <p><strong>{formatCOP(product.precio)}</strong></p>
      
      {/* 3. Mostramos el Stock (Requerimiento Semana 04) */}
      <p className={styles.stock}>Stock: {product.stock} unidades</p>
      
      <div className={styles.cardActions}>
        <button 
          className={`${styles.likeButton} ${isLiked ? styles.active : ''}`} 
          onClick={toggleLike}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>

        {/* 4. Nuevos botones de mantenimiento (CRUD) */}
        <button className={styles.editButton} onClick={onEdit}>
          ✏️ Editar
        </button>
        <button className={styles.deleteButton} onClick={onDelete}>
          🗑️ Borrar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;