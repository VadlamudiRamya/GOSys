import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Analysis.module.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InDemandSkills = () => {
  const { degree, department } = useParams();
  const [topCourses, setTopCourses] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://gosys-backend.onrender.com/api';

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${apiUrl}/analysis/in-demand/${degree}/${department}`);
        const result = await response.json();
        // Backend returns [{ courseName, rating }]
        setTopCourses(result.map(c => ({ name: c.courseName, value: c.rating })));
      } catch (error) {
        console.error('Error fetching in-demand skills:', error);
      }
    };
    fetchSkills();
  }, [degree, department, apiUrl]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Top Skills: {department} ({degree})</h1>
        <p className={styles.description}>
          Distribution of top-rated courses representing in-demand skills and curriculum strengths.
        </p>
      </header>
      {topCourses.length > 0 ? (
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={topCourses}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value" // Changed to value
              >
                {topCourses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No course data available for {department} in {degree} to display in-demand skills.</p>
      )}
    </div>
  );
};

export default InDemandSkills;
