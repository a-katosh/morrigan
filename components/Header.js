import { useState } from 'react';
import styles from '../styles/Header.module.css';
import Image from 'next/image';

const Header = () => {
  const [isDropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setDropdownActive(!isDropdownActive);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <a href="#home">
          <Image src="/zop.png" alt="Company Logo" />
        </a>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <a href="#about-us">About Us</a>
            <ul className={styles.dropdown}>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Meet the Team</a></li>
            </ul>
          </li>
          <li className={styles.navItem}>
            <a href="#projects">Projects</a>
            <ul className={styles.dropdown}>
              <li><a href="#">Republic Of Ireland</a></li>
              <li><a href="#">United Nations</a></li>
              <li><a href="#">Project Democracy</a></li>
            </ul>
          </li>
          <li className={styles.navItem}>
            <a href="#services">Services</a>
            <ul className={styles.dropdown}>
              <li><a href="#">Design</a></li>
              <li><a href="#">Development</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className={styles.userDetails}>
        <button id="signInButton" className={styles.navButton} onClick={toggleDropdown}>
          Sign In
        </button>
        <div id="userDropdown" className={`${styles.userDropdown} ${isDropdownActive ? styles.active : ''}`}>
        </div>
      </div>
    </header>
  );
};

export default Header;
