import { Link, useParams } from "react-router-dom";
import { formatCOP } from "../utils/formatCOP";
import { getOrderById } from "../utils/ordersStorage";
import styles from "../styles/OrderDetail.module.css";

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

const OrderDetail = () => {
  const { orderId } = useParams();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className={styles.container}>
        <h2>Detalle no disponible</h2>
        <p>No encontramos una orden con ese identificador.</p>
        <Link to="/account" className={styles.back}>
          Volver a mi cuenta
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.muted}>Pedido</p>
        <h2 className={styles.title}>{order.id}</h2>
        <p className={styles.muted}>
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <section className={`${styles.section} ${styles.customer}`}>
        <p>
          <strong>Cliente:</strong> {order.customer.fullName}
        </p>
        <p>
          <strong>Email:</strong> {order.customer.email}
        </p>
        <p>
          <strong>Ciudad:</strong> {order.customer.city}
        </p>
        <p>
          <strong>Envío:</strong>{" "}
          {SHIPPING_LABELS[order.shippingMethod] || order.shippingMethod}
        </p>
        <p>
          <strong>Pago:</strong>{" "}
          {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
        </p>
      </section>

      <section className={styles.section}>
        <h3 style={{ marginTop: 0 }}>Productos</h3>
        <div className={styles.items}>
          {order.items.map((item) => (
            <div key={item.product.id} className={styles.row}>
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
        </div>

        <div className={styles.summary}>
          <p style={{ marginTop: "1rem" }}>
            <strong>Subtotal:</strong> {formatCOP(order.subtotal)}
          </p>
          <p>
            <strong>Envío:</strong> {formatCOP(order.shippingCost)}
          </p>
          <p>
            <strong>Total:</strong> {formatCOP(order.total)}
          </p>
        </div>
      </section>

      <Link to="/account" className={styles.back}>
        Volver a mis compras
      </Link>
    </div>
  );
};

export default OrderDetail;
