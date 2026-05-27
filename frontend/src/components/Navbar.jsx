import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { DataContext } from '../context/DataContext.jsx';

import { FaUniversity } from 'react-icons/fa';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.navLogo}>
          <FaUniversity className={styles.logoIcon} />
          <span>GOSys</span>
        </NavLink>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.navLinks} ${styles.active}` : styles.navLinks)}>
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/alumni" className={({ isActive }) => (isActive ? `${styles.navLinks} ${styles.active}` : styles.navLinks)}>
              Alumni
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/academics" className={({ isActive }) => (isActive ? `${styles.navLinks} ${styles.active}` : styles.navLinks)}>
              Academics
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/analysis" className={({ isActive }) => (isActive ? `${styles.navLinks} ${styles.active}` : styles.navLinks)}>
              Analysis
            </NavLink>
          </li>
          <li className={styles.navItem}>
            {isLoggedIn ? (
              <button onClick={handleLogout} className={`${styles.navLinks} ${styles.logoutBtn}`}>
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={({ isActive }) => (isActive ? `${styles.navLinks} ${styles.active}` : styles.navLinks)}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
