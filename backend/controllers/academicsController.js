const Academics = require('../models/Academics');
const Status = require('../models/Status');

// @desc    Get all unique degree programs
// @route   GET /api/academics/degrees
// @access  Public
const getDegrees = async (req, res) => {
  try {
    const alumniDegrees = await Academics.distinct('degreeProgram');
    const statusDoc = await Status.findOne({ type: 'degrees' });
    const statusDegrees = statusDoc ? statusDoc.list : [];
    
    const allDegrees = [...new Set([...alumniDegrees, ...statusDegrees])];
    res.json(allDegrees.sort());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unique departments for a specific degree program
// @route   GET /api/academics/:degreeProgram/departments
// @access  Public
const getDepartmentsByDegree = async (req, res) => {
  try {
    const { degreeProgram } = req.params;
    const alumniDepartments = await Academics.distinct('department', { degreeProgram });
    const statusDoc = await Status.findOne({ type: 'departments' });
    const statusDepartments = (statusDoc && statusDoc.mapping && statusDoc.mapping.get(degreeProgram)) || [];
    
    const allDepartments = [...new Set([...alumniDepartments, ...statusDepartments])];
    res.json(allDepartments.sort());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get courses for a specific degree program and department
// @route   GET /api/academics/:degreeProgram/:department/courses
// @access  Public
const getCoursesByDegreeAndDepartment = async (req, res) => {
  try {
    const { degreeProgram, department } = req.params;
    const courses = await Academics.find({ degreeProgram, department }).sort('courseName');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new degree program
// @route   POST /api/academics/degree
// @access  Private/Authorized
const addDegree = async (req, res) => {
  const { degreeProgram } = req.body;

  if (!degreeProgram) {
    return res.status(400).json({ message: 'Degree program name is required' });
  }

  try {
    let statusDoc = await Status.findOne({ type: 'degrees' });
    if (!statusDoc) {
      statusDoc = new Status({ type: 'degrees', list: [degreeProgram] });
    } else {
      if (!statusDoc.list.includes(degreeProgram)) {
        statusDoc.list.push(degreeProgram);
      }
    }
    await statusDoc.save();
    res.status(200).json({ message: `Degree program '${degreeProgram}' added successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new department to a degree program
// @route   POST /api/academics/department
// @access  Private/Authorized
const addDepartment = async (req, res) => {
  const { degreeProgram, department } = req.body;

  if (!degreeProgram || !department) {
    return res.status(400).json({ message: 'Degree program and department name are required' });
  }

  try {
    let statusDoc = await Status.findOne({ type: 'departments' });
    if (!statusDoc) {
      statusDoc = new Status({ 
        type: 'departments', 
        mapping: new Map([[degreeProgram, [department]]]) 
      });
    } else {
      const currentDepts = statusDoc.mapping.get(degreeProgram) || [];
      if (!currentDepts.includes(department)) {
        currentDepts.push(department);
        statusDoc.mapping.set(degreeProgram, currentDepts);
      }
    }
    await statusDoc.save();
    res.status(200).json({ message: `Department '${department}' added to '${degreeProgram}' successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new course
// @route   POST /api/academics/course
// @access  Private/Authorized
const addCourse = async (req, res) => {
  const { degreeProgram, department, courseName, rating } = req.body;

  if (!degreeProgram || !department || !courseName || rating === undefined) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const course = new Academics({
      degreeProgram,
      department,
      courseName,
      rating: parseFloat(rating),
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/academics/course/:id
// @access  Private/Authorized
const updateCourse = async (req, res) => {
  const { courseName, rating } = req.body;

  try {
    const course = await Academics.findById(req.params.id);

    if (course) {
      course.courseName = courseName !== undefined ? courseName : course.courseName;
      course.rating = rating !== undefined ? parseFloat(rating) : course.rating;

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/academics/course/:id
// @access  Private/Authorized
const deleteCourse = async (req, res) => {
  try {
    const course = await Academics.findById(req.params.id);

    if (course) {
      await Academics.deleteOne({ _id: req.params.id });
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a degree program and all its courses
// @route   DELETE /api/academics/degree/:degreeProgram
// @access  Private/Authorized
const deleteDegree = async (req, res) => {
  const { degreeProgram } = req.params;

  try {
    // 1. Remove from Status model (list)
    const statusDegrees = await Status.findOne({ type: 'degrees' });
    if (statusDegrees) {
      statusDegrees.list = statusDegrees.list.filter(d => d !== degreeProgram);
      await statusDegrees.save();
    }

    // 2. Remove from Status model (mapping)
    const statusDepts = await Status.findOne({ type: 'departments' });
    if (statusDepts && statusDepts.mapping) {
      statusDepts.mapping.delete(degreeProgram);
      await statusDepts.save();
    }

    // 3. Delete all courses for this degree
    await Academics.deleteMany({ degreeProgram });

    res.json({ message: `Degree program '${degreeProgram}' removed successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a department under a degree program and all its courses
// @route   DELETE /api/academics/department/:degreeProgram/:department
// @access  Private/Authorized
const deleteDepartment = async (req, res) => {
  const { degreeProgram, department } = req.params;

  try {
    // 1. Remove from Status model (mapping)
    const statusDepts = await Status.findOne({ type: 'departments' });
    if (statusDepts && statusDepts.mapping) {
      const depts = statusDepts.mapping.get(degreeProgram) || [];
      const updatedDepts = depts.filter(d => d !== department);
      statusDepts.mapping.set(degreeProgram, updatedDepts);
      await statusDepts.save();
    }

    // 2. Delete all courses for this department under this degree
    await Academics.deleteMany({ degreeProgram, department });

    res.json({ message: `Department '${department}' under '${degreeProgram}' removed successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
