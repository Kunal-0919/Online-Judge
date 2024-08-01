const mongoose = require("mongoose");

const exampleCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const problemSchema = new mongoose.Schema({
  problem_name: {
    type: String,
    required: true,
  },
  problem_desc: {
    type: String,
    required: true,
  },
  tag: {
    type: String, // Change from String to [String] to allow multiple tags
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
    type: [String],
    required: true,
  },
  example_cases: {
    type: [exampleCaseSchema],
    required: true,
  },
  hidden_cases: {
    type: [exampleCaseSchema],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  submission_count: {
    type: Number,
    default: 0,
    required: false,
  },
  accepted_count: {
    type: Number,
    default: 0,
    required: false,
  },
  topic_tags: {
    type: [String], // Update this if needed
    default: [],
    required: false,
  },
});

module.exports = mongoose.model("Problem", problemSchema);
