import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/AuthPage.module.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contrasenas no coinciden.");
      return;
    }

    const result = register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/account", { replace: true });
  };

  return (
    <section className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Crear cuenta</h2>
        <p className={styles.subtitle}>
          Registra tus datos para comprar y consultar pedidos.
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.field}>
          Nombre completo
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          Correo
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          Contraseña
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </label>

        <label className={styles.field}>
          Confirmar contraseña
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={6}
            required
          />
        </label>

        <button className={styles.submit} type="submit">
          Registrarme
        </button>

        <p className={styles.alt}>
          Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
