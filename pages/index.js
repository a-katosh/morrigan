import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "../styles/SignIn.module.css";

export default function SignInPage() {
  const { data: session } = useSession(); // Get session data

  // Handle sign-in button click
  const handleSignIn = () => {
    // Start sign-in with Discord
    signIn("discord");
  };

  useEffect(() => {
    // If already logged in, check if the user is allowed
    if (session) {
      const userId = session.user.id; // Get user ID from session
      console.log("Checking user authorization in external API for userId:", userId);

      // Fetch user data from the new API endpoint
      fetch(`https://23.22.198.16:4000/api/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((userData) => {
          // User is allowed, store user data and redirect
          localStorage.setItem("userData", JSON.stringify(userData)); // Store user data
          window.location.href = "/dashboard"; // Redirect to the dashboard
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert("You are not authorized to access this application.");
        });
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
