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
      <div className={styles.rightContainer}> {/* New container for nav and warning */}
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem}>Dashboard</Link>
          <Link href="/reports" className={styles.navItem}>Reports</Link>
        </nav>
        <Link href="/settings" className={styles.profileLink}>
            <img 
              src={session.user.image} // Use the session user's image
              alt="User Profile" 
              className={styles.profilePicture} 
            />
          </Link>
        <div className={styles.securityWarning}> Authorized Personnel Only</div>
      </div>
    </header>
  );
};

export default Header;
