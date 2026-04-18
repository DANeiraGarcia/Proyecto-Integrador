import { useNavigate } from "react-router-dom";
import { formatCOP } from "../utils/formatCOP";
import { getLatestOrder } from "../utils/ordersStorage";
import styles from "../styles/OrderConfirmation.module.css";

const SHIPPING_LABELS = {
  estandar: "Envío estándar",
  express: "Envío express",
  recoger: "Recoger en tienda",
};

const PAYMENT_LABELS = {
  tarjeta: "Tarjeta débito/crédito",
  pse: "PSE",
  contraentrega: "Pago contraentrega",
};

const OrderConfirmation = ({ order, onGoHome, onGoProducts, onGoAccount }) => {
  const navigate = useNavigate();
  const displayedOrder = order || getLatestOrder();

  if (!displayedOrder) {
    return (
      <div className={styles.container}>
        <h2>Pedido no disponible</h2>
        <p>No encontramos la información de la orden.</p>
        <button
          onClick={onGoHome}
          className={`${styles.button} ${styles.primary}`}
          style={{ marginTop: "1rem" }}
        >
          Ir al inicio
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Pedido confirmado</h2>
      <p>Gracias por tu compra. Tu orden fue registrada correctamente.</p>

      <div className={styles.box}>
        <p className={styles.line}>
          <strong>Número de pedido:</strong> {displayedOrder.id}
        </p>
        <p className={styles.line}>
          <strong>Fecha:</strong>{" "}
          {new Date(displayedOrder.createdAt).toLocaleString()}
        </p>
        <p className={styles.line}>
          <strong>Cliente:</strong> {displayedOrder.customer.fullName}
        </p>
        <p className={styles.line}>
          <strong>Correo:</strong> {displayedOrder.customer.email}
        </p>
        <p className={styles.line}>
          <strong>Envío:</strong>{" "}
          {SHIPPING_LABELS[displayedOrder.shippingMethod] ||
            displayedOrder.shippingMethod}
        </p>
        <p className={styles.line}>
          <strong>Pago:</strong>{" "}
          {PAYMENT_LABELS[displayedOrder.paymentMethod] ||
            displayedOrder.paymentMethod}
        </p>
      </div>

      <div className={styles.box}>
        <h3 style={{ marginTop: 0 }}>Productos</h3>
        {displayedOrder.items.map((item) => (
          <div key={item.product.id} className={styles.itemRow}>
            <span>
              {item.product.nombre} x {item.quantity}
            </span>
            <strong>
              {formatCOP(
                Number(item.product.precio || 0) * Number(item.quantity || 0),
              )}
            </strong>
          </div>
        ))}

        <p style={{ marginTop: "1rem" }}>
          <strong>Total pagado: {formatCOP(displayedOrder.total)}</strong>
        </p>
      </div>

      <div className={styles.actions}>
        <button
          onClick={onGoHome}
          className={`${styles.button} ${styles.primary}`}
        >
          Volver al inicio
        </button>
        <button
          onClick={onGoProducts}
          className={`${styles.button} ${styles.success}`}
        >
          Seguir comprando
        </button>
        <button
          onClick={() => (onGoAccount ? onGoAccount() : navigate("/account"))}
          className={`${styles.button} ${styles.neutral}`}
        >
          Ver mis compras
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
