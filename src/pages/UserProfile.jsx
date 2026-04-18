import { getStoredOrders } from "../utils/ordersStorage";

const mockUser = {
  name: "Daniel Torres",
  email: "danie@tiendatech.com",
  city: "Cali",
  memberSince: "2026-04-01",
};

const UserProfile = () => {
  const orders = getStoredOrders();

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #003366, #0f4c81)",
        color: "white",
        borderRadius: "16px",
        padding: "1.5rem",
        display: "grid",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <div>
        <p style={{ margin: 0, opacity: 0.8 }}>Mi cuenta</p>
        <h2 style={{ margin: "0.35rem 0" }}>{mockUser.name}</h2>
        <p style={{ margin: 0 }}>{mockUser.email}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <strong>Ciudad</strong>
          <p style={{ margin: "0.4rem 0 0" }}>{mockUser.city}</p>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <strong>Miembro desde</strong>
          <p style={{ margin: "0.4rem 0 0" }}>{mockUser.memberSince}</p>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <strong>Compras realizadas</strong>
          <p style={{ margin: "0.4rem 0 0" }}>{orders.length}</p>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
