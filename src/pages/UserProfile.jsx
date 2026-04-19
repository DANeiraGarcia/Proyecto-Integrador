import { getStoredOrders } from "../utils/ordersStorage";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/UserProfile.module.css";

const mockUser = {
  name: "Daniel Torres",
  email: "danie@tiendatech.com",
  city: "Cali",
  memberSince: "2026-04-01",
};

const UserProfile = () => {
  const { user } = useAuth();
  const orders = getStoredOrders();

  const profileData = {
    name: user?.fullName || mockUser.name,
    email: user?.email || mockUser.email,
    city: mockUser.city,
    memberSince: mockUser.memberSince,
  };

  return (
    <section className={styles.profile}>
      <div>
        <p className={styles.label}>Mi cuenta</p>
        <h2 className={styles.name}>{profileData.name}</h2>
        <p className={styles.email}>{profileData.email}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <strong>Ciudad</strong>
          <p className={styles.value}>{profileData.city}</p>
        </div>
        <div className={styles.card}>
          <strong>Miembro desde</strong>
          <p className={styles.value}>{profileData.memberSince}</p>
        </div>
        <div className={styles.card}>
          <strong>Compras realizadas</strong>
          <p className={styles.value}>{orders.length}</p>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
