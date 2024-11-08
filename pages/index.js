// pages/index.js
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "../styles/SignIn.module.css";

export default function SignInPage() {
  const { data: session } = useSession(); // Get session data

  const handleSignIn = () => {
    signIn("discord");
  };

  useEffect(() => {
    if (session) {
      console.log("Session data:", session); 
      const userId = session.user.id;
      console.log("Checking user authorization in Google Sheets for userId:", userId);

      fetch(`/api/get-user?userId=${userId}`)
        .then((response) => {
          console.log('Response status from Google Sheets API:', response.status); 
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((userData) => {
          console.log('User data retrieved from Google Sheets:', userData); 
          localStorage.setItem("userData", JSON.stringify(userData)); 
          window.location.href = "/dashboard"; 
        })
        .catch((error) => {
          console.error("Error fetching user data from Google Sheets:", error);
          alert("You are not authorized to access this application.");
        });
    }
  }, [session]);

  return (
    <div className={styles.container}>
      <div className={styles.matrix}></div>
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        <div className={styles.banner}>TOP SECRET // AUTHORIZED ACCESS ONLY</div>

        <img src="/apollo_logo.png" alt="Apollo Logo" className={styles.logo} />
        <h1 className={styles.title}>APOLLO</h1>
        <p className={styles.subtitle}>Secure Login</p>

        <div className={styles.warningText}>
          * Unauthorized access is prohibited by Federal Law *
        </div>

        <button onClick={handleSignIn} className={styles.signInButton}>
          Begin Authentication
        </button>

        <p className={styles.footerText}>
          SYSTEM MONITORING ACTIVE. ALL ACCESS IS LOGGED AND TRACKED.
        </p>
      </div>
    </div>
  );
}
