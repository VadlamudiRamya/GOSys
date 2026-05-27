const express = require('express');
const {
  getYears,
  getAlumniByYear,
  addYear,
  addAlumnus,
  updateAlumnus,
  deleteAlumnus,
  deleteYear,
} = require('../controllers/alumniController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/years', getYears);
router.get('/:year', getAlumniByYear);

// Authorized routes
router.post('/year', protect, addYear);
router.delete('/year/:year', protect, deleteYear);
router.post('/:year', protect, addAlumnus);
router.put('/:id', protect, updateAlumnus);
router.delete('/:id', protect, deleteAlumnus);

module.exports = router;
