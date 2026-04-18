import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/AuthPage.module.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const fromPath = location.state?.from || "/account";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const result = login(formData);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(fromPath, { replace: true });
  };

  return (
    <section className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Iniciar sesion</h2>
        <p className={styles.subtitle}>
          Accede para ver tu cuenta y tus compras.
        </p>

        {error && <p className={styles.error}>{error}</p>}

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
          Contrasena
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button className={styles.submit} type="submit">
          Entrar
        </button>

        <p className={styles.alt}>
          No tienes cuenta? <Link to="/register">Registrarse</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
