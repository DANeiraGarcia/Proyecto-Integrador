import { getStoredOrders } from "../utils/ordersStorage";
import OrderCard from "../components/OrderCard";
import styles from "../styles/UserOrders.module.css";

const UserOrders = () => {
  const orders = getStoredOrders();

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Mis compras</h2>
        <p>Aquí puedes revisar tus pedidos guardados.</p>
      </div>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <p style={{ margin: 0 }}>Todavía no tienes pedidos registrados.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UserOrders;
