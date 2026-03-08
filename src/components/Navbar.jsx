import styles from '../styles/Navbar.module.css';

const Navbar = ({ setPage }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span onClick={() => setPage('home')} className={styles.link}>MI TIENDA TECH</span>
      </div>
      <ul className={styles.menu}>
        <li onClick={() => setPage('home')} className={styles.link}>Inicio</li>
        <li onClick={() => setPage('products')} className={styles.link}>Productos</li>
        <li onClick={() => setPage('cart')} className={styles.link}>Carrito</li>
      </ul>
      <button className={styles.auth}>Ingresar</button>
    </nav>
  );
};

export default Navbar;