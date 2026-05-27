const express = require('express');
const {
  getDegrees,
  getDepartmentsByDegree,
  getCoursesByDegreeAndDepartment,
  addDegree,
  addDepartment,
  addCourse,
  updateCourse,
  deleteCourse,
  deleteDegree,
  deleteDepartment,
} = require('../controllers/academicsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/degrees', getDegrees);
router.get('/:degreeProgram/departments', getDepartmentsByDegree);
router.get('/:degreeProgram/:department/courses', getCoursesByDegreeAndDepartment);

// Authorized routes
router.post('/degree', protect, addDegree);
router.delete('/degree/:degreeProgram', protect, deleteDegree);
router.post('/department', protect, addDepartment);
router.delete('/department/:degreeProgram/:department', protect, deleteDepartment);
router.post('/course', protect, addCourse);
router.put('/course/:id', protect, updateCourse);
router.delete('/course/:id', protect, deleteCourse);

module.exports = router;
