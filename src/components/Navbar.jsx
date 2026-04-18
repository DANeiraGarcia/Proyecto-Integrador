import { Link, NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ cartCount }) => {
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
      <NavLink to="/account" className={styles.auth}>
        Mi cuenta
      </NavLink>
    </nav>
  );
};

export default Navbar;
