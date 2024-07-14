const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  problem_name: {
    type: String,
    required: true,
  },
  problem_desc: {
    type: String,
    required: true,
  },
  input_format: {
    type: String,
    required: true,
  },
  output_format: {
    type: String,
    required: true,
  },
  constraints: {
    type: Array,
    required: true,
  },
  example_cases: {
    type: Array,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Problem", problemSchema);
