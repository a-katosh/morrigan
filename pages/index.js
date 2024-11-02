// pages/index.js
import { signIn } from "next-auth/react";
import styles from "../styles/SignIn.module.css";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      {/* Background matrix overlay */}
      <div className={styles.matrix}></div>
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        {/* Top Secret Banner */}
        <div className={styles.banner}>TOP SECRET // AUTHORIZED ACCESS ONLY</div>

        {/* Logo and title */}
        <img src="/apollo_logo.png" alt="Apollo Logo" className={styles.logo} />
        <h1 className={styles.title}>APOLLO</h1>
        <p className={styles.subtitle}>National Security Agency // Secure Login</p>

        {/* Warning text that appears above the button */}
        <div className={styles.warningText}>* Unauthorized access is prohibited by Federal Law *</div>

        {/* Button for signing in */}
        <button onClick={() => signIn("discord")} className={styles.signInButton}>
          Begin Authentication
        </button>

        {/* Footer warning */}
        <p className={styles.footerText}>
          SYSTEM MONITORING ACTIVE. ALL ACCESS IS LOGGED AND TRACKED.
        </p>
      </div>
    </div>
  );
}
