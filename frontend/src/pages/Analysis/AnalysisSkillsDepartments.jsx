import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Analysis.module.css';
import { DataContext } from '../../context/DataContext.jsx';
import { MdApartment } from 'react-icons/md';

const AnalysisSkillsDepartments = () => {
  const { degree } = useParams();
  const { courses } = useContext(DataContext);

  const departments = Object.keys(courses[degree] || {});

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{degree} Skills Analysis</h1>
        <p className={styles.description}>
          Select a department to view the skill demand distribution and course popularity.
        </p>
      </header>
      <div className={styles.cardContainer}>
        {departments.map(dept => (
          <Link to={`/analysis/skills/${degree}/${dept}`} key={dept} className={styles.card}>
            <MdApartment className={styles.icon} />
            <h2>{dept}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnalysisSkillsDepartments;
