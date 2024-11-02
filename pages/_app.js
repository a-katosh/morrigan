import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import allowedUsers from '../data/allowedUsers.json'; // Import the allowed user data
import "../styles/globals.css"; // Import global styles

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthCheck>
        <Component {...pageProps} />
      </AuthCheck>
    </SessionProvider>
  );
}

// Create an AuthCheck component
function AuthCheck() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // Find the user in the allowed user list
      const user = allowedUsers.allowedUsers.find(user => user.id === session.user.id);

      if (user) {
        // If the user is allowed, you can store their data in local storage or context
        localStorage.setItem('userData', JSON.stringify(user)); // Store user data for later use
      } else {
        // Optional: Sign out if the user is not allowed
        signOut({ callbackUrl: '/' }); // Redirect to the index page
      }
    }
  }, [session]);

  return null; // This component does not render anything
}

export default MyApp;
