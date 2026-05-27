import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Academics.module.css';
import { MdApartment, MdAddCircle, MdDelete } from 'react-icons/md';
import Modal from '../../components/Modal';
import { DataContext } from '../../context/DataContext.jsx';

const Departments = () => {
  const { degree } = useParams();
  const { courses, isLoggedIn, addDepartment, deleteDepartment } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [error, setError] = useState('');

  const departments = Object.keys(courses[degree] || {});

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewDepartmentName('');
    setError('');
  };

  const handleAddDepartment = () => {
    if (!newDepartmentName.trim()) {
      setError('Department name cannot be empty.');
      return;
    }
    if (departments.includes(newDepartmentName.trim())) {
      setError('Department already exists for this degree.');
      return;
    }
    addDepartment(degree, newDepartmentName.trim());
    handleCloseModal();
  };

  const handleDeleteDepartment = (e, dept) => {
    e.preventDefault();
    e.stopPropagation();
    deleteDepartment(degree, dept);
  };

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{degree} Departments</h1>
        <p className={styles.description}>
          Select a department under {degree} to view the detailed curriculum and courses.
        </p>
      </header>
      <div className={styles.cardContainer}>
        {departments.map(dept => (
          <div key={dept} className={styles.cardWrapper}>
            <Link to={`/academics/${degree}/${dept}`} className={styles.card}>
              <MdApartment className={styles.icon} />
              <h2>{dept}</h2>
            </Link>
            {isLoggedIn && (
              <button 
                className={styles.deleteButton} 
                onClick={(e) => handleDeleteDepartment(e, dept)}
                title="Delete Department"
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
          <span>Add Department</span>
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Add New Department to {degree}</h2>
        <input
          type="text"
          placeholder="e.g., IT"
          value={newDepartmentName}
          onChange={(e) => { setNewDepartmentName(e.target.value); setError(''); }}
          className={`${styles.modalInput} ${error ? styles.inputError : ''}`}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button onClick={handleAddDepartment} className={styles.modalButton}>Add Department</button>
      </Modal>
    </div>
  );
};

export default Departments;