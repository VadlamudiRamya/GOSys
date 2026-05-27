const mongoose = require('mongoose');

const statusSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true, // 'years', 'degrees', 'departments'
    },
    list: {
      type: [String],
      default: [],
    },
    // For departments, we might need a mapping: { "BTech": ["CSE", "ECE"] }
    mapping: {
      type: Map,
      of: [String],
      default: {},
    }
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
