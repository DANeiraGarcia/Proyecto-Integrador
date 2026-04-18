import { getStoredOrders } from "../utils/ordersStorage";
import OrderCard from "../components/OrderCard";

const UserOrders = () => {
  const orders = getStoredOrders();

  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <div>
        <h2 style={{ marginBottom: "0.25rem" }}>Mis compras</h2>
        <p style={{ marginTop: 0 }}>
          Aquí puedes revisar tus pedidos guardados.
        </p>
      </div>

      {orders.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px dashed #bbb",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          <p style={{ margin: 0 }}>Todavía no tienes pedidos registrados.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UserOrders;
