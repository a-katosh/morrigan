// components/Header.js
import { useSession } from 'next-auth/react'; // Import useSession to access session data
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { data: session } = useSession(); // Get session data

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
        <div className={styles.securityWarning}> Authorized Personnel Only</div>
        {session && session.user && session.user.image && ( // Check if session and user exist
          <Link href="/settings" className={styles.profileLink}>
            <img 
              src={session.user.image} // Use the session user's image
              alt="User Profile" 
              className={styles.profilePicture} 
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
