const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', protect, authorize('admin'), registerUser); // Admin only registration
//router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
