// pages/index.js
import { signIn } from "next-auth/react";
import styles from "../styles/SignIn.module.css";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo in the middle */}
        <img src="/apollo_logo.png" alt="Apollo Logo" className={styles.logo} />
        
        <h1 className={styles.title}>Welcome to Apollo</h1>
        <p className={styles.subtitle}>Authorized Personnel Only</p>
        
        <button onClick={() => signIn("discord")} className={styles.signInButton}>
          Sign in with Discord
        </button>
      </div>
    </div>
  );
}
