// components/CookieConsent.js

import CookieConsent from 'react-cookie-consent';
import styles from '../styles/CookieConsent.module.css';

export default function CookieBanner() {
  return (
    <CookieConsent
      location="none"  // Disable default location to position it freely
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',  // Adjust width as needed
        maxWidth: '500px', // Set a maximum width
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '15px',  // Beveled corners
        padding: '20px',
        textAlign: 'center',
        zIndex: '9999'
      }}
      buttonStyle={{
        backgroundColor: '#ffca2b',
        color: '#333',
        fontWeight: 'bold',
        borderRadius: '8px',
        padding: '10px 20px',
        marginTop: '20px',
      }}
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="zopstudios_cookie"
      expires={150}
    >
      <p className={styles.message}>
        We use cookies to enhance your experience.{" "}
        <a href="/privacy" className={styles.link}>Read More</a>
      </p>
    </CookieConsent>
  );
}
