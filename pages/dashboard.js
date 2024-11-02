import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header"; // Import the Header component

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/"); // Redirect if not logged in
  }, [session, status]);

  // Handle cases where session data is still loading
  if (status === "loading") {
    return <p>Loading...</p>; // You can return a loader here
  }

  if (!session) {
    return <p>Access denied. Please sign in.</p>; // Optional message for unauthorized access
  }

  return (
    <div>
        <Header />
      <h1>Welcome to the Dashboard</h1>
      <p>You are logged in as {session.user.name}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Dashboard;
