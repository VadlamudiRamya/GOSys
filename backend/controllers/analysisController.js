const Alumni = require('../models/Alumni');
const Academics = require('../models/Academics');

// @desc    Get placement analysis data
// @route   GET /api/analysis/placements
// @access  Public
const getPlacementAnalysis = async (req, res) => {
  try {
    const placements = await Alumni.aggregate([
      {
        $group: {
          _id: '$year',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.json(placements.map(item => ({ year: item._id, placements: item.count })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get top 5 in-demand skills for a specific degree and department
// @route   GET /api/analysis/in-demand/:degreeProgram/:department
// @access  Public
const getInDemandSkills = async (req, res) => {
  try {
    const { degreeProgram, department } = req.params;

    const topCourses = await Academics.find({ degreeProgram, department })
      .sort({ rating: -1 }) // Sort by rating descending
      .limit(5)             // Limit to top 5
      .select('courseName rating -_id'); // Select only courseName and rating

    res.json(topCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlacementAnalysis,
  getInDemandSkills,
};
