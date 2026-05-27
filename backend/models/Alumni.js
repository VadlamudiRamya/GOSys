const mongoose = require('mongoose');

const alumniSchema = mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    serialNumber: {
      type: Number,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
