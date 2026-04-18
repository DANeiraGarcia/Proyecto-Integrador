import Navbar from "./Navbar";
import styles from "../styles/Header.module.css";

const Header = ({ setPage, cartCount }) => {
  return (
    <header className={styles.header}>
      <Navbar setPage={setPage} cartCount={cartCount} />
    </header>
  );
};

export default Header;
