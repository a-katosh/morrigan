import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      <div className={styles.footerContent}>
        <div className={`${styles.footerLeft} ${styles.footerSection}`}>
          <Image src="/zop.png" alt="Zop Studios Logo" width={100} height={50} />
          <p>&copy; 2024 Zop Studios. All rights reserved.</p>
        </div>
        <div className={`${styles.footerMiddle} ${styles.footerSection}`}>
          <h3>Company</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="#careers">Careers</Link></li>
            <li><Link href="#mediacentre">Media Centre</Link></li>
            <li><Link href="#portfolios">Portfolios</Link></li>
            <li><Link href="#contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className={`${styles.footerRight} ${styles.footerSection}`}>
          <h3>Connect with us</h3>
          <div className={styles.socialIcons}>
            <a href="https://discord.gg/C5JCx3JUPh" target="_blank" rel="noopener noreferrer"><i className="fab fa-discord"></i></a>
            <a href="https://twitter.com/wearezop" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://tiktok.com/@wearezop" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
            <a href="https://instagram.com/wearezop/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://linkedin.com/company/zopstudio" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
