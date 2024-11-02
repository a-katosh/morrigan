// pages/index.js
import { signIn } from "next-auth/react";
import styles from "../styles/SignIn.module.css";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        {/* Top Secret Banner */}
        <div className={styles.banner}>TOP SECRET</div>

        {/* Logo in the center */}
        <img src="/apollo_logo.png" alt="Apollo Logo" className={styles.logo} />

        <h1 className={styles.title}>APOLLO</h1>
        <p className={styles.subtitle}>National Security Agency</p>

        {/* Animated restricted access indicator */}
        <div className={styles.restrictedIndicator}>Restricted Access - Authorized Personnel Only</div>
        
        <button onClick={() => signIn("discord")} className={styles.signInButton}>
          Authenticate
        </button>

        {/* Footer Reminder */}
        <p className={styles.footerText}>
          Unauthorized Access Will Be Monitored and Logged
        </p>
      </div>
    </div>
  );
}
