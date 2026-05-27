import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext.jsx';
import styles from './AlumniTable.module.css';
import { MdAddCircle, MdEdit, MdDelete, MdSave } from 'react-icons/md';
import Modal from '../../components/Modal';

const AlumniTable = () => {
  const { year } = useParams();
  const { alumni, addAlumnus, editAlumnus, deleteAlumnus, isLoggedIn } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentRecord, setCurrentRecord] = useState({
    _id: null,
    studentName: '',
    rollNumber: '',
    degree: '',
    department: '',
    role: '',
    company: '',
    package: '',
  });
  const [errors, setErrors] = useState({});

  const alumniForYear = alumni[year] || [];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRecord({
      _id: null,
      studentName: '',
      rollNumber: '',
      degree: '',
      department: '',
      role: '',
      company: '',
      package: '',
    });
    setErrors({});
  };

  const openModal = (mode, record = {
    _id: null,
    studentName: '',
    rollNumber: '',
    degree: '',
    department: '',
    role: '',
    company: '',
    package: '',
  }) => {
    setModalMode(mode);
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecord({ ...currentRecord, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user types
  };

  const handleSave = () => {
    let newErrors = {};
    for (const key in currentRecord) {
      if (key !== 'id' && !String(currentRecord[key]).trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (modalMode === 'add') {
      addAlumnus(year, currentRecord);
    } else {
      editAlumnus(year, currentRecord);
    }
    handleCloseModal();
  };

  const handleDelete = (alumnusId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      deleteAlumnus(year, alumnusId);
    }
  };

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Alumni Records for {year}</h1>
        <p className={styles.description}>
          Detailed list of graduates and their placement outcome for the academic year {year}.
        </p>
      </header>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Degree</th>
              <th>Department</th>
              <th>Role</th>
              <th>Company</th>
              <th>Package</th>
              {isLoggedIn && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {alumniForYear.map((alumnus) => (
              <tr key={alumnus._id}>
                <td>{alumnus.serialNumber}</td>
                <td>{alumnus.studentName}</td>
                <td>{alumnus.rollNumber}</td>
                <td>{alumnus.degree}</td>
                <td>{alumnus.department}</td>
                <td>{alumnus.role}</td>
                <td>{alumnus.company}</td>
                <td>{alumnus.package}</td>
                {isLoggedIn && (
                  <td className={styles.actions}>
                    <button onClick={() => openModal('edit', alumnus)}><MdEdit /></button>
                    <button onClick={() => handleDelete(alumnus._id)}><MdDelete /></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoggedIn && (
        <button className={styles.floatingButton} onClick={() => openModal('add')}>
          <MdAddCircle />
          <span>Add New Record</span>
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>{modalMode === 'add' ? 'Add New Alumni Record' : 'Edit Alumni Record'}</h2>
        <form className={styles.modalForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={currentRecord.studentName}
              onChange={handleChange}
              className={errors.studentName ? styles.inputError : ''}
            />
            {errors.studentName && <p className={styles.errorMessage}>{errors.studentName}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              value={currentRecord.rollNumber}
              onChange={handleChange}
              className={errors.rollNumber ? styles.inputError : ''}
            />
            {errors.rollNumber && <p className={styles.errorMessage}>{errors.rollNumber}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="degree"
              placeholder="Degree (e.g., BTech)"
              value={currentRecord.degree}
              onChange={handleChange}
              className={errors.degree ? styles.inputError : ''}
            />
            {errors.degree && <p className={styles.errorMessage}>{errors.degree}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="department"
              placeholder="Department (e.g., CSE)"
              value={currentRecord.department}
              onChange={handleChange}
              className={errors.department ? styles.inputError : ''}
            />
            {errors.department && <p className={styles.errorMessage}>{errors.department}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={currentRecord.role}
              onChange={handleChange}
              className={errors.role ? styles.inputError : ''}
            />
            {errors.role && <p className={styles.errorMessage}>{errors.role}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={currentRecord.company}
              onChange={handleChange}
              className={errors.company ? styles.inputError : ''}
            />
            {errors.company && <p className={styles.errorMessage}>{errors.company}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="package"
              placeholder="Package"
              value={currentRecord.package}
              onChange={handleChange}
              className={errors.package ? styles.inputError : ''}
            />
            {errors.package && <p className={styles.errorMessage}>{errors.package}</p>}
          </div>
        </form>
        <button onClick={handleSave} className={styles.modalButton}>
          <MdSave /> {modalMode === 'add' ? 'Add' : 'Save'}
        </button>
      </Modal>
    </div>
  );
};

export default AlumniTable;