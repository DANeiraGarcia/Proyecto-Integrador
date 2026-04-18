import { Link } from "react-router-dom";
import { formatCOP } from "../utils/formatCOP";
import styles from "../styles/OrderCard.module.css";

const OrderCard = ({ order }) => {
  const itemCount = order.items.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0,
  );

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div>
          <h3 className={styles.title}>Pedido {order.id}</h3>
          <p className={styles.date}>
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <strong>{formatCOP(order.total)}</strong>
      </div>

      <p className={styles.meta}>Productos: {itemCount}</p>
      <p className={styles.meta}>Envío: {order.shippingMethod}</p>

      <Link to={`/account/orders/${order.id}`} className={styles.link}>
        Ver detalle
      </Link>
    </article>
  );
};

export default OrderCard;
