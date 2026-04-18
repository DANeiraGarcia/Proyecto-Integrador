import { Link, useParams } from "react-router-dom";
import { formatCOP } from "../utils/formatCOP";
import { getOrderById } from "../utils/ordersStorage";

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
      <div style={{ padding: "2rem" }}>
        <h2>Detalle no disponible</h2>
        <p>No encontramos una orden con ese identificador.</p>
        <Link
          to="/account"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            background: "#003366",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            padding: "10px 14px",
          }}
        >
          Volver a mi cuenta
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", display: "grid", gap: "1rem" }}>
      <div>
        <p style={{ margin: 0, opacity: 0.75 }}>Pedido</p>
        <h2 style={{ margin: "0.25rem 0" }}>{order.id}</h2>
        <p style={{ margin: 0 }}>
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <section
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "1rem",
          display: "grid",
          gap: "0.35rem",
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Cliente:</strong> {order.customer.fullName}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Email:</strong> {order.customer.email}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Ciudad:</strong> {order.customer.city}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Envío:</strong>{" "}
          {SHIPPING_LABELS[order.shippingMethod] || order.shippingMethod}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Pago:</strong>{" "}
          {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
        </p>
      </section>

      <section
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "1rem",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Productos</h3>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {order.items.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "0.5rem",
              }}
            >
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

        <p style={{ marginTop: "1rem" }}>
          <strong>Subtotal:</strong> {formatCOP(order.subtotal)}
        </p>
        <p style={{ margin: "0.35rem 0" }}>
          <strong>Envío:</strong> {formatCOP(order.shippingCost)}
        </p>
        <p style={{ margin: "0.35rem 0 0" }}>
          <strong>Total:</strong> {formatCOP(order.total)}
        </p>
      </section>

      <Link
        to="/account"
        style={{
          width: "fit-content",
          background: "#0f7b0f",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
          padding: "10px 14px",
        }}
      >
        Volver a mis compras
      </Link>
    </div>
  );
};

export default OrderDetail;
