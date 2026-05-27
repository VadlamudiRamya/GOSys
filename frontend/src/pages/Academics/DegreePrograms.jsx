import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Academics.module.css';
import { FaGraduationCap } from 'react-icons/fa';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import Modal from '../../components/Modal';
import { DataContext } from '../../context/DataContext.jsx';

const DegreePrograms = () => {
  const { courses, isLoggedIn, addDegree, deleteDegree } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDegreeName, setNewDegreeName] = useState('');
  const [error, setError] = useState('');

  // Get all unique degree program names from the courses state
  const degreePrograms = Object.keys(courses);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewDegreeName('');
    setError('');
  };

  const handleAddDegree = () => {
    if (!newDegreeName.trim()) {
      setError('Degree program name cannot be empty.');
      return;
    }
    if (degreePrograms.includes(newDegreeName.trim())) {
      setError('Degree program already exists.');
      return;
    }
    addDegree(newDegreeName.trim());
    handleCloseModal();
  };

  const handleDeleteDegree = (e, degree) => {
    e.preventDefault();
    e.stopPropagation();
    deleteDegree(degree);
  };

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Academic Degrees</h1>
        <p className={styles.description}>
          Select a degree program to view available departments and course curriculum.
        </p>
      </header>
      <div className={styles.cardContainer}>
        {degreePrograms.map(degree => (
          <div key={degree} className={styles.cardWrapper}>
            <Link to={`/academics/${degree}`} className={styles.card}>
              <FaGraduationCap className={styles.icon} />
              <h2>{degree}</h2>
            </Link>
            {isLoggedIn && (
              <button 
                className={styles.deleteButton} 
                onClick={(e) => handleDeleteDegree(e, degree)}
                title="Delete Degree"
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
          <span>Add Degree</span>
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Add New Degree Program</h2>
        <input
          type="text"
          placeholder="e.g., PhD"
          value={newDegreeName}
          onChange={(e) => { setNewDegreeName(e.target.value); setError(''); }}
          className={`${styles.modalInput} ${error ? styles.inputError : ''}`}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button onClick={handleAddDegree} className={styles.modalButton}>Add Degree</button>
      </Modal>
    </div>
  );
};

export default DegreePrograms;