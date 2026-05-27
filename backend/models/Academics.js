const mongoose = require('mongoose');

const academicsSchema = mongoose.Schema(
  {
    degreeProgram: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Academics = mongoose.model('Academics', academicsSchema);

module.exports = Academics;
