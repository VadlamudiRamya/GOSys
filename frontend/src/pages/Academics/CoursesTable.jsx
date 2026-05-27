import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext.jsx';
import styles from './CoursesTable.module.css';
import { MdAddCircle, MdEdit, MdDelete, MdSave } from 'react-icons/md';
import Modal from '../../components/Modal';
import StarRating from '../../components/StarRating';

const CoursesTable = () => {
  const { degree, department } = useParams();
  const { courses, addCourse, editCourse, deleteCourse, isLoggedIn } = useContext(DataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentCourse, setCurrentCourse] = useState({ _id: null, courseName: '', rating: '' }); // Added _id for editing
  const [errors, setErrors] = useState({});

  const coursesForDept = courses[degree]?.[department] || [];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCourse({ _id: null, courseName: '', rating: '' });
    setErrors({});
  };

  const openModal = (mode, course = { _id: null, courseName: '', rating: '' }) => {
    setModalMode(mode);
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({ ...currentCourse, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user types
  };

  const handleSave = () => {
    let newErrors = {};

    if (!currentCourse.courseName.trim()) {
      newErrors.courseName = 'Course name cannot be empty.';
    } else if (modalMode === 'add' && coursesForDept.some(course => course.courseName.toLowerCase() === currentCourse.courseName.trim().toLowerCase())) {
      newErrors.courseName = 'A course with this name already exists.';
    }

    const parsedRating = parseFloat(currentCourse.rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      newErrors.rating = 'Rating must be a number between 1 and 5.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (modalMode === 'add') {
      addCourse(degree, department, { ...currentCourse, rating: parsedRating });
    } else {
      editCourse(degree, department, { ...currentCourse, rating: parsedRating });
    }
    handleCloseModal();
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(degree, department, courseId);
    }
  };

  return (
    <div className={`${styles.container} fade-in`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Courses: {department} ({degree})</h1>
        <p className={styles.description}>
          Curriculum courses and their ratings
        </p>
      </header>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Rating</th>
              {isLoggedIn && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {coursesForDept.map((course) => (
              <tr key={course._id}>
                <td>{course.courseName}</td>
                <td><StarRating rating={course.rating} /></td>
                {isLoggedIn && (
                  <td className={styles.actions}>
                    <button onClick={() => openModal('edit', course)}><MdEdit /></button>
                    <button onClick={() => handleDelete(course._id)}><MdDelete /></button>
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
          <span>Add Course</span>
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>{modalMode === 'add' ? 'Add New Course' : 'Edit Course'}</h2>
        <div className={styles.modalForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={currentCourse.courseName}
              onChange={handleChange}
              className={errors.courseName ? styles.inputError : ''}
            />
            {errors.courseName && <p className={styles.errorMessage}>{errors.courseName}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              step="0.5"
              min="1"
              max="5"
              value={currentCourse.rating}
              onChange={handleChange}
              className={errors.rating ? styles.inputError : ''}
            />
            {errors.rating && <p className={styles.errorMessage}>{errors.rating}</p>}
          </div>
        </div>
        <button onClick={handleSave} className={styles.modalButton}><MdSave /> {modalMode === 'add' ? 'Add' : 'Save'}</button>
      </Modal>
    </div>
  );
};

export default CoursesTable;