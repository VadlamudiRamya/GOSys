const express = require('express');
const {
  getPlacementAnalysis,
  getInDemandSkills,
} = require('../controllers/analysisController');

const router = express.Router();

// Public routes (Read-only for all users)
router.get('/placements', getPlacementAnalysis);
router.get('/in-demand/:degreeProgram/:department', getInDemandSkills);

module.exports = router;
