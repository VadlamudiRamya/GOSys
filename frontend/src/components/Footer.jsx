import React from 'react';
import styles from './Footer.module.css';

import { FaUniversity } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerLogo}>
          <a href="/">
            <FaUniversity className={styles.logoIcon} />
            <span>GOSys</span>
          </a>
        </div>
        <ul className={styles.footerLinks}>
          <li><a href="/" className={styles.footerLink}>Home</a></li>
          <li><a href="/alumni" className={styles.footerLink}>Alumni</a></li>
          <li><a href="/academics" className={styles.footerLink}>Academics</a></li>
          <li><a href="/analysis" className={styles.footerLink}>Analysis</a></li>
        </ul>
        <p className={styles.text}>
          &copy; {currentYear} GOSys — All Rights Reserved
        </p>
      </div>
    </footer >
  );
};

export default Footer;
