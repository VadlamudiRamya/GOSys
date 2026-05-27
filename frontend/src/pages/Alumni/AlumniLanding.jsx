import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataContext.jsx';
import styles from './AlumniLanding.module.css';
import { MdAddCircle, MdCalendarToday, MdDelete } from 'react-icons/md';
import Modal from '../../components/Modal';

const AlumniLanding = () => {
  const { years, addYear, deleteYear, isLoggedIn } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newYear, setNewYear] = useState('');
  const [error, setError] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewYear('');
    setError('');
  };

  const handleAddYear = () => {
    if (!newYear.trim()) {
      setError('Year cannot be empty.');
      return;
    }
    const yearNum = parseInt(newYear);
    if (isNaN(yearNum)) {
      setError('Year must be a number.');
      return;
    }
    if (years.some(y => y.year === yearNum)) {
      setError('Year already exists.');
      return;
    }
    addYear(yearNum);
    handleCloseModal();
  };

  const handleDeleteYear = (e, year) => {
    e.preventDefault();
    e.stopPropagation();
    deleteYear(year);
  };

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Alumni Records</h1>
        <p className={styles.description}>
          Browse alumni cohorts by graduation year to view detailed records and statistics.
        </p>
      </header>
      <div className={styles.cardContainer}>
        {years.map(({ year }) => (
          <div key={year} className={styles.cardWrapper}>
            <Link to={`/alumni/${year}`} className={styles.card}>
              <MdCalendarToday className={styles.cardIcon} />
              <span>{year}</span>
            </Link>
            {isLoggedIn && (
              <button 
                className={styles.deleteButton} 
                onClick={(e) => handleDeleteYear(e, year)}
                title="Delete Year"
              >
                <MdDelete />
              </button>
            )}
          </div>
        ))}
      </div>
      {isLoggedIn && (
        <button className={styles.floatingButton} onClick={() => setIsModalOpen(true)}>
          <MdAddCircle />
          <span>Add Year</span>
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Add New Academic Year</h2>
        <input
          type="number"
          placeholder="e.g., 2028"
          value={newYear}
          onChange={(e) => { setNewYear(e.target.value); setError(''); }}
          className={`${styles.modalInput} ${error ? styles.inputError : ''}`}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button onClick={handleAddYear} className={styles.modalButton}>Add Year</button>
      </Modal>
    </div>
  );
};

export default AlumniLanding;