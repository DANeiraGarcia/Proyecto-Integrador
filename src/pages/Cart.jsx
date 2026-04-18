import { formatCOP } from "../utils/formatCOP";

const Cart = ({
  cartItems = [],
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}) => {
  const total = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.product.precio || 0) * Number(item.quantity || 0),
    0,
  );

  const totalUnits = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
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
                  <div
                    style={{
                      margin: "0.3rem 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span>Cantidad:</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity &&
                        onUpdateQuantity(
                          item.product.id,
                          Number(item.quantity) - 1,
                        )
                      }
                      style={{
                        border: "1px solid #bbb",
                        background: "#f6f6f6",
                        borderRadius: "4px",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      onClick={() =>
                        onUpdateQuantity &&
                        onUpdateQuantity(
                          item.product.id,
                          Number(item.quantity) + 1,
                        )
                      }
                      style={{
                        border: "1px solid #bbb",
                        background: "#f6f6f6",
                        borderRadius: "4px",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
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

          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>Total: {formatCOP(total)}</h3>
              <p style={{ margin: "0.4rem 0 0 0" }}>Unidades: {totalUnits}</p>
            </div>

            <button
              onClick={() => onClearCart && onClearCart()}
              style={{
                background: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "10px 14px",
                cursor: "pointer",
              }}
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
