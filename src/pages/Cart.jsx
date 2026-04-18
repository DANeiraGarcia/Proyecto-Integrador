import { formatCOP } from "../utils/formatCOP";

const Cart = ({ cartItems = [], onRemoveItem }) => {
  const total = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.product.precio || 0) * Number(item.quantity || 0),
    0,
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Tu Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <p>Aún no has agregado productos.</p>
      ) : (
        <>
          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            {cartItems.map((item) => (
              <article
                key={item.product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{item.product.nombre}</h3>
                  <p style={{ margin: "0.3rem 0" }}>
                    Cantidad: {item.quantity}
                  </p>
                  <p style={{ margin: 0 }}>
                    Subtotal:{" "}
                    {formatCOP(
                      Number(item.product.precio || 0) *
                        Number(item.quantity || 0),
                    )}
                  </p>
                </div>

                <button
                  onClick={() => onRemoveItem && onRemoveItem(item.product.id)}
                  style={{
                    background: "#b00020",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <h3 style={{ marginTop: "1.5rem" }}>Total: {formatCOP(total)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
