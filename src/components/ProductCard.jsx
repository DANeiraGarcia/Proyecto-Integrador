import { useState } from "react";
import styles from "../styles/ProductCard.module.css";
import { formatCOP } from "../utils/formatCOP";

// 1. Agregamos onEdit y onDelete a las props
const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onShowDetails,
  onAddToCart,
}) => {
  // 2. Cambiamos el contador por un booleano (Like Switch)
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.card}>
      <img
        src={product.imagen}
        alt={product.nombre}
        className={styles.image}
        onClick={onShowDetails} // Clic en imagen abre modal
        style={{ cursor: "pointer" }}
      />

      <h3>{product.nombre}</h3>
      <p>{product.categoria}</p>
      <div className={styles.rating}>
        {"⭐".repeat(Math.floor(product.rating || 0))}
        <span style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#444" }}>
          {product.rating ? `${product.rating}/5` : "Sin calificación"}
        </span>
      </div>
      {/* ------------------------------------ */}
      <p>
        <strong>{formatCOP(product.precio)}</strong>
      </p>

      <p className={styles.stock}>Stock: {product.stock} unidades</p>

      <div className={styles.cardActions}>
        <button className={styles.detailsButton} onClick={onShowDetails}>
          🔍 Ver Detalles
        </button>
        {onAddToCart && (
          <button
            className={styles.detailsButton}
            onClick={() => onAddToCart(product)}
            style={{ backgroundColor: "#0f7b0f" }}
          >
            🛒 Agregar
          </button>
        )}
        <button
          className={`${styles.likeButton} ${isLiked ? styles.active : ""}`}
          onClick={toggleLike}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

        {/* 4. Nuevos botones de mantenimiento (CRUD) */}
        {onEdit && (
          <button className={styles.editButton} onClick={onEdit}>
            ✏️ Editar
          </button>
        )}
        {onDelete && (
          <button className={styles.deleteButton} onClick={onDelete}>
            🗑️ Borrar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
