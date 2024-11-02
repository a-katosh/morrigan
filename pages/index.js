import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "../styles/SignIn.module.css";
import allowedUsers from '../data/allowedUsers.json'; // Import the allowed user data

export default function SignInPage() {
  const { data: session } = useSession(); // Get session data

  // Handle sign-in button click
  const handleSignIn = () => {
    if (session) {
      const user = allowedUsers.allowedUsers.find(user => user.id === session.user.id);
      if (user) {
        // User is allowed, redirect to Discord
        signIn("discord");
      } else {
        // Optional: Provide feedback that the user is not authorized
        alert("You are not authorized to sign in.");
      }
    } else {
      // No session, proceed to sign in with Discord
      signIn("discord");
    }
  };

  useEffect(() => {
    // If already logged in and authorized, redirect to dashboard
    if (session) {
      const user = allowedUsers.allowedUsers.find(user => user.id === session.user.id);
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user)); // Store user data
        window.location.href = '/dashboard'; // Redirect to the dashboard
      }
    }
  }, [session]);

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
        <p className={styles.subtitle}>Secure Login</p>

        {/* Warning text that appears above the button */}
        <div className={styles.warningText}>
          * Unauthorized access is prohibited by Federal Law *
        </div>

        {/* Button for signing in */}
        <button onClick={handleSignIn} className={styles.signInButton}>
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
