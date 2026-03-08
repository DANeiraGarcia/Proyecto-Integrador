import Navbar from './Navbar';
import styles from '../styles/Header.module.css';

const Header = ({ setPage }) => {
  return (
    <header className={styles.header}>
      <Navbar setPage={setPage} />
    </header>
  );
};

export default Header;