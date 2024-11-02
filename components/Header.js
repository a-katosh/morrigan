// components/Header.js
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/apollo_logo.png" alt="Apollo Logo" className={styles.logo} />
        <h1 className={styles.title}>APOLLO</h1>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navItem}>Dashboard</Link>
        <Link href="/reports" className={styles.navItem}>Reports</Link>
        <Link href="/settings" className={styles.navItem}>Settings</Link>
        <Link href="/logout" className={styles.navItem}>Logout</Link>
      </nav>
      <div className={styles.securityWarning}>Top Secret Access - Authorized Personnel Only</div>
    </header>
  );
};

export default Header;
