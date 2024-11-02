import Link from 'next/link';
import styles from '../styles/404.module.css'; // Ensure the correct path

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorMessage}>Page Not Found</h2>
      <p className={styles.errorDescription}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="https://www.zopstudios.net">
        <a className={styles.homeLink}>Go back to Home</a>
      </Link>
    </div>
  );
}
