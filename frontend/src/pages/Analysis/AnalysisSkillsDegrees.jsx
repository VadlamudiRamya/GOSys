import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Analysis.module.css';
import { DataContext } from '../../context/DataContext.jsx';
import { FaGraduationCap } from 'react-icons/fa';

const AnalysisSkillsDegrees = () => {
  const { courses } = useContext(DataContext);
  const degreePrograms = Object.keys(courses);

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Skills Analysis by Degree</h1>
        <p className={styles.description}>
          Select a degree program to analyze the most in-demand skills.
        </p>
      </header>
      <div className={styles.cardContainer}>
        {degreePrograms.map(degree => (
          <Link to={`/analysis/skills/${degree}`} key={degree} className={styles.card}>
            <FaGraduationCap className={styles.icon} />
            <h2>{degree}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnalysisSkillsDegrees;
