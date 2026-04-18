import styles from "../styles/ProductDetailsModal.module.css";
import { formatCOP } from "../utils/formatCOP";

const ProductDetailsModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.modalBody}>
          <div className={styles.imageContainer}>
            <img src={product.imagen} alt={product.nombre} />
          </div>

          <div className={styles.infoContainer}>
            <span className={styles.categoryTag}>{product.categoria}</span>
            <h2>{product.nombre}</h2>
            <div className={styles.rating}>
              {"⭐".repeat(Math.floor(product.rating || 0))}
              <span>({product.rating || 0})</span>
            </div>

            <p className={styles.price}>{formatCOP(product.precio)}</p>
            <p className={styles.description}>
              Información técnica detallada del producto. Este repuesto cumple
              con los estándares de calidad para tu vehículo.
            </p>

            <div className={styles.details}>
              <p>
                <strong>Disponibilidad:</strong> {product.stock} unidades
              </p>
              <p>
                <strong>ID Producto:</strong> {product.id}
              </p>
            </div>

            <button
              className={styles.addToCartButton}
              onClick={() => onAddToCart && onAddToCart(product)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
