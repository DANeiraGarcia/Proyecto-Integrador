import { useMemo, useState } from "react";
import { formatCOP } from "../utils/formatCOP";

const SHIPPING_OPTIONS = [
  { id: "estandar", label: "Envío estándar (3-5 días)", cost: 12000 },
  { id: "express", label: "Envío express (24-48 horas)", cost: 25000 },
  { id: "recoger", label: "Recoger en tienda", cost: 0 },
];

const PAYMENT_OPTIONS = [
  { id: "tarjeta", label: "Tarjeta débito/crédito" },
  { id: "pse", label: "PSE" },
  { id: "contraentrega", label: "Pago contraentrega" },
];

const Checkout = ({ cartItems = [], onBackToCart, onConfirmOrder }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [shippingMethod, setShippingMethod] = useState(SHIPPING_OPTIONS[0].id);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0].id);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc + Number(item.product.precio || 0) * Number(item.quantity || 0),
        0,
      ),
    [cartItems],
  );

  const shippingCost =
    SHIPPING_OPTIONS.find((option) => option.id === shippingMethod)?.cost || 0;

  const total = subtotal + shippingCost;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!cartItems.length || !onConfirmOrder) return;

    onConfirmOrder({
      customer: formData,
      shippingMethod,
      paymentMethod,
      shippingCost,
      subtotal,
      total,
    });
  };

  if (!cartItems.length) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Checkout</h2>
        <p>Tu carrito está vacío. Agrega productos para continuar.</p>
        <button
          onClick={onBackToCart}
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
          Volver al carrito
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Checkout</h2>
      <p>Completa los datos para confirmar tu pedido.</p>

      <form
        onSubmit={handleSubmit}
        style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}
      >
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={{ padding: "10px" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "10px" }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ padding: "10px" }}
          />
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleChange}
            required
            style={{ padding: "10px" }}
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Dirección de entrega"
          value={formData.address}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <textarea
          name="notes"
          placeholder="Notas adicionales (opcional)"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          style={{ padding: "10px", resize: "vertical" }}
        />

        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Método de envío</h3>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {SHIPPING_OPTIONS.map((option) => (
              <label
                key={option.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <span>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={option.id}
                    checked={shippingMethod === option.id}
                    onChange={(event) => setShippingMethod(event.target.value)}
                  />{" "}
                  {option.label}
                </span>
                <strong>
                  {option.cost ? formatCOP(option.cost) : "Gratis"}
                </strong>
              </label>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Método de pago</h3>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {PAYMENT_OPTIONS.map((option) => (
              <label key={option.id}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.id}
                  checked={paymentMethod === option.id}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />{" "}
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Resumen</h3>
          <p style={{ margin: "0.4rem 0" }}>Subtotal: {formatCOP(subtotal)}</p>
          <p style={{ margin: "0.4rem 0" }}>
            Envío: {shippingCost ? formatCOP(shippingCost) : "Gratis"}
          </p>
          <p style={{ margin: "0.4rem 0" }}>
            <strong>Total: {formatCOP(total)}</strong>
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onBackToCart}
            style={{
              background: "#555",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            Volver al carrito
          </button>
          <button
            type="submit"
            style={{
              background: "#0f7b0f",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            Confirmar pedido
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
