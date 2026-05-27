const Alumni = require('../models/Alumni');
const Status = require('../models/Status');

// @desc    Get all unique academic years
// @route   GET /api/alumni/years
// @access  Public
const getYears = async (req, res) => {
  try {
    const alumniYears = await Alumni.distinct('year');
    const statusDoc = await Status.findOne({ type: 'years' });
    const statusYears = statusDoc ? statusDoc.list.map(y => parseInt(y)) : [];
    
    // Combine and unique
    const allYears = [...new Set([...alumniYears, ...statusYears])];
    res.json(allYears.sort((a, b) => a - b));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get alumni records for a specific year
// @route   GET /api/alumni/:year
// @access  Public
const getAlumniByYear = async (req, res) => {
  try {
    const year = req.params.year;
    const alumniRecords = await Alumni.find({ year }).sort('serialNumber');
    res.json(alumniRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new academic year
// @route   POST /api/alumni/year
// @access  Private/Authorized
const addYear = async (req, res) => {
  const { year } = req.body;

  if (!year) {
    return res.status(400).json({ message: 'Year is required' });
  }

  try {
    let statusDoc = await Status.findOne({ type: 'years' });
    if (!statusDoc) {
      statusDoc = new Status({ type: 'years', list: [year.toString()] });
    } else {
      if (!statusDoc.list.includes(year.toString())) {
        statusDoc.list.push(year.toString());
      }
    }
    await statusDoc.save();
    res.status(200).json({ message: `Year ${year} added successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new alumnus record for a specific year
// @route   POST /api/alumni/:year
// @access  Private/Authorized
const addAlumnus = async (req, res) => {
  const { year } = req.params;
  const { studentName, rollNumber, degree, department, role, company, package } = req.body;

  if (!studentName || !rollNumber || !degree || !department || !role || !company || (package === undefined || package === null)) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const lastAlumnus = await Alumni.findOne({ year }).sort({ serialNumber: -1 });
    const serialNumber = lastAlumnus ? lastAlumnus.serialNumber + 1 : 1;

    const alumnus = new Alumni({
      year: parseInt(year),
      serialNumber,
      studentName,
      rollNumber,
      degree,
      department,
      role,
      company,
      package,
    });

    const createdAlumnus = await alumnus.save();
    res.status(201).json(createdAlumnus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an alumnus record
// @route   PUT /api/alumni/:id
// @access  Private/Authorized
const updateAlumnus = async (req, res) => {
  const { studentName, rollNumber, degree, department, role, company, package } = req.body;

  try {
    const alumnus = await Alumni.findById(req.params.id);

    if (alumnus) {
      alumnus.studentName = studentName !== undefined ? studentName : alumnus.studentName;
      alumnus.rollNumber = rollNumber !== undefined ? rollNumber : alumnus.rollNumber;
      alumnus.degree = degree !== undefined ? degree : alumnus.degree;
      alumnus.department = department !== undefined ? department : alumnus.department;
      alumnus.role = role !== undefined ? role : alumnus.role;
      alumnus.company = company !== undefined ? company : alumnus.company;
      alumnus.package = package !== undefined ? package : alumnus.package;

      const updatedAlumnus = await alumnus.save();
      res.json(updatedAlumnus);
    } else {
      res.status(404).json({ message: 'Alumnus not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an alumnus record
// @route   DELETE /api/alumni/:id
// @access  Private/Authorized
const deleteAlumnus = async (req, res) => {
  try {
    const alumnus = await Alumni.findById(req.params.id);

    if (alumnus) {
      await Alumni.deleteOne({ _id: req.params.id });
      res.json({ message: 'Alumnus removed' });
    } else {
      res.status(404).json({ message: 'Alumnus not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an academic year and all its alumni records
// @route   DELETE /api/alumni/year/:year
// @access  Private/Authorized
const deleteYear = async (req, res) => {
  const { year } = req.params;

  try {
    // 1. Remove year from Status model
    const statusDoc = await Status.findOne({ type: 'years' });
    if (statusDoc) {
      statusDoc.list = statusDoc.list.filter(y => y !== year);
      await statusDoc.save();
    }

    // 2. Remove all alumni records for this year
    await Alumni.deleteMany({ year: parseInt(year) });

    res.json({ message: `Year ${year} and all its records removed successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getYears,
  getAlumniByYear,
  addYear,
  addAlumnus,
  updateAlumnus,
  deleteAlumnus,
  deleteYear,
};
