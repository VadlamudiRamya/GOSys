import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Analysis.module.css';
import { MdShowChart, MdPieChart } from 'react-icons/md';

const AnalysisHome = () => {
  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Analysis Dashboard</h1>
        <p className={styles.description}>
          Visualize placement data and analyze in-demand skills trends.
        </p>
      </header>
      <div className={styles.cardContainer}>
        <Link to="/analysis/placements" className={styles.card}>
          <MdShowChart className={styles.icon} />
          <h2>Placement Analysis</h2>
        </Link>
        <Link to="/analysis/skills/degrees" className={styles.card}>
          <MdPieChart className={styles.icon} />
          <h2>In-Demand Skills</h2>
        </Link>
      </div>
    </div>
  );
};

export default AnalysisHome;
