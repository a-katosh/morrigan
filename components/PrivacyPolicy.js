// components/PrivacyPolicy.js
import React, { useState } from 'react';
import styles from '../styles/Privacy.module.css';

const PrivacyPolicy = () => {
  const [sections, setSections] = useState({
    personalInfo: false,
    dataUsage: false,
    cookies: false,
    rights: false,
  });

  const toggleSection = (section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  return (
    <div className={styles.privacyPolicy}>
      <h2 className={styles.privacyTitle}>Privacy Policy</h2>

      <div className={styles.section}>
        <h3 onClick={() => toggleSection('personalInfo')} className={styles.toggleTitle}>
          Personal Information
        </h3>
        {sections.personalInfo && (
          <p className={styles.sectionContent}>
            We collect personal information to provide better services. This may include your name, email, and usage data.
          </p>
        )}
      </div>

      <div className={styles.section}>
        <h3 onClick={() => toggleSection('dataUsage')} className={styles.toggleTitle}>
          How We Use Your Data
        </h3>
        {sections.dataUsage && (
          <p className={styles.sectionContent}>
            Your data is used to improve our services, provide customer support, and tailor experiences to your preferences.
          </p>
        )}
      </div>

      <div className={styles.section}>
        <h3 onClick={() => toggleSection('cookies')} className={styles.toggleTitle}>
          Cookies
        </h3>
        {sections.cookies && (
          <p className={styles.sectionContent}>
            Our site uses cookies to enhance user experience, analyze site traffic, and for advertising purposes.
          </p>
        )}
      </div>

      <div className={styles.section}>
        <h3 onClick={() => toggleSection('rights')} className={styles.toggleTitle}>
          Your Rights
        </h3>
        {sections.rights && (
          <p className={styles.sectionContent}>
            You have the right to access, update, or delete your data. Contact us if you wish to exercise these rights.
          </p>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
