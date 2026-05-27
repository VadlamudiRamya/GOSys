import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { FaUserGraduate, FaChartLine, FaProjectDiagram, FaGlobeAmericas, FaLightbulb } from 'react-icons/fa';
import { MdMenuBook, MdAnalytics, MdSettingsSuggest } from 'react-icons/md';

const Home = () => {
  return (
    <div className={`${styles.homeContainer} fade-in`}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.tagline}>GOSys – Academic & Alumni Outcome Analytics</h1>
          <p className={styles.description}>
            A comprehensive Academic & Alumni Management System designed to track records,
            manage structures, and visualize placement analytics with precision.
          </p>
          <div className={styles.headerBtns}>
            <Link to="/login" className={styles.primaryBtn}>Get Started</Link>
            <button 
              onClick={() => document.getElementById('why-gosys').scrollIntoView({ behavior: 'smooth' })} 
              className={styles.secondaryBtn}
            >
              Learn More
            </button>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.sectionTitle}>
          <h2>Explore Core Modules</h2>
          <p>Streamlined access to all your academic and alumni data</p>
        </div>
        
        <div className={styles.grid}>
          <Link to="/alumni" className={styles.card}>
            <div className={styles.icon}><FaUserGraduate /></div>
            <h2>Alumni Records</h2>
            <p className={styles.cardDescription}>
              Explore our vast network of alumni and analyze cohort success statistics over the years.
            </p>
          </Link>
          <Link to="/academics" className={styles.card}>
            <div className={styles.icon}><MdMenuBook /></div>
            <h2>Academic Hub</h2>
            <p className={styles.cardDescription}>
              Detailed insight into degree programs, departments, and evolving course structures.
            </p>
          </Link>
          <Link to="/analysis" className={styles.card}>
            <div className={styles.icon}><MdAnalytics /></div>
            <h2>Data Analysis</h2>
            <p className={styles.cardDescription}>
              Advanced visualization of placement trends and in-depth in-demand skill analytics.
            </p>
          </Link>
        </div>

        <section id="why-gosys" className={styles.whySection}>
          <div className={styles.sectionTitle}>
            <h2>Why GOSys?</h2>
            <p>Empowering institutions with data-driven insights and academic excellence</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><FaChartLine /></div>
              <h3>Academic Analytics</h3>
              <p>Gain deep insights into academic performance and program effectiveness with real-time data tracking.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><FaUserGraduate /></div>
              <h3>Alumni Tracking</h3>
              <p>Maintain Alumni Data academic year wise for better comprehension</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><MdSettingsSuggest /></div>
              <h3>Outcome Insights</h3>
              <p>Evaluate learning outcomes and institutional success through comprehensive reporting and metrics.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><FaProjectDiagram /></div>
              <h3>Department Comparison</h3>
              <p>Compare performance across different departments to identify strengths and areas for improvement.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><FaLightbulb /></div>
              <h3>Skill Demand Trends</h3>
              <p>Stay ahead of industry needs by analyzing market-relevant skills and student placement patterns.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
