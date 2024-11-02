// pages/index.js
import { signIn } from "next-auth/react";
import styles from "../styles/SignIn.module.css";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      
      <div className={styles.card}>
        {/* Logo in the center */}
        <img src="/apollo_logo.png" alt="Apollo Logo" className={styles.logo} />

        <h1 className={styles.title}>APOLLO</h1>
        <p className={styles.subtitle}>National Security Agency</p>
        
        <button onClick={() => signIn("discord")} className={styles.signInButton}>
          Authenticate
        </button>
        
        <p className={styles.footerText}>
          Restricted Access - Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
