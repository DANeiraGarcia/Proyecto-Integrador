import { Link } from "react-router-dom";
import { formatCOP } from "../utils/formatCOP";

const OrderCard = ({ order }) => {
  const itemCount = order.items.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0,
  );

  return (
    <article
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1rem",
        display: "grid",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Pedido {order.id}</h3>
          <p style={{ margin: "0.25rem 0" }}>
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <strong>{formatCOP(order.total)}</strong>
      </div>

      <p style={{ margin: 0 }}>Productos: {itemCount}</p>
      <p style={{ margin: 0 }}>Envío: {order.shippingMethod}</p>

      <Link
        to={`/account/orders/${order.id}`}
        style={{
          marginTop: "0.25rem",
          textDecoration: "none",
          background: "#003366",
          color: "#fff",
          padding: "0.7rem 1rem",
          borderRadius: "8px",
          width: "fit-content",
        }}
      >
        Ver detalle
      </Link>
    </article>
  );
};

export default OrderCard;
