// pages/index.js
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "../styles/SignIn.module.css";

export default function SignInPage() {
  const { data: session } = useSession(); // Get session data

  // Handle sign-in button click
  const handleSignIn = () => {
    console.log("Initiating sign-in with Discord");
    signIn("discord");
  };

  useEffect(() => {
    if (session) {
      console.log("Session data:", session); // Log session data to check its structure
      const userId = session.user.id; // Get user ID from session
      console.log("Checking user authorization in Google Sheets for userId:", userId);

      // Fetch user data from the API endpoint that checks Google Sheets
      fetch(`/api/get-user?userId=${userId}`)
        .then((response) => {
          console.log('Response status from Google Sheets API:', response.status); // Log response status
          
          if (!response.ok) {
            // Log more details if the response is not successful
            console.warn(`Failed to retrieve data for userId ${userId}. Status: ${response.status}`);
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((userData) => {
          console.log('User data retrieved from Google Sheets:', userData); // Log retrieved user data
          
          if (userData) {
            // Store user data in local storage and redirect to dashboard
            localStorage.setItem("userData", JSON.stringify(userData));
            console.log("Redirecting to /dashboard");
            window.location.href = "/dashboard";
          } else {
            console.warn("User data is empty or undefined. User may not be authorized.");
            alert("Authorization check failed. Please contact support.");
          }
        })
        .catch((error) => {
          // Log error details for debugging
          console.error("Error fetching user data from Google Sheets:", error);
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
