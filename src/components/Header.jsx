import Navbar from "./Navbar";
import styles from "../styles/Header.module.css";

const Header = ({ cartCount }) => {
  return (
    <header className={styles.header}>
      <Navbar cartCount={cartCount} />
    </header>
  );
};

export default Header;
