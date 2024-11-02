import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import styles from "../styles/Header.module.css";

export default function Header() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/apollo_logo.png" alt="Apollo Logo" className={styles.logo} />
        <h1 className={styles.title}>APOLLO</h1>
      </div>

      <div className={styles.profileContainer}>
        {session && session.user.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            className={styles.avatar}
            onClick={toggleDropdown}
          />
        )}
        <div className={`${styles.dropdown} ${dropdownOpen ? styles.show : ""}`}>
          <button onClick={toggleDropdown} className={styles.dropdownToggle}>
            Options
          </button>
          <div className={styles.dropdownMenu}>
            <button className={styles.dropdownItem}>Settings</button>
            <button className={styles.dropdownItem} onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
