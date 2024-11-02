import Image from 'next/image';
import styles from '../styles/404.module.css'; // Import your CSS module
import logo from '../public/apollo_logo.png'; // Adjust the path as necessary

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      
      <div className={styles.card}>
        <Image src={logo} alt="Apollo Logo" width={80} height={80} className={styles.logo} />
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Not Found</h2>
        <p className={styles.message}>The page you are looking for does not exist or has been classified.</p>
        <p className={styles.suggestion}>Please return to the home page</p>
        
        <a href="/dashboard" className={styles.homeButton}>Return to Home</a>
      </div>
    </div>
  );
}
