import { formatCOP } from "../utils/formatCOP";

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

const OrderConfirmation = ({ order, onGoHome, onGoProducts }) => {
  if (!order) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Pedido no disponible</h2>
        <p>No encontramos la información de la orden.</p>
        <button
          onClick={onGoHome}
          style={{
            marginTop: "1rem",
            background: "#003366",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 14px",
            cursor: "pointer",
          }}
        >
          Ir al inicio
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Pedido confirmado</h2>
      <p>Gracias por tu compra. Tu orden fue registrada correctamente.</p>

      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <p style={{ margin: "0.2rem 0" }}>
          <strong>Número de pedido:</strong> {order.id}
        </p>
        <p style={{ margin: "0.2rem 0" }}>
          <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
        <p style={{ margin: "0.2rem 0" }}>
          <strong>Cliente:</strong> {order.customer.fullName}
        </p>
        <p style={{ margin: "0.2rem 0" }}>
          <strong>Correo:</strong> {order.customer.email}
        </p>
        <p style={{ margin: "0.2rem 0" }}>
          <strong>Envío:</strong>{" "}
          {SHIPPING_LABELS[order.shippingMethod] || order.shippingMethod}
        </p>
        <p style={{ margin: "0.2rem 0" }}>
          <strong>Pago:</strong>{" "}
          {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Productos</h3>
        {order.items.map((item) => (
          <div
            key={item.product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "0.4rem 0",
              borderBottom: "1px solid #f0f0f0",
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

        <p style={{ marginTop: "1rem" }}>
          <strong>Total pagado: {formatCOP(order.total)}</strong>
        </p>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "0.8rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onGoHome}
          style={{
            background: "#003366",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 14px",
            cursor: "pointer",
          }}
        >
          Volver al inicio
        </button>
        <button
          onClick={onGoProducts}
          style={{
            background: "#0f7b0f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 14px",
            cursor: "pointer",
          }}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
