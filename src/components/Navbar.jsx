import { Link, NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { useAuth } from "../hooks/useAuth";

const Navbar = ({ cartCount }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to="/" className={styles.link}>
          MI TIENDA TECH
        </Link>
      </div>
      <ul className={styles.menu}>
        <li>
          <NavLink to="/" className={styles.link}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={styles.link}>
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={styles.link}>
            Carrito ({cartCount || 0})
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" className={styles.link}>
            Mi cuenta
          </NavLink>
        </li>
      </ul>

      {isAuthenticated ? (
        <div className={styles.authGroup}>
          <span className={styles.userName}>{user.fullName}</span>
          <button className={styles.auth} onClick={logout}>
            Salir
          </button>
        </div>
      ) : (
        <div className={styles.authGroup}>
          <NavLink to="/login" className={styles.link}>
            Login
          </NavLink>
          <NavLink to="/register" className={styles.auth}>
            Registrarse
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
