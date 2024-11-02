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
  const { data: session, status } = useSession(); // Destructure status

  useEffect(() => {
    if (status === "loading") {
      // Optionally show a loading state here
      return; // Wait for session to load
    }

    if (session) {
      console.log('Session found:', session);

      // Find the user in the allowed user list
      const user = allowedUsers.allowedUsers.find(user => user.id === session.user.id);

      if (user) {
        // If the user is allowed, you can store their data in local storage or context
        localStorage.setItem('userData', JSON.stringify(user)); // Store user data for later use
        console.log('User found:', user);
      } else {
        // Optional: Sign out if the user is not allowed
        console.error('User not authorized, signing out...');
        signOut({ callbackUrl: '/' }); // Redirect to the index page
      }
    } else {
      console.warn('No session found.');
    }
  }, [session, status]);

  return null; // This component does not render anything
}

export default MyApp;
