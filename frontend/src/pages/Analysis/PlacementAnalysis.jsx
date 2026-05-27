import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import styles from './Analysis.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaCalendarAlt, FaUserCheck } from 'react-icons/fa';

const PlacementAnalysis = () => {
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://gosys-backend.onrender.com/api';

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`${apiUrl}/analysis/placements`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching placement analysis:', error);
      }
    };
    fetchAnalysis();
  }, [apiUrl]);

  // Get last 2 years for statistics cards
  const lastTwoYears = [...data].sort((a, b) => b.year - a.year).slice(0, 2);

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Placement Analysis</h1>
        <p className={styles.description}>
          Placement trends and statistics over the years. Explore cohort success through data-driven visualizations.
        </p>
      </header>

      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h3>Annual Placement Trends</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dx={-10} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }} 
            />
            <Legend verticalAlign="top" height={36}/>
            <Line 
              type="monotone" 
              name="Total Placements"
              dataKey="placements" 
              stroke="var(--accent-color)" 
              strokeWidth={5} 
              dot={{ fill: 'white', r: 6, strokeWidth: 3, stroke: 'var(--accent-color)' }} 
              activeDot={{ r: 10, strokeWidth: 0, fill: 'var(--accent-hover)' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statsTitle}>
          <h2>Key Statistics</h2>
          <p>Recent performance breakdown across graduating cohorts</p>
        </div>
        
        <div className={styles.statsGrid}>
          {lastTwoYears.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statYear}>
                <FaCalendarAlt />
                <span>Cohort {stat.year}</span>
              </div>
              <div className={styles.statMain}>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}><FaUserCheck /></div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Total Placements</span>
                    <span className={styles.statValue}>{stat.placements}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementAnalysis;
