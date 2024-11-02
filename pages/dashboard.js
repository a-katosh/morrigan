import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/"); // Redirect if not logged in
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are logged in as {session.user.name}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Dashboard;
